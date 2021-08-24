const mysql = require('mysql')
const jwt = require('jsonwebtoken')

const employeesController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'adminRoot',
    database: req.params.company.trim().replaceAll(' ', '_')
  })
  try {
    await db.connect(async (err) => {
      if (err) {
        console.log(err);
      } else {
        db.query(`SELECT * from users`, (err, result) => {
          if (err) {
            console.log('Employees error');
          } else (
            res.status(200).json(result)
          )
        })
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const employeeInfoController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.params.company.trim().replaceAll(' ', '_')
  })
  try {
    await db.query(`SELECT * FROM users WHERE userId='${req.params.userId}'`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })

  } catch (error) {
    console.log('employeeController', error);
  }
}

const updateEmployeeInformation = async (req, res) => {

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.companyName.trim().replaceAll(' ', '_')
  })
  try {
    await db.query(`UPDATE users SET photo = '${req.body.photo}',
    firstName = '${req.body.firstName}',
    lastName = '${req.body.lastName}',
    photo = '${req.body.photo}',
    email = '${req.body.email}',
    position = '${req.body.position}',
    department = '${req.body.department}',
    cellPhoneOne = '${req.body.cellPhoneOne}',
    cellPhoneTwo = '${req.body.cellPhoneTwo}',
    phone = '${req.body.phone}',
    address = '${req.body.address}',
    store = '${req.body.store}' 
    WHERE userId = '${req.params.userId}'`, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await db.query(`SELECT * FROM users WHERE userId = '${req.params.userId}'`, async (err, result) => {
          if (err) {
            console.log(err);
          } else {
            const token = await jwt.sign({ email: result.email, userId: result.userId }, 'test', { expiresIn: '1h' })
            res.status(200).json({ result, token })
          }
        })
      }
    })
  } catch (error) {
    console.log('updateEmployeeInformation', error);
  }
}

module.exports = { employeesController, employeeInfoController, updateEmployeeInformation }