const express = require('express')
const router = express.Router()
const {
  getAllemployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} = require('../../controllers/employeesController.js')
router.route('/')
  .get(getAllemployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee)

router.route('/:id')
  .get(getEmployeeById)

module.exports = router
