const mysql = require('mysql')

const createNewDepartmentController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const query = `INSERT INTO departments (address, departmentName, phoneNumber, manager) VALUES ('${req.body.address}', '${req.body.departmentName}', '${req.body.phoneNumber}', '${req.body.manager}')`
  const queryAllOrders = `ALTER TABLE allOrders 
  ADD COLUMN ${req.body.departmentName + '_amount'} VARCHAR(255) NULL DEFAULT NULL,
  ADD COLUMN ${req.body.departmentName + '_statusId'} VARCHAR(255) NULL DEFAULT NULL`
  try {
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json(err)
        console.log(err);
      } else {
        db.query(queryAllOrders, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('DONE');
          }
        })
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getDepartmentsController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM departments`
  try {
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json(err)
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getDepartmentController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM departments WHERE _id=${req.query.id}`
  try {
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json(err)
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const updateDepartmentController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `UPDATE departments SET address='${req.body.address}', departmentName='${req.body.departmentName}', phoneNumber='${req.body.phoneNumber}', manager='${req.body.manager}' WHERE _id=${req.query.id} `
  try {
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json(err)
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const deleteDepartmentController = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `DELETE FROM departments WHERE _id=${req.query.id}`
  const queryAllOrders = `ALTER TABLE allOrders 
                          DROP COLUMN ${req.body.departmentName + '_amount'},
                          DROP COLUMN ${req.body.departmentName + '_statusId'}`
  try {
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json(err)
        console.log(err);
      } else {
        db.query(queryAllOrders, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Done');
          }
        })
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createNewDepartmentController,
  getDepartmentsController,
  getDepartmentController,
  updateDepartmentController,
  deleteDepartmentController
}