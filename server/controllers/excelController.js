const mysql = require('mysql')
const upload = require('../multer')
const xlsx = require('xlsx')
const path = require('path')

let balanceExcel
let webOrderExcel

const uploadExcelWebOrderController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  try {
    await upload.upload(req, res, async (err) => {
      if (err) {
        res.status(500).json(err)
      } else {
        webOrderExcel = req.file
        res.status(200).send(req.file)
        await db.query(`INSERT INTO webOrderExcel (createDate,originalName, excel) VALUES ('${Date.now()}', '${webOrderExcel?.originalname}', '${webOrderExcel?.filename}')`,)
      }
    })
  } catch (error) {
    console.log('uploadExcelStockBalanceController', error);
  }
}


const uploadExcelStockBalanceController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  try {
    await upload.upload(req, res, async (err) => {
      if (err) {
        res.status(500).json(err)
      } else {
        balanceExcel = req.file
        res.status(200).send(req.file)
        const today = new Date();
        await db.query(`INSERT INTO balanceExcel (createDate,originalName, excel) VALUES ('${today.getFullYear() + "-" + ((today.getMonth() + 1) <= 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() <= 9 ? ("0" + today.getDate()) : today.getDate())}', '${balanceExcel?.originalname}', '${balanceExcel?.filename}')`,)
      }
    })
  } catch (error) {
    console.log('uploadExcelStockBalanceController', error);
  }
}

const getBalanceExcelsController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const query = `SELECT * FROM balanceExcel ORDER BY createDate `

  try {
    await db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something happened in the server' })
      } else {
        const sendResult = result.sort((a, b) => -1)
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const readExcelFileOrder = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  try {

  } catch (error) {
    console.log(error);
  }
}

const readExcelFileBalance = async (req, res) => {

  const filePath = path.join(__dirname, '..', 'public', 'excel', `${balanceExcel.filename}`)
  const wb = xlsx.readFile((filePath), { cellDates: true })
  const ws = wb.Sheets['TDSheet']
  const data = xlsx.utils.sheet_to_json(ws)

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  // const query = `INSERT INTO dailyBalance (balance) VALUES ('${[data[0], data[1], data[2]]}')`
  const queryTruncate = `TRUNCATE TABLE dailyBalance`

  try {
    await db.query(queryTruncate, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Balance table  truncated!!!')
        const newArr = data.filter(elem => elem['Артикул'] === 8713)
        data.map(async elem => await db.query(`INSERT INTO dailyBalance (balance) VALUES ('${JSON.stringify(elem)}')`, (err, result) => {
          if (err) {
            console.log(err);
          }
        })
        )
      }

    })
    res.status(200).json({ message: 'DONE!!!' })
  } catch (error) {
    console.log(error);
  }
}

module.exports = { uploadExcelStockBalanceController, getBalanceExcelsController, readExcelFileBalance }