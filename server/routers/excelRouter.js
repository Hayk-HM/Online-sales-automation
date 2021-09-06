const express = require('express')
const {
  uploadExcelStockBalanceController,
  getExcelsController } = require('../controllers/excelController')

const excelRouter = express.Router()

excelRouter.post('/uploadexcelstockbalance', uploadExcelStockBalanceController)
excelRouter.get('/getexcels', getExcelsController)

module.exports = { excelRouter }