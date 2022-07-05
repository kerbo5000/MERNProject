const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUser,
  updateUserPwd,
  deleteUser
  getUserLikes
} = require('../../controllers/usersController.js')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .get(getUsers)

router.route('/:userId',verifyId('user'))
  .get(getUser)

router.route('/:userId',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),verifyId('user'))
  .put(updateUserPwd)
  .delete(deleteUser)

router.route('/:userId/likes',verifyId('user'))
  .get(getUserLikes)

module.exports = router
