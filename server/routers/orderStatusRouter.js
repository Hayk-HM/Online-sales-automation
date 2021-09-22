const express = require('express')
const { createOrderStatusController,
  getOrderStatusesController,
  updateOrderStatusController,
  deleteOrderStatusController,
  getOrderStatusController } = require('../controllers/orderStatusController')

const orderStatusRouter = express.Router()

orderStatusRouter.post('/createorderstatus', createOrderStatusController)
orderStatusRouter.get('/getorderstatuses', getOrderStatusesController)
orderStatusRouter.get('/getorderstatus', getOrderStatusController)
orderStatusRouter.put('/updateorderstatus', updateOrderStatusController)
orderStatusRouter.post('/deleteorderstatus', deleteOrderStatusController)

module.exports = { orderStatusRouter }
