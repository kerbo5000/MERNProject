const express = require('express')
const router = express.Router()
const {
  handleLogin,
} = require('../controllers/authController.js')

router.post('/:type',handleLogin)
module.exports = router
