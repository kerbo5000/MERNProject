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

router.route('/')
  .get(getEmployees)

router.route('/',verifyRoles(ROLES_LIST.Admin))
  .post(createNewEmployee)

router.route('/:id')
  .get(getEmployeeById)

router.route('/:id',verifyRoles(ROLES_LIST.Admin))
  .delete(deleteEmployee)

router.route('/id/password')
  .put(updateEmployeePwd)

router.route('/id/roles',verifyRoles(ROLES_LIST.Admin)))
  .put(updateEmployeeRole)



module.exports = router
