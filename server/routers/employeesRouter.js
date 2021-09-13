const express = require('express')
const { employeesController,
  employeeInfoController,
  updateEmployeeInformation,
  uploadEmployeeController,
  updateEmployeeInformationAdmin,
  deleteEmployeeController } = require('../controllers/employeesController')


const employeesRouter = express.Router()

employeesRouter.get(`/employees/:company`, employeesController)
employeesRouter.get(`/employees/:company/:userId`, employeeInfoController)
employeesRouter.put('/employees/:company/:userId', updateEmployeeInformation)
employeesRouter.put('/employeesadmin/:company/:userId', updateEmployeeInformationAdmin)
employeesRouter.post('/employees/uploadPhoto', uploadEmployeeController)
employeesRouter.post('/employees/deleteemployee', deleteEmployeeController)

module.exports = { employeesRouter }
