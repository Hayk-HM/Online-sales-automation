const express = require('express')
const { signInController, signUpController, createUserController } = require('../controllers/signInController')

const authRouter = express.Router()

authRouter.post('/signin', signInController)
authRouter.post('/signup', createUserController)

module.exports = { authRouter }