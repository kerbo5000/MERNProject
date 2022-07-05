const Employee = require('../model/Employee')
const bcrypt = require('bcrypt')
const ROLES_LIST = require('../config/roles_list')

const getEmployees = async (req,res) => {
  let employees = await Employee.find()
  if(req?.query?.firstname){
    const firstname = req.query.firstname
    employees = employees.filter((employee) => employee.firstname === firstname )
  }
  if(req?.query?.lastname){
    const lastname = req.query.lastname
    employees = employees.filter((employee) => employee.lastname === lastname )
  }
  if(req?.query?.username){
    const username = req.query.username
    employees = employees.filter((employee) => employee.username === username )
  }
  if(!employees.length){
    res.status(204).json({'message':'No employee'})
  }
  if(req.roles.includes(ROLES_LIST.Admin)){
    res.status(200).json(employees)
  }else{
    employees = employees.map((employee) => {employee.firstname,employee.lastname,employee.username,employee.id,employee.roles})
    res.status(200).json(employee)
  }
}
const getEmployeeById = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // let employee = await Employee.findById(req.params.id)
  // if(!employee){
  //   res.status(204).json({'message':`No employee with ID: ${req.params.id}`})
  // }
  const employee = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    res.status(200).json(employee)
  }else{
    res.status(200).json({employee.firstname,employee.lastname,employee.username,employee.id})
  }
}
const createNewEmployee = async (req,res) => {
  if(!req?.body?.firstname || !req?.body?.lastname ){
    res.status(400).json({'message':'first and last name are required.'})
  }
  const firstname = req.body.firstname
  const lasttname = req.body.lastname
  let username = text.slice(0,firstname.length/2) + text.slice(0,lastname.length/2)
  const password = text.slice(firstname.length/2) + text.slice(lastname.length/2)
  const hashPwd = await bcrypt.hash(password,10)
  while(await Employee.find({username})){
    username += Math.floor(Math.random()*10)
  }
  try{
    const employee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username,
      password:hashPwd,
    })
    res.status(201).json(employee)
  }catch (err){
    console.error(err)
  }
}

const updateEmployeePwd = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // const employee = await Employee.findOne({_id:req.params.id}).exec()
  // if(!employee){
  //   return res.status(204).json({'message':`No employee with ID ${req.params.id}`})
  // }
  const employee = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    if(!req?.body?.newPassword){
      res.status(400).json({'message':'New password required'})
    }
    employee.password = req.body.newPassword
    const result = await employee.save()
    res.status(200).json(result)
  }else{
    if(req.user !== employee.username){
      return res.sendStatus(405)
    }
    if(!req?.body?.newPassword || !req?.body?.oldPassword){
      res.status(400).json({'message':'New and old password required'})
    }
    const match = await bcrypt.compare(req.body.oldPassword,employee.password)
    if(match){
      employee.password = req.body.newPassword
      const result = await employee.save()
      res.status(200).json({result.firstname,result.lastname,result.username,result.id})
    }
  }
}

const updateEmployeeRole = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // let employee = await Employee.findById(req.params.id)
  // if(!employee){
  //   res.status(204).json({'message':`No employee with ID: ${req.params.id}`})
  // }
  const employee = req.target
  employee.role = {...employee.role,Admin=5150}
  const result = await employee.save()
  res.status(200).json(result)
}

const deleteEmployee = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // const employee = await Employee.findOne({_id:req.params.id}).exec()
  // if(!employee){
  //   return res.status(204).json({'message':`No employee matches ID ${req.params.id}`})
  // }
  const result = await Employee.deleteOne({_id:req.params.id})
  res.status(200).json(result)
}
module.exports = {
  getEmployees,
  createNewEmployee,
  updateEmployeePwd,
  deleteEmployee,
  getEmployeeById
}
