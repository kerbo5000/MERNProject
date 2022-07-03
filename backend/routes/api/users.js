const express = require('express')
const router = express.Router()
const {
  getUsers,
} = require('../../controllers/usersController.js')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .get(verifyRoles(ROLES_LIST.Admin),getUsers)
  

module.exports = router
