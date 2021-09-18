const express = require('express')
const { getOrdersWithBalanceController } = require('../controllers/ordersWithBalanceController')

const getOrdersWithBalanceRouter = express.Router()

getOrdersWithBalanceRouter.get('/getorders', getOrdersWithBalanceController)

module.exports = { getOrdersWithBalanceRouter }