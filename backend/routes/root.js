const express = require('express')
const router = express.Router()

router.get('^/$|/hello',(req,res) => {
  res.send('hello world')
})

router.get('/test',(req,res) => {
  res.send('test')
})
module.exports = router
