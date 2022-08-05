const User = require('../model/User')
const News = require('../model/News')
const ROLES_LIST = require('../config/roles_list')
const bcrypt = require('bcrypt')

const getUsers = async (req,res) => {
  let filter = {}
  if(req?.query?.username){
    filter.username = req.query.username
  }

  if(req?.query?.news){
    filter.liked = req.query.news
  }

  let limit = 0 
  if(req?.query?.limit && !isNaN(req.query.limit)){
    limit = parseInt(req.query.limit,10)
  }

  let skip = 0 

  if(req?.query?.skip && !isNaN(req.query.skip)){
    skip = parseInt(req.query.skip,10)
  }
  const users = await User.find(filter).limit(limit).skip(skip)

  if(req.roles.includes(ROLES_LIST.Admin)){
    res.status(200).json(users)
  }else{
    result = users.map((user) => (
      {
        username:user.username,
        roles:user.roles,
        id:user.id,
        news:user.news
      }
    ))
    res.status(200).json(result)
  }
}

const getUser = async (req,res) => {
  const user = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    res.status(200).json(user)
  }else{
    res.status(200).json({username:user.username,
                          roles:user.roles,
                          id:user.id,
                          news:user.news})
  }
}

const updateUserPwd = async (req,res) => {
  const user = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    if(!req?.body?.newPassword){
      res.status(400).json({'message':'New password required'})
    }
    user.password = await bcrypt.hash(req.body.newPassword,10)
    const result = await user.save()
    res.status(200).json(result)
  }else if(req.userId == user._id){
    if(!req?.body?.newPassword || !req?.body?.oldPassword){
      res.status(400).json({'message':'New and old password required'})
    }
    const match = await bcrypt.compare(req.body.oldPassword,user.password)
    if(match){
      user.password = req.body.newPassword
      const result = await user.save()
      res.status(200).json({firstname:result.firstname,
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

const deleteUser = async (req,res) => {
  const user = req.target
  if(req.roles.includes(ROLES_LIST.Admin) || user.username == req.user){
    const result = await User.deleteOne({_id:req.target._id})
    res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUserPwd,
  deleteUser,
}
