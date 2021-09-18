const mysql = require('mysql')
const upload = require('../multer')
const xlsx = require('xlsx')
const path = require('path')
const fs = require('fs')

let balanceExcel
let webOrderExcel
let webOrderInsertId

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
        const today = new Date();
        await db.query(`INSERT INTO webOrderExcel (createDate,originalName, excel) VALUES ('${today.getFullYear() + "-" + ((today.getMonth() + 1) <= 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() <= 9 ? ("0" + today.getDate()) : today.getDate())}', '${webOrderExcel?.originalname}', '${webOrderExcel?.filename}')`, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            webOrderInsertId = result.insertId
          }
        })
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

const getWebOrderExcelsController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const query = `SELECT * FROM webOrderExcel ORDER BY createDate `

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

const deleteFileBalance = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })

  const pathExcel = path.join(__dirname, '..', 'public', 'excel', `${req.body.name}`)
  const query = `DELETE FROM balanceExcel WHERE _id=${req.body.id}`
  console.log(req.body);
  try {
    await fs.unlinkSync(pathExcel)
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Deleted successfully!!!');
      }
    })
    res.status(200).json({ message: 'Deleted successfully!!!' })
  } catch (error) {
    console.log(error)
  }
}

const deleteFileWebOrder = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })

  const pathExcel = path.join(__dirname, '..', 'public', 'excel', `${req.body.name}`)
  const query = `DELETE FROM webOrderExcel WHERE _id=${req.body.id}`
  const queryDeleteDailyWebOrder = `DELETE FROM dailyWebOrder WHERE webOrderExcelId=${req.body.id}`
  const queryDeleteFromAllOrders = `DELETE FROM allOrders WHERE webOrderExcelId=${req.body.id}`
  try {
    await fs.unlinkSync(pathExcel)
    await db.query(query, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Deleted successfully!!!');
        await db.query(queryDeleteDailyWebOrder, async (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Daily web order deleted successfully!!!');
            await db.query(queryDeleteFromAllOrders, (err, result) => {
              if (err) {
                console.log(err)
              } else {
                console.log('All orders deleted successfully!!!');
              }
            })
          }
        })
      }
    })
    res.status(200).json({ message: 'Deleted successfully!!!' })
  } catch (error) {
    console.log(error)
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
        data.map(async elem => {
          await db.query(`INSERT INTO dailyBalance (code, balance) VALUES ('${elem['Артикул']}','${JSON.stringify(elem)}')`, (err, result) => {
            if (err) {
              console.log(err);
            }
          })
        })
      }
    })
    res.status(200).json({ message: 'DONE!!!' })
  } catch (error) {
    console.log(error);
  }
}

const readExcelFileWebOrder = async (req, res) => {

  const filePath = path.join(__dirname, '..', 'public', 'excel', `${webOrderExcel.filename}`)
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
  try {
    const today = new Date();
    data.map(async elem => await db.query(`INSERT INTO dailyWebOrder (createDate,balance, webOrderExcelId) VALUES ('${today.getFullYear() + "-" + ((today.getMonth() + 1) <= 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() <= 9 ? ("0" + today.getDate()) : today.getDate())}','${JSON.stringify(elem)}', '${webOrderInsertId}')`, async (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    )
    await data.map(elem => db.query(`INSERT INTO allOrders (createDate,code,id,productName,webOrderExcelId) 
        VALUES 
        ('${today.getFullYear() + "-" + ((today.getMonth() + 1) <= 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() <= 9 ? ("0" + today.getDate()) : today.getDate())}','${elem.Code}','${elem.ID}', '${elem.Order}','${webOrderInsertId}')`)
    )
    res.status(200).json({ message: 'DONE!!!' })
  } catch (error) {
    console.log(error);
  }
}

const getDailyWebOrdersController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM dailyWebOrder WHERE createDate='${req.query.createDate}'`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong' })
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  uploadExcelStockBalanceController,
  getBalanceExcelsController,
  readExcelFileBalance,
  deleteFileBalance,
  deleteFileWebOrder,
  getWebOrderExcelsController,
  readExcelFileWebOrder,
  uploadExcelWebOrderController,
  getDailyWebOrdersController,
}