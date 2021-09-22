const mysql = require('mysql')

const createOrderStatusController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const query = `INSERT INTO orderStatus (orderStatus) VALUES ('${req.body.orderStatus}')`
  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getOrderStatusController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM orderStatus WHERE _id=${req.query.id}`
  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const getOrderStatusesController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM orderStatus`
  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const updateOrderStatusController = async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `UPDATE orderStatus SET orderStatus='${req.body.orderStatus}' WHERE _id=${req.query.id}`
  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteOrderStatusController = async (req, res) => {
  console.log(req.query);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `DELETE FROM orderStatus WHERE _id=${req.query.id}`
  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createOrderStatusController,
  getOrderStatusesController,
  getOrderStatusController,
  updateOrderStatusController,
  deleteOrderStatusController,
}