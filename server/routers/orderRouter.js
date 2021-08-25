const express = require('express')
const { createNewOrderController } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createneworder', createNewOrderController)

module.exports = { orderRouter }
