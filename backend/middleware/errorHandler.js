const {logEvents} = require('./logEvents')
const errorHandler = (err,req,res,next) => {
  console.log('1234567')
  logEvents(`${err.name}: ${err.message}`,'errLog.txt')
  console.error(err.stack)
  res.status(500).send(err.message)
}

module.exports = errorHandler
