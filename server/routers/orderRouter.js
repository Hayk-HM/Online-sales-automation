const express = require('express')
const { createNewOrderController, getOrdersController, getOrderColumnsController, deleteOrderColumnsController, addOrderColumnsController } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/createneworder', createNewOrderController)
orderRouter.get('/getorders', getOrdersController)
orderRouter.get('/getordercolumns', getOrderColumnsController)
orderRouter.put('/deleteordercolumn', deleteOrderColumnsController)
orderRouter.put('/addordercolumn', addOrderColumnsController)

module.exports = { orderRouter }
