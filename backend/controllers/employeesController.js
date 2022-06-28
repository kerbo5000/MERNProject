const Employee = require('../model/Employee')

const getAllemployees = async (req,res) => {
  const employees = await Employee.find()
  if(!employees){
    res.status(204).json({'message':'No employee'})
  }
  res.status(200).json(employees)
}

const createNewEmployee = async (req,res) => {
  if(!req?.body?.firstname || !req?.body?.lastname ){
    res.status(400).json({'message':'first and last name are required.'})
  }
  try{
    const employee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
    res.status(201).json(employee)
  }catch (err){
    console.error(err)
  }
}
const updateEmployee = async (req,res) => {
  if(!req?.params?.id){
    res.status(400).json({'message':'ID parameter is required'})
  }
  if(!req.body?.firstname && !req.body?.lastname){
    res.status(400).json({'message':'New firstname or lastname are required'})
  }
  const employee = await Employee.findOne({_id:req.params.id}).exec()
  if(!employee){
    return res.status(204).json({'message':`No employee matches ID ${req.params.id}`})
  }
  if(req.body?.firstname) employee.firstname = req.body.firstname
  if(req.body?.lastname) employee.lastname = req.body.lastname
  const result = await employee.save()
  res.status(200).json(result)
}
const deleteEmployee = async (req,res) => {
  if(!req?.params?.id){
    res.status(400).json({'message':'ID parameter is required'})
  }
  const employee = await Employee.findOne({_id:req.params.id}).exec()
  if(!employee){
    return res.status(204).json({'message':`No employee matches ID ${req.params.id}`})
  }
  const result = await Employee.deleteOne({_id:req.params.id})
  res.status(200).json(result)
}
const getEmployeeById = async (req,res) => {
  if(!req?.params?.id){
    res.status(400).json({'message':'ID parameter is required'})
  }
  const employee = await User.findOne({_id:req.params.id}).exec()
  if(!employee){
    return res.status(204).json({'message':`No employee matches ID ${req.body.id}`})
  }
  res.status(200).json(employee)
}
module.exports = {
  getAllemployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
}
