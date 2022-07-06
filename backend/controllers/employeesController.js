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
    employees = employees.map((employee) => (
      {
        firstname:employee.firstname,
        lastname:employee.lastname,
        username:employee.username,
        id:employee.id,
        roles:employee.roles
      }
    ))
    res.status(200).json(employees)
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
    res.status(200).json({firstname:employee.firstname,
                          lastname:employee.lastname,
                          username:employee.username,
                          id:employee.id
                        })
  }
}
const createNewEmployee = async (req,res) => {
  if(!req?.body?.firstname || !req?.body?.lastname ){
    res.status(400).json({'message':'first and last name are required.'})
  }
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  let username = firstname.slice(0,firstname.length/2) + lastname.slice(0,lastname.length/2)
  const password = firstname.slice(firstname.length/2) + lastname.slice(lastname.length/2)
  console.log(password)
  const hashPwd = await bcrypt.hash(password,10)
  while(await Employee.findOne({username})){
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
    employee.password = await bcrypt.hash(req.body.newPassword,10)
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
      employee.password = await bcrypt.hash(req.body.newPassword,10)
      const result = await employee.save()
      res.status(200).json({firstname:result.firstname,
                            lastname:result.lastname,
                            username:result.username,
                            id:result.id})
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
  employee.roles = {...employee.roles, Admin:5150}
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
  console.log(req.target._id)
  const result = await Employee.deleteOne({_id:req.target._id})
  res.status(200).json(result)
}
module.exports = {
  getEmployees,
  createNewEmployee,
  updateEmployeePwd,
  updateEmployeeRole,
  deleteEmployee,
  getEmployeeById
}
