const mysql = require('mysql')


const signInController = async (req, res) => {
  const data = req.body
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: 'data.company'
  })
  try {
    db.connect((err) => {
      if (err) {
        log("ERROR")
      } else {
        db.query("CREATE TABLE MyPersonalTable (name VARCHAR(255), address VARCHAR(255))", (err, result) => {
          if (err) throw err
          console.log('MyPersonalTable', result);
        })
        db.query("SELECT * FROM customers", function (err, result, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      }
    })
    console.log(data);
    res.status(200).json(data)
  } catch (error) {
    console.log('signInController', error);
  }
}









const signUpController = async (req, res) => {

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
      await db.query(`CREATE DATABASE IF NOT EXISTS ${data.company}`, async (err, result) => {
        if (err) {
          console.log(`Database can't be created!!!`);
          res.status(400).json({ "message": "Database can't be created!!!" })
        } else {
          console.log(`Database created successfully!!!`);
          res.status(200).json({ "message": "Database created successfully!!!" })
        }
      })
    })
  } catch (error) {
    console.log('signUpController', error);
  }
}

const createUserController = async (req, res) => {
  const data = req.body
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: data.company
  })

  try {

    await db.query(`CREATE TABLE IF NOT EXISTS users (UserId int,firstName VARCHAR(255), lastName VARCHAR(255), company VARCHAR(255), email VARCHAR(255), password VARCHAR(255))`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`User table created successfully!!!`)
        res.status(200).json({ "message": `User table created successfully!!!` })
      }
    })

    await db.query(`INSERT INTO users(UserId,firstName, lastName, company, email, password) VALUES (${1},'${data.firstName}', '${data.lastName}','${data.company}','${data.email}','${data.password}')`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json('err')
      } else {
        res.status(200).json({ result })
      }
    })
  } catch (error) {
    console.log('createUserController', error)
  }
}

module.exports = { signInController, signUpController, createUserController }
