const express = require('express')
const {
  uploadExcelStockBalanceController,
  getBalanceExcelsController,
  readExcelFileBalance,
  deleteFileBalance,
  getWebOrderExcelsController,
  readExcelFileWebOrder,
  uploadExcelWebOrderController,
  deleteFileWebOrder } = require('../controllers/excelController')

const excelRouter = express.Router()

excelRouter.post('/uploadexcelstockbalance', uploadExcelStockBalanceController)
excelRouter.post('/uploadexcelweborder', uploadExcelWebOrderController)
excelRouter.get('/getexcels', getBalanceExcelsController)
excelRouter.get('/getexcelsweborder', getWebOrderExcelsController)
excelRouter.get('/getdailybalance', readExcelFileBalance)
excelRouter.get('/getdailyweborder', readExcelFileWebOrder)
excelRouter.put('/deleteexcelbalance', deleteFileBalance)
excelRouter.put('/deleteexcelweborder', deleteFileWebOrder)

module.exports = { excelRouter }