const mysql = require('mysql')
const upload = require('../multer')

let excel

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
        excel = req.file
        res.status(200).send(req.file)
        await db.query(`INSERT INTO excel (createDate,originalName, excel) VALUES ('${Date.now()}', '${excel?.originalname}', '${excel?.filename}')`,)
      }
    })
  } catch (error) {
    console.log('uploadExcelStockBalanceController', error);
  }
}

const getExcelsController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const query = `SELECT * FROM excel ORDER BY createDate `

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

module.exports = { uploadExcelStockBalanceController, getExcelsController }