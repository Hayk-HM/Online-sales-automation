const mysql = require('mysql')

const createNewOrderController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })
  try {
    await db.query(`INSERT INTO orders 
    ( createDate,
      product,
      store,
      orderQuantity,
      shippedQuantity,
      price,
      purchasedQuantity,
      customerAddress,
      phoneNumberOne,
      phoneNumberTwo,
      customerName,
      orderPlace,
      orderCreator,
      whereTo,
      comment,
      company,
      user_id,
      userId
      ) VALUES 
    ( ${req.body.createDate ? `'${req.body.createDate}'` : `NULL`},
     ${req.body.product ? `'${req.body.product}'` : `NULL`},
     ${req.body.store ? `'${req.body.store}'` : `NULL`},
     ${req.body.orderQuantity ? `'${req.body.orderQuantity}'` : `NULL`},
     ${req.body.shippedQuantity ? `'${req.body.shippedQuantity}'` : `NULL`},
     ${req.body.price ? `'${req.body.price}'` : `NULL`},
     ${req.body.purchasedQuantity ? `'${req.body.purchasedQuantity}'` : `NULL`},
     ${req.body.customerAddress ? `'${req.body.customerAddress}'` : `NULL`},
     ${req.body.phoneNumberOne ? `'${req.body.phoneNumberOne}'` : `NULL`},
     ${req.body.phoneNumberTwo ? `'${req.body.phoneNumberTwo}'` : `NULL`},
     ${req.body.customerName ? `'${req.body.customerName}'` : `NULL`},
     ${req.body.orderPlace ? `'${req.body.orderPlace}'` : `NULL`},
     ${req.body.orderCreator ? `'${req.body.orderCreator}'` : `NULL`},
     ${req.body.whereTo ? `'${req.body.whereTo}'` : `NULL`},
     ${req.body.comment ? `'${req.body.comment}'` : `NULL`},
     ${req.body.company ? `'${req.body.company}'` : `NULL`},
     ${req.body.user_id ? `'${req.body.user_id}'` : `NULL`},
     ${req.body.userId ? `'${req.body.userId}'` : `NULL`}
      )
    `, (err, result) => {
      if (err) {
        console.log(error);
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

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.company.trim().replaceAll(' ', '_')
  })

  const query = `ALTER TABLE orders DROP COLUMN ${req.body.tableColumnsName}`

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: 'Columns deleted successfully!!!' })
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const addOrderColumnsController = async (req, res) => {

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

module.exports = { createNewOrderController, getOrdersController, getOrderColumnsController, deleteOrderColumnsController, addOrderColumnsController }