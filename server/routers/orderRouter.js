const express = require('express')
const { createNewOrderController,
  getOrdersController,
  getOrderColumnsController,
  deleteOrderColumnsController,
  addOrderColumnsController,
  getOrdersAdmissibilityController,
  changeOrdersVisibilityController } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createneworder', createNewOrderController)
orderRouter.get('/getorders', getOrdersController)
orderRouter.get('/getordercolumns', getOrderColumnsController)
orderRouter.put('/deleteordercolumn', deleteOrderColumnsController)
orderRouter.put('/addordercolumn', addOrderColumnsController)
orderRouter.get('/getOrdersAdmissibility', getOrdersAdmissibilityController)
orderRouter.put('/changeordersvisibility', changeOrdersVisibilityController)

module.exports = { orderRouter }
