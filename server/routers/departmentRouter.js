const express = require('express')
const {
  createNewDepartmentController,
  getDepartmentsController,
  getDepartmentController,
  updateDepartmentController,
  deleteDepartmentController } = require('../controllers/departmentController')

const departmentRouter = express.Router()

departmentRouter.post('/createnewdepartment', createNewDepartmentController)
departmentRouter.get('/getdepartments', getDepartmentsController)
departmentRouter.get('/getdepartment', getDepartmentController)
departmentRouter.put('/updatedepartment', updateDepartmentController)
departmentRouter.put('/deletedepartment', deleteDepartmentController)

module.exports = { departmentRouter }