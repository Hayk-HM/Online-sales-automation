const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const upload = require('../multer')

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
        db.query(`SELECT * FROM users`, (err, result) => {
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

let photo

const uploadEmployeeController = async (req, res) => {
  try {
    await upload.upload(req, res, (err) => {
      if (err) {
        res.status(500).json(err)
      } else {
        photo = req.file
        res.status(200).send(req.file)
      }
    })
  } catch (error) {
    console.log('uploadEmployeeController', error);
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
    await db.query(`UPDATE users SET 
      firstName = '${req.body.firstName}',
      lastName = '${req.body.lastName}',
      fullName = '${req.body.firstName + " " + req.body.lastName}',
      ${photo?.filename ? `photo = '${photo?.filename}'` : `photo = NULL`},
      email = '${req.body.email}',
      ${req.body.position ? `position = '${req.body.position}'` : `position = NULL`},
      ${req.body.department ? `department = '${req.body.department}'` : `department = NULL`},
      ${req.body.cellPhoneOne ? `cellPhoneOne = '${req.body.cellPhoneOne}'` : `cellPhoneOne = NULL`},
      ${req.body.cellPhoneTwo ? `cellPhoneTwo = '${req.body.cellPhoneTwo}'` : `cellPhoneTwo = NULL`},
      ${req.body.phone ? `phone = '${req.body.phone}'` : `phone = NULL`},
      ${req.body.address ? `address = '${req.body.address}'` : `address = NULL`}
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

const updateEmployeeInformationAdmin = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.body.companyName.trim().replaceAll(' ', '_')
  })

  const query = `UPDATE users SET 
  firstName = '${req.body.firstName}',
  lastName = '${req.body.lastName}',
  fullName = '${req.body.firstName + " " + req.body.lastName}',
  email = '${req.body.email}',
  ${req.body.position ? `position = '${req.body.position}'` : `position = NULL`},
  ${req.body.positionId ? `positionId = '${req.body.positionId}'` : `positionId = NULL`},
  ${req.body.department ? `department = '${req.body.department}'` : `department = NULL`},
  ${req.body.departmentId ? `departmentId = '${req.body.departmentId}'` : `departmentId = NULL`},
  ${req.body.cellPhoneOne ? `cellPhoneOne = '${req.body.cellPhoneOne}'` : `cellPhoneOne = NULL`},
  ${req.body.cellPhoneTwo ? `cellPhoneTwo = '${req.body.cellPhoneTwo}'` : `cellPhoneTwo = NULL`},
  ${req.body.phone ? `phone = '${req.body.phone}'` : `phone = NULL`},
  ${req.body.address ? `address = '${req.body.address}'` : `address = NULL`},
  ${req.body.administrator ? `administrator = '${req.body.administrator}'` : `administrator = NULL`},
  ${req.body.admitted ? `admitted = '${req.body.admitted}'` : `admitted = NULL`}
        WHERE userId = '${req.params.userId}'`
  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        db.query(`SELECT * FROM users WHERE userId = '${req.params.userId}'`, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            res.status(200).json(result)
          }
        })
      }
    })
  } catch (error) {

  }
}

const deleteEmployeeController = (req, res) => {
  console.log(req.query);
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.query.company.trim().replaceAll(' ', '_')
  })
  const query = `DELETE FROM users WHERE _id='${req.query.id}'`
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  employeesController,
  employeeInfoController,
  updateEmployeeInformation,
  uploadEmployeeController,
  updateEmployeeInformationAdmin,
  deleteEmployeeController,
}