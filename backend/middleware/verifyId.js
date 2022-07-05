const News = require('../model/News')
const Employee = require('../model/Employee')
const User = require('../model/User')
const verifyId = (type) => {
  return async (req,res,next) => {
    switch (type) {
      case 'user':
        if(!req?.params?.userId){
          return res.sendStatus(400)
        }
        let user = await User.findById(req.params.userId)
        if(!user){
          return res.sendStatus(204)
        }
        req.target = user
        next()
        break
      case 'employee':
        console.log(req.params.employeeId)
        if(!req?.params?.employeeId){
          return res.sendStatus(400)
        }
        let employee = await Employee.findById(req.params.employeeId)
        if(!employee){
          return res.sendStatus(204)
        }
        req.target = employee
        next()
        break
      case 'news':
        if(!req?.params?.newsId){
          return res.sendStatus(400)
        }
        let news = await News.findById(req.params.newsId)
        if(!news){
          return res.sendStatus(204)
        }
        req.target = news
        next()
        break
    }
  }
}

module.exports = verifyId
