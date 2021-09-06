const express = require('express')
const { createNewOrderController,
  getOrdersController,
  getOrderColumnsController,
  deleteOrderColumnsController,
  deleteMultiOrderColumnsController,
  addOrderColumnsController,
  getOrdersAdmissibilityController,
  changeOrdersVisibilityController,
  changeMultiOrdersVisibilityController,
  getmultiorderscolumnsadmissibilityController,
  addMultiOrdersColumnsController } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createneworder', createNewOrderController)
orderRouter.get('/getorders', getOrdersController)
orderRouter.get('/getordercolumns', getOrderColumnsController)
orderRouter.put('/deleteordercolumn', deleteOrderColumnsController)
orderRouter.put('/deletemultiordercolumn', deleteMultiOrderColumnsController)
orderRouter.put('/addordercolumn', addOrderColumnsController)
orderRouter.put('/addmultiorderscolumns', addMultiOrdersColumnsController)
orderRouter.get('/getOrdersAdmissibility', getOrdersAdmissibilityController)
orderRouter.put('/changeordersvisibility', changeOrdersVisibilityController)
orderRouter.put('/changemultiordersvisibility', changeMultiOrdersVisibilityController)
orderRouter.get('/getmultiorderscolumnsadmissibility', getmultiorderscolumnsadmissibilityController)

module.exports = { orderRouter }
