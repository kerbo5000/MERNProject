const User = require('../model/User')
const News = require('../model/News')
const getUsers = async (req,res) => {
  let users = await User.find()
  if(req?.query?.username){
    const username = req.query.username
    users = users.filter((user) => user.username === username )
  }
  if(!users.length){
    res.status(204).json({'message':'No user found'})
  }
  if(req.roles.includes(ROLES_LIST.Admin)){
    res.status(200).json(users)
  }else{
    users = users.map((user) => {user.username,user.roles,user.id})
    res.status(200).json(users)
  }
}

const getUser = async (req,res) => {
  const user = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    res.status(200).json(user)
  }else{
    res.status(200).json({username:user.username,
                          roles:user.roles,
                          id:user.id})
  }
}

const updateUserPwd = async (req,res) => {
  const user = req.target
  if(req.roles.includes(ROLES_LIST.Admin)){
    if(!req?.body?.newPassword){
      res.status(400).json({'message':'New password required'})
    }
    user.password = req.body.newPassword
    const result = await user.save()
    res.status(200).json(result)
  }else{
    if(req.user !== user.username){
      return res.sendStatus(405)
    }
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
    }
  }
}

const deleteUser = async (req,res) => {
  const result = await User.deleteOne({_id:req.params.id})
  res.status(200).json(result)
}

const getUserLikes = async (req,res) => {
  const user = req.target
  const records = await News.find({_id: {$in: user.news}})
  res.status(200).json(records)
}

module.exports = {
  getUsers,
  getUser,
  updateUserPwd,
  deleteUser,
  getUserLikes
}
