const mysql = require('mysql')

const getOrdersWithBalanceController = async (req, res) => {
  console.log(req.query);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const queryOrders = `SELECT * FROM orders WHERE createDate='${req.query.createDate}'`
  const queryWebOrders = `SELECT * FROM dailyWebOrder WHERE createDate='${req.query.createDate}'`

  try {
    await db.query(queryOrders, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })

    await db.query(queryWebOrders, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getOrdersWithBalanceController
}
