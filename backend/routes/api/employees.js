const express = require('express')
const router = express.Router()
const {
  getEmployees,
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

// router.use(verifyId('employee'))

router.route('/:employeeId')
  .get(verifyId('employee'),getEmployeeById)
  .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

router.route('/:employeeId/password')
  .put(updateEmployeePwd)

router.route('/:employeeId/roles',verifyRoles(ROLES_LIST.Admin))
  .put(updateEmployeeRole)



module.exports = router
