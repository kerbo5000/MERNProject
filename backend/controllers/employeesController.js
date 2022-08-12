const Employee = require('../model/Employee')
const bcrypt = require('bcrypt')
const ROLES_LIST = require('../config/roles_list')

const getEmployees = async (req,res) => {
  let filter = {}
  if(req?.query?.firstname){
    filter.firstname = req.query.firstname
  }
  if(req?.query?.lastname){
    filter.lastname = req.query.lastname
  }
  if(req?.query?.username){
    filter.username = req.query.username
  }
  let limit = 0 
  if(req?.query?.limit && !isNaN(req.query.limit)){
    limit = parseInt(req.query.limit,10)
  }

  let skip = 0 

  if(req?.query?.skip && !isNaN(req.query.skip)){
    skip = parseInt(req.query.skip,10)
  }
  const employees = await Employee.find(filter).limit(limit).skip(skip)
  if(req.roles.includes(ROLES_LIST.Admin)){
    return res.status(200).json(employees)
  }else{
    result = employees.map((employee) => (
      {
        firstname:employee.firstname,
        lastname:employee.lastname,
        username:employee.username,
        _id:employee.id,
        roles:employee.roles,
        news:emnployee.news
      }
    ))
    return res.status(200).json(result)
  }
}
const getEmployeeById = async (req,res) => {
  const employee = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    return res.status(200).json(employee)
  }else{
    return res.status(200).json({firstname:employee.firstname,
                          lastname:employee.lastname,
                          username:employee.username,
                          id:employee.id,
                          roles:employee.roles,
                          news:employee.news
                        })
  }
}
const createNewEmployee = async (req,res) => {
  if(!req?.body?.firstname || !req?.body?.lastname ){
    return res.status(400).json({'message':'first and last name are required.'})
  }
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  let username = firstname.slice(0,firstname.length/2) + lastname.slice(0,lastname.length/2)
  const password = firstname.slice(firstname.length/2) + lastname.slice(lastname.length/2)
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
    return res.status(201).json(employee)
  }catch (err){
    console.error(err)
  }
}

const updateEmployeePwd = async (req,res) => {
  const employee = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    if(!req?.body?.newPassword){
      return res.status(400).json({'message':'New password required'})
    }
    employee.password = await bcrypt.hash(req.body.newPassword,10)
    const result = await employee.save()
    return res.status(200).json(result)
  }else if(eq.userId == employee._id){
    if(!req?.body?.newPassword || !req?.body?.oldPassword){
      return res.status(400).json({'message':'New and old password required'})
    }
    const match = await bcrypt.compare(req.body.oldPassword,employee.password)
    if(match){
      employee.password = await bcrypt.hash(req.body.newPassword,10)
      const result = await employee.save()
      return res.status(200).json({firstname:result.firstname,
                            lastname:result.lastname,
                            username:result.username,
                            id:result.id})
    }else{
      return res.sendStatus(405)
    }
  }else{
    return res.sendStatus(405)
  }
}

const updateEmployeeRole = async (req,res) => {
  const employee = req.target
  employee.roles = {...employee.roles, Admin:5150}
  const result = await employee.save()
  return res.status(200).json(result)
}

const updateEmployeeUsername = async (req,res) => {
  const employee = req.target
  if(req.roles.includes(ROLES_LIST.Admin)|| employee._id == req.userId){
    if(!req?.body?.newUsername){
      return res.status(400).json({'message':'New username required'})
    }
    employee.username = req.body.newUsername
    const result = await employee.save()
    return res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

const deleteEmployee = async (req,res) => {
  const result = await Employee.deleteOne({_id:req.target._id})
  return res.status(200).json(result)
}
module.exports = {
  getEmployees,
  createNewEmployee,
  updateEmployeePwd,
  updateEmployeeRole,
  updateEmployeeUsername,
  deleteEmployee,
  getEmployeeById
}
