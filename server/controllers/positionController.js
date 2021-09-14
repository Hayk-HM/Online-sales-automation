const mysql = require('mysql')

const createPositionController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const query = `INSERT INTO employeesPositions (position) VALUES ('${req.body.position}')`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getPositionsController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM employeesPositions`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getPositionController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM employeesPositions WHERE _Id=${req.query.id}`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const updatePositionController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `UPDATE employeesPositions SET position='${req.body.position}' WHERE _id=${req.query.id}`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const deletePositionController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `DELETE FROM employeesPositions WHERE _id=${req.query.id}`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createPositionController,
  getPositionsController,
  getPositionController,
  updatePositionController,
  deletePositionController
}