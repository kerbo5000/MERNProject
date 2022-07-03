const express = require('express')
const router = express.Router()
const {
  getAEmployees,
  createNewEmployee,
  updateEmployeePwd,
  deleteEmployee,
  getEmployeeById,
  updateEmployeeRole
} = require('../../controllers/employeesController.js')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyId = require('../../middleware/verifyId')

router.route('/')
  .get(getEmployees)

router.route('/',verifyRoles(ROLES_LIST.Admin))
  .post(createNewEmployee)

router.route('/:id',verifyId('employee'))
  .get(getEmployeeById)

router.route('/:id',verifyRoles(ROLES_LIST.Admin),verifyId('employee'))
  .delete(deleteEmployee)

router.route('/:id/password',verifyId('employee'))
  .put(updateEmployeePwd)

router.route('/:id/roles',verifyRoles(ROLES_LIST.Admin),verifyId('employee'))
  .put(updateEmployeeRole)



module.exports = router
