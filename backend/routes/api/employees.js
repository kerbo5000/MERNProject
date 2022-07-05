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
  .post(verifyRoles(ROLES_LIST.Admin),createNewEmployee)

router.route('/:employeeId',verifyId('employee'))
  .get(getEmployeeById)
  .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

router.route('/:employeeId/password',verifyId('employee'))
  .put(updateEmployeePwd)

router.route('/:employeeId/roles',verifyRoles(ROLES_LIST.Admin),verifyId('employee'))
  .put(updateEmployeeRole)



module.exports = router
