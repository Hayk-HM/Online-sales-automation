const express = require('express')
const { employeesController, employeeInfoController, updateEmployeeInformation } = require('../controllers/employeesController')


const employeesRouter = express.Router()

employeesRouter.get(`/employees/:company`, employeesController)
employeesRouter.get(`/employees/:company/:userId`, employeeInfoController)
employeesRouter.put('/employees/:company/:userId', updateEmployeeInformation)

module.exports = { employeesRouter }
