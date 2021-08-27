const express = require('express')
const { createNewOrderController, getOrdersController } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createneworder', createNewOrderController)
orderRouter.get('/getorders', getOrdersController)

module.exports = { orderRouter }
