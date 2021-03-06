const mysql = require('mysql')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let admin = true
let admitted = true

const createCompanyController = async (req, res) => {

  const data = req.body
  let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
  })
  try {
    await db.connect(async (err) => {
      if (err) {
        console.log(err);
      }
      await db.query(`CREATE DATABASE IF NOT EXISTS ${data.company.trim().replaceAll(' ', '_')}`, async (err, result) => {
        if (err) {
          console.log(`Database can't be created!!!`);
          res.status(400).json({ message: "Database can't be created!!!" })
        } else {
          console.log(`Database created successfully!!!`);
          res.status(200).json({ message: "Database created successfully!!!" })
        }
      })
    })
  } catch (error) {
    console.log('signUpController', error);
  }
}

const createTablesController = async (req, res) => {
  const data = req.body
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: data.company.trim().replaceAll(' ', '_')
  })

  try {
    await db.query(`CREATE TABLE IF NOT EXISTS users(
         _id INT(50) NOT NULL AUTO_INCREMENT,
         userId VARCHAR(100),
         firstName VARCHAR(100) NULL DEFAULT NULL,
         lastName VARCHAR(100) NULL DEFAULT NULL,
         fullName VARCHAR(100) NULL DEFAULT NULL,
         photo VARCHAR(100) NULL DEFAULT NULL,
         company VARCHAR(100) NULL DEFAULT NULL,
         companyName VARCHAR(100) NULL DEFAULT NULL,
         email VARCHAR(50) NULL DEFAULT NULL,
         position VARCHAR(50) NULL DEFAULT NULL,
         department VARCHAR(50) NULL DEFAULT NULL,
         departmentId INT(50) NULL DEFAULT NULL,         
         cellPhoneOne VARCHAR(50) NULL DEFAULT NULL,
         cellPhoneTwo VARCHAR(50) NULL DEFAULT NULL,
         address VARCHAR(100) NULL DEFAULT NULL,
         password VARCHAR(100) NULL DEFAULT NULL,
         positionId INT(50) NULL DEFAULT NULL,
         administrator VARCHAR(100) NULL DEFAULT NULL,
         admitted VARCHAR(100) NULL DEFAULT NULL,
    PRIMARY KEY(_id)
    )
    `, async (err, result) => {
      if (err) {
        console.log(err)
      } else {
        db.query(`SELECT * FROM users`, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            if (result.length > 0) {
              admin = false
              admitted = false
            }
          }
        })
        console.log(`User table created successfully!!!`)
        // res.status(200).json({ message: `User table created successfully!!!` })

        await db.query(`CREATE TABLE IF NOT EXISTS orders (
          _id INT(50) NOT NULL AUTO_INCREMENT,
          createDate VARCHAR(255) NULL DEFAULT NULL,
          orderCreator VARCHAR(255) NULL DEFAULT NULL,
          company VARCHAR(255) NULL DEFAULT NULL,
          user_id VARCHAR(255) NULL DEFAULT NULL,
          userId VARCHAR(255) NULL DEFAULT NULL,
          PRIMARY KEY(_id)
     )`, async (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Order table created successfully!!!`)

            await db.query(`SELECT * FROM ordersColumns`, async (err, result) => {
              if (err) {
                console.log(err)
                await db.query(`CREATE TABLE IF NOT EXISTS ordersColumns (
              _id INT(50) NOT NULL AUTO_INCREMENT,
              dbColumnName VARCHAR(255) NULL DEFAULT NULL,
              columnName VARCHAR(255) NULL DEFAULT NULL,
              visibleInNewOrder VARCHAR(255) NULL DEFAULT NULL,
              visibleInOrderList VARCHAR(255) NULL DEFAULT NULL, 
              PRIMARY KEY(_id)
            )`, async (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    await db.query(` INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('_id', 'Id', 'false', 'true');`, async (err, result) => {
                      if (err) {
                        console.log(err)
                      } else {
                        await db.query(`INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('createDate', 'Create Date', 'false', 'true')`, async (err, result) => {
                          if (err) {
                            console.log(err)
                          } else {
                            await db.query(`INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('orderCreator', 'Order Creator', 'false', 'true')`, (err, result) => {
                              if (err) {
                                console.log(err)
                              } else {
                                console.log(`Order columns table created successfully!!!`)
                              }
                            })
                          }
                        })
                      }
                    })
                  }

                  await db.query(`CREATE TABLE IF NOT EXISTS multiOrdersColumns (
                  _id INT(50) NOT NULL AUTO_INCREMENT,
                  dbColumnName VARCHAR(255) NULL DEFAULT NULL,
                  columnName VARCHAR(255) NULL DEFAULT NULL,
                  visibleInNewOrder VARCHAR(255) NULL DEFAULT NULL,
                  visibleInOrderList VARCHAR(255) NULL DEFAULT NULL, 
                  value VARCHAR(255) NULL DEFAULT NULL, 
                  PRIMARY KEY(_id)
                )`, async (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('Multi order columns table created successfully!!!')
                      await db.query(`CREATE TABLE IF NOT EXISTS multiOrders (
                        _id INT(50) NOT NULL AUTO_INCREMENT,
                        value VARCHAR(500) NULL DEFAULT NULL,
                        orderId INT(50) NULL DEFAULT NULL,
                        PRIMARY KEY(_id)
                      )`, async (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('Multi order table created successfully!!!');
                          await db.query(`CREATE TABLE IF NOT EXISTS balanceExcel (
                            _id INT(50) NOT NULL AUTO_INCREMENT,
                            createDate VARCHAR(500) NULL DEFAULT NULL,
                            excel VARCHAR(500) NULL DEFAULT NULL,
                            originalName VARCHAR(500) NULL DEFAULT NULL,
                            PRIMARY KEY(_id)
                          )`, async (err, result) => {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log('Excel table created successfully!!!')
                              await db.query(`CREATE TABLE IF NOT EXISTS dailyBalance (
                                _id INT(50) NOT NULL AUTO_INCREMENT,
                                code VARCHAR(255) NULL DEFAULT NULL,
                                balance VARCHAR(5000) NULL DEFAULT NULL,
                                PRIMARY KEY(_id)
                              )`, async (err, result) => {
                                if (err) {
                                  console.log(err)
                                } else {
                                  console.log('Daily balance table created successfully!!!')

                                  await db.query(`CREATE TABLE IF NOT EXISTS webOrderExcel (
                                  _id INT(50) NOT NULL AUTO_INCREMENT,
                                  createDate VARCHAR(500) NULL DEFAULT NULL,
                                  excel VARCHAR(500) NULL DEFAULT NULL,
                                  originalName VARCHAR(500) NULL DEFAULT NULL,
                                  PRIMARY KEY(_id)
                                 )`, async (err, result) => {
                                    if (err) {
                                      console.log(err)
                                    } else {
                                      console.log('Web Order Excel table created successfully!!!')
                                      await db.query(`CREATE TABLE IF NOT EXISTS dailyWebOrder (
                                        _id INT(50) NOT NULL AUTO_INCREMENT,
                                        createDate VARCHAR(500) NULL DEFAULT NULL,
                                        balance VARCHAR(500) NULL DEFAULT NULL,
                                        webOrderExcelId VARCHAR(500) NULL DEFAULT NULL,
                                        PRIMARY KEY(_id)
                                      )`, async (err, result) => {
                                        if (err) {
                                          console.log(err)
                                        } else {
                                          console.log('Daily Web Order table created successfully!!!')
                                          await db.query(`CREATE TABLE IF NOT EXISTS departments(
                                            _id INT(50) NOT NULL AUTO_INCREMENT,
                                            address VARCHAR(255) NULL DEFAULT NULL,
                                            departmentName VARCHAR(255) NULL DEFAULT NULL,
                                            phoneNumber VARCHAR(255) NULL DEFAULT NULL,
                                            manager VARCHAR(255) NULL DEFAULT NULL,
                                            PRIMARY KEY(_id)
                                          )`, async (err, result) => {
                                            if (err) {
                                              console.log(err);
                                            } else {
                                              console.log('Departments table created successfully!!!')
                                              await db.query(`CREATE TABLE IF NOT EXISTS customers(
                                                _id INT(50) NOT NULL AUTO_INCREMENT,
                                                firstName VARCHAR(255) NULL DEFAULT NULL,
                                                lastName VARCHAR(255) NULL DEFAULT NULL,
                                                phoneNumberOne VARCHAR(255) NULL DEFAULT NULL,
                                                phoneNumberTwo VARCHAR(255) NULL DEFAULT NULL,
                                                sendSms VARCHAR(255) NULL DEFAULT NULL,
                                                email VARCHAR(255) NULL DEFAULT NULL,
                                                sendEmail VARCHAR(255) NULL DEFAULT NULL,
                                                address VARCHAR(255) NULL DEFAULT NULL,
                                                dateOfBirth VARCHAR(255) NULL DEFAULT NULL,
                                                PRIMARY KEY(_id)
                                              )`, async (err, result) => {
                                                if (err) {
                                                  console.log(err);
                                                } else {
                                                  console.log('Customers table created successfully!!!')
                                                  await db.query(`CREATE TABLE IF NOT EXISTS employeesPositions(
                                                    _id INT(50) NOT NULL AUTO_INCREMENT,
                                                    position VARCHAR(255) NULL DEFAULT NULL,
                                                    PRIMARY KEY(_id)
                                                  )`, async (err, result) => {
                                                    if (err) {
                                                      console.log(err)
                                                    } else {
                                                      console.log('Employees positions table created successfully!!!')
                                                      await db.query(`CREATE TABLE IF NOT EXISTS allOrders(
                                                        _id INT(50) NOT NULL AUTO_INCREMENT,
                                                        createDate VARCHAR(500) NULL DEFAULT NULL,
                                                        code VARCHAR(500) NULL DEFAULT NULL,
                                                        id VARCHAR(500) NULL DEFAULT NULL,
                                                        productName VARCHAR(500) NULL DEFAULT NULL,
                                                        quantity VARCHAR(500) NULL DEFAULT NULL,
                                                        color VARCHAR(500) NULL DEFAULT NULL,
                                                        size VARCHAR(500) NULL DEFAULT NULL,
                                                        webOrderExcelId VARCHAR(500) NULL DEFAULT NULL,
                                                        orderId VARCHAR(500) NULL DEFAULT NULL,
                                                        PRIMARY KEY(_id)
                                                      )`, async (err, result) => {
                                                        if (err) {
                                                          console.log(err)
                                                        } else {
                                                          await db.query(`CREATE TABLE IF NOT EXISTS orderStatus (
                                                            _id INT(50) NOT NULL AUTO_INCREMENT,
                                                            orderStatus VARCHAR(500) NULL DEFAULT NULL,
                                                            PRIMARY KEY(_id)
                                                          )`, async (err, result) => {
                                                            if (err) {
                                                              console.log(err)
                                                            } else {
                                                              console.log('Order status table created successfully!!!')
                                                            }
                                                          })
                                                          console.log('All Orders table created successfully!!!')
                                                        }
                                                      })
                                                    }
                                                  })
                                                }
                                              })
                                            }
                                          })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })

                })
              } else {
                console.log('Order columns table already exist')
              }
            })
          }
        })
        res.status(200).json({ message: `Tables created successfully!!!` })
      }
    })
  } catch (error) {
    console.log('createUserController', error)
  }
}

const insertInfoController = async (req, res) => {
  const data = req.body
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: data.company.trim().replaceAll(' ', '_')
  })

  const hashPassword = await bcrypt.hash(data.password, 12)

  try {
    await db.query(`SELECT * FROM users WHERE email = '${data.email}'`, async (err, result) => {
      if (err) {
        console.log('SELECT ERROR FOR SIGNUP');
      } else {
        if (result.length === 0) {
          console.log('ADMIN', admin);
          await db.query(`INSERT INTO users(userId, firstName, lastName, fullName, company, companyName, email, password, administrator, admitted) VALUES('${uuid.v4()}', '${data.firstName}', '${data.lastName}', '${data.firstName} ${data.lastName}', '${data.company.trim().replaceAll(' ', '_')}', '${data.company.trim()}', '${data.email}', '${hashPassword}', '${admin}', '${admitted}')`, async (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json('err')
              return
            } else {
              await db.query(`SELECT * FROM users WHERE email = '${data.email}'`, async (err, result) => {
                if (err) {
                  console.log('SELECT USER ERROR');
                } else {
                  const token = await jwt.sign({ email: result.email, userId: result.userId }, 'test', { expiresIn: '1h' })
                  res.status(200).json({ result, token })
                }
              })
            }
          })
        } else {
          res.status(500).json({ message: "User already exist!!!" })
          console.log('User already exist');
        }
      }
    })
  } catch (error) {
    console.log('createUserController', error)
  }
}


const signInController = async (req, res) => {
  const data = req.body
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: data.company.trim().replaceAll(' ', '_')
  })

  try {
    await db.connect(async (err) => {
      if (err) {
        console.log("SIGN IN ERROR")
      } else {
        await db.query(`SELECT * FROM users WHERE email = '${data.email}'`, async (err, result) => {
          if (err) {
            console.log("SIGN IN ERR");
          } else {
            if (!result.length) {
              res.status(404).json({ message: `User doesn't exist` })
            } else {
              const isPasswordCorrect = await bcrypt.compare(data.password, result[0].password)
              if (!isPasswordCorrect) {
                res.status(404).json({ message: 'Credentials are incorrect' })
              } else {
                const token = jwt.sign({ email: result.email, userId: result.userId }, 'test', { expiresIn: '1h' })
                res.status(200).json({ result, token })
              }
            }
          }
        })
      }
    })
  } catch (error) {
    console.log('signInController', error);
  }
}

module.exports = { signInController, createCompanyController, createTablesController, insertInfoController }
