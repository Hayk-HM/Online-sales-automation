const express = require('express')
const { createNewOrderController,
  createNewAllOrderController,
  getOrdersController,
  getOrderColumnsController,
  deleteOrderColumnsController,
  deleteMultiOrderColumnsController,
  addOrderColumnsController,
  getOrdersAdmissibilityController,
  changeOrdersVisibilityController,
  changeMultiOrdersVisibilityController,
  getmultiorderscolumnsadmissibilityController,
  addMultiOrdersColumnsController,
  getOrdersWithDate,
  getAllOrdersWithBalanceController } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createneworder', createNewOrderController)
orderRouter.post('/createnewallorder', createNewAllOrderController)
orderRouter.get('/getorders', getOrdersController)
orderRouter.get('/getorderswithdate', getOrdersWithDate)
orderRouter.get('/getordercolumns', getOrderColumnsController)
orderRouter.put('/deleteordercolumn', deleteOrderColumnsController)
orderRouter.put('/deletemultiordercolumn', deleteMultiOrderColumnsController)
orderRouter.put('/addordercolumn', addOrderColumnsController)
orderRouter.put('/addmultiorderscolumns', addMultiOrdersColumnsController)
orderRouter.get('/getOrdersAdmissibility', getOrdersAdmissibilityController)
orderRouter.put('/changeordersvisibility', changeOrdersVisibilityController)
orderRouter.put('/changemultiordersvisibility', changeMultiOrdersVisibilityController)
orderRouter.get('/getmultiorderscolumnsadmissibility', getmultiorderscolumnsadmissibilityController)
orderRouter.get('/getallorderswithbalance', getAllOrdersWithBalanceController)

module.exports = { orderRouter }
