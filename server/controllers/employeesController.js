const mysql = require('mysql')

const employeesController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'adminRoot',
    database: req.params.company.slice(1).trim().replaceAll(' ', '_')
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

const employeeController = async (req, res) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminRoot',
    database: req.params.company.slice(1).trim().replaceAll(' ', '_')
  })
  try {
    await db.query()

  } catch (error) {
    console.log('employeeController', error);
  }
}

module.exports = { employeesController, employeeController }