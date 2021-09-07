const express = require('express')
const {
  uploadExcelStockBalanceController,
  getBalanceExcelsController,
  readExcelFileBalance } = require('../controllers/excelController')

const excelRouter = express.Router()

excelRouter.post('/uploadexcelstockbalance', uploadExcelStockBalanceController)
excelRouter.get('/getexcels', getBalanceExcelsController)
excelRouter.get('/getdailybalance', readExcelFileBalance)

module.exports = { excelRouter }