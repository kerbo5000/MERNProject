const express = require('express')
const router = express.Router()
const {
  getEmployees,
  createNewEmployee,
  updateEmployeePwd,
  deleteEmployee,
  getEmployeeById,
  updateEmployeeRole,
  updateEmployeeUsername
} = require('../../controllers/employeesController.js')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyId = require('../../middleware/verifyId')

router.route('/')
  .get(getEmployees)
  .post(verifyRoles(ROLES_LIST.Admin),createNewEmployee)

router.route('/:employeeId')
  .get(verifyId('employee'),getEmployeeById)
  .delete(verifyRoles(ROLES_LIST.Admin),verifyId('employee'),deleteEmployee)

router.route('/:employeeId/password')
  .patch(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),verifyId('employee'),updateEmployeePwd)

router.route('/:employeeId/username')
  .patch(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),verifyId('employee'),updateEmployeeUsername)

router.route('/:employeeId/roles')
  .patch(verifyId('employee'),verifyRoles(ROLES_LIST.Admin),updateEmployeeRole)

module.exports = router
