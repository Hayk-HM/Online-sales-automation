const express = require('express')
const { employeesController, employeeController } = require('../controllers/employeesController')


const employeesRouter = express.Router()

employeesRouter.get(`/employees/:company`, employeesController)
employeesRouter.get(`/employees/:userId`, employeeController)

module.exports = { employeesRouter }
