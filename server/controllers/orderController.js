const mysql = require('mysql')

const createNewOrderController = async (req, res) => {
  console.log(req.body);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  try {
    db.query(``)
  } catch (error) {
    console.log('createNewOrderController', error);
  }
}

module.exports = { createNewOrderController }