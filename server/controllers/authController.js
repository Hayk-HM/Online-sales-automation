const mysql = require('mysql')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    await db.query(`CREATE TABLE IF NOT EXISTS users  (_id INT(50) NOT NULL AUTO_INCREMENT,
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
         cellPhoneOne VARCHAR(50) NULL DEFAULT NULL,
         cellPhoneTwo VARCHAR(50) NULL DEFAULT NULL,
         phone VARCHAR(50) NULL DEFAULT NULL,
         address VARCHAR(100) NULL DEFAULT NULL,
         store VARCHAR(50) NULL DEFAULT NULL,
         password VARCHAR(100) NULL DEFAULT NULL,
    PRIMARY KEY(_id)
    )
    `, async (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`User table created successfully!!!`)
        // res.status(200).json({ message: `User table created successfully!!!` })

        await db.query(`CREATE TABLE IF NOT EXISTS orders (
          _id INT(50) NOT NULL AUTO_INCREMENT,
          createDate DATETIME NULL DEFAULT NULL,
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
                await db.query(` INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('_id', 'Id', 'false', 'false');`, async (err, result) => {
                  if (err) {
                    console.log(err)
                  } else {
                    await db.query(`INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('createDate', 'Create Date', 'false', 'false')`, async (err, result) => {
                      if (err) {
                        console.log(err)
                      } else {
                        await db.query(`INSERT INTO ordersColumns (dbColumnName, columnName, visibleInNewOrder, visibleInOrderList) VALUES ('orderCreator', 'Order Creator', 'false', 'false')`, (err, result) => {
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
          await db.query(`INSERT INTO users (userId, firstName, lastName, fullName, company, companyName, email, password) VALUES ('${uuid.v4()}', '${data.firstName}', '${data.lastName}', '${data.firstName} ${data.lastName}' , '${data.company.trim().replaceAll(' ', '_')}', '${data.company.trim()}', '${data.email}', '${hashPassword}')`, async (err, result) => {
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
