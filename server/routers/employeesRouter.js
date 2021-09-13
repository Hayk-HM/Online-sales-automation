const express = require('express')
const { employeesController,
  employeeInfoController,
  updateEmployeeInformation,
  uploadEmployeeController,
  updateEmployeeInformationAdmin } = require('../controllers/employeesController')


const employeesRouter = express.Router()

employeesRouter.get(`/employees/:company`, employeesController)
employeesRouter.get(`/employees/:company/:userId`, employeeInfoController)
employeesRouter.put('/employees/:company/:userId', updateEmployeeInformation)
employeesRouter.put('/employeesadmin/:company/:userId', updateEmployeeInformationAdmin)
employeesRouter.post('/employees/uploadPhoto', uploadEmployeeController)

module.exports = { employeesRouter }
