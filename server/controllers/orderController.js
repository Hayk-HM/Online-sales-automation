const mysql = require('mysql')

const createNewOrderController = async (req, res) => {
  console.log(req.body);
  console.log(Object.keys(req.body));
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  try {
    await db.query(`INSERT INTO orders 
    ( ${Object.keys(req.body)}
      ) VALUES 
    ( ${Object.keys(req.body).map(elem => req.body[elem] ? typeof (req.body[elem]) === 'object' ? `'${JSON.stringify(req.body[elem])}'` : `'${req.body[elem]}'` : `NULL`)} 
      )`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log('createNewOrderController', error);
  }
}

const getOrdersController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const getAllOrders = `SELECT * FROM orders ORDER BY createDate`
  const getOrder = `SELECT * FROM orders WHERE orders._id = '${req.query._id}' `

  let query = req.query._id ? getOrder : getAllOrders

  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getOrderColumnsController = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const query = `SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = 'orders'`

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

const deleteOrderColumnsController = async (req, res) => {
  console.log(req.body);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })

  const queryOrders = `ALTER TABLE ${req.body.table} DROP COLUMN ${req.body.tableColumnsName}`
  const queryOrderColumns = `DELETE FROM ordersColumns WHERE _id = ${req.body._id}`


  try {
    await db.query(queryOrders, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await db.query(queryOrderColumns, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: 'Columns deleted successfully!!!' })
          }
        })

      }
    })
  } catch (error) {
    console.log(error);
  }
}

const deleteMultiOrderColumnsController = async (req, res) => {
  console.log(req.body);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })

  const queryOrders = `ALTER TABLE ${req.body.table} DROP COLUMN ${req.body.tableColumnsName}`
  const queryOrderColumns = `DELETE FROM multiOrdersColumns WHERE _id = ${req.body._id}`

  try {
    await db.query(queryOrders, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await db.query(queryOrderColumns, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: 'Columns deleted successfully!!!' })
          }
        })

      }
    })
  } catch (error) {
    console.log(error);
  }
}

const addOrderColumnsController = async (req, res) => {
  console.log('sfsddsds', req.body);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const queryOrder = `ALTER TABLE orders 
  ADD COLUMN ${req.body.columnName.trim().replaceAll(' ', '_')} VARCHAR(255) NULL DEFAULT NULL`
  const queryOrderColumns = `INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('${req.body.columnName.trim().replaceAll(' ', '_')}', '${req.body.columnName}', '${req.body.isVisibleInNewOrder}', '${req.body.isVisibleInOrderList}')`
  try {
    await db.query(queryOrder, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await db.query(queryOrderColumns, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: 'Columns created successfully!!!' })
          }
        })
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const addMultiOrdersColumnsController = async (req, res) => {
  console.log(req.body);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const queryOrder = `ALTER TABLE orders 
  ADD COLUMN ${req.body.columnName.trim().replaceAll(' ', '_')} VARCHAR(255) NULL DEFAULT NULL`
  const queryOrderColumns = `INSERT INTO multiOrdersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList, value) VALUES ('${req.body.columnName.trim().replaceAll(' ', '_')}', '${req.body.columnName}', '${req.body.isVisibleInNewOrder}', '${req.body.isVisibleInOrderList}', '${JSON.stringify(req.body.value)}')`
  try {
    await db.query(queryOrder, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await db.query(queryOrderColumns, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: 'Columns created successfully!!!' })
          }
        })
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getOrdersAdmissibilityController = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })

  const query = `SELECT * FROM ordersColumns`

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })

  } catch (error) {
    console.log(error);
  }
}

const changeOrdersVisibilityController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const query = `UPDATE ${req.body.table} SET ${req.body.field} = '${req.body.value}' WHERE (_id = '${req.body._id}');`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const changeMultiOrdersVisibilityController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  const query = `UPDATE ${req.body.table} SET ${req.body.field} = '${req.body.value}' WHERE (_id = '${req.body._id}');`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const getmultiorderscolumnsadmissibilityController = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `SELECT * FROM multiOrdersColumns`

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createNewOrderController,
  getOrdersController,
  getOrderColumnsController,
  deleteOrderColumnsController,
  deleteMultiOrderColumnsController,
  addOrderColumnsController,
  getOrdersAdmissibilityController,
  changeOrdersVisibilityController,
  changeMultiOrdersVisibilityController,
  getmultiorderscolumnsadmissibilityController,
  addMultiOrdersColumnsController
}