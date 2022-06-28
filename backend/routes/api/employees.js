const express = require('express')
const router = express.Router()
const {
  getAllemployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} = require('../../controllers/employeesController.js')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .get(getAllemployees)
  .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createNewEmployee)


router.route('/:id')
  .get(getEmployeeById)
  .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

module.exports = router
