const User = require('../model/User')

const getAllUsers = async (req,res) => {
  const users = await User.find()
  if(!users){
    res.status(204).json({'message':'No user'})
  }
  res.status(200).json(users)
}

module.exports = {
  getAllUsers,
}
