const News = require('../model/News')
const Employee = require('../model/Employee')
const User = require('../model/User')
const verifyId = (type) => {
  return async (res,req,next) => {
    if(!req?.params?.id){
      res.status(400).json({'message':'ID parameter is required'})
    }
    switch (type) {
      case 'user':
        let user = await User.findById(req.params.userId)
        if(!user){
          res.status(204).json({'message':`No user with ID: ${req.params.id}`})
        }
        req.target = user
        next()
        break
      case 'employee':
        let employee = await Employee.findById(req.params.employeeId)
        if(!employee){
          res.status(204).json({'message':`No employee with ID: ${req.params.id}`})
        }
        req.target = employee
        next()
        break
      case 'news':
        let news = await News.findById(req.params.newsId)
        if(!news){
          res.status(204).json({'message':`No news with ID: ${req.params.id}`})
        }
        req.target = news
        next()
        break
    }
  }
}

module.exports = verifyId
