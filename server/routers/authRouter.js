const express = require('express')
const { signInController, createCompanyController, createTablesController, insertInfoController } = require('../controllers/authController')

const authRouter = express.Router()

authRouter.post('/signin', signInController)
authRouter.post('/signup/createcompany', createCompanyController)
authRouter.post('/signup/createtable', createTablesController)
authRouter.post('/signup/insertinfo', insertInfoController)

module.exports = { authRouter }