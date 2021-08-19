const http = require('http')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mysql = require('mysql')
const { authRouter } = require('./routers/authRouter')

////////// Create MySQL database //////////

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'adminRoot',
//   database: 'myDB'
// })

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected to the MySQL!")
//     // db.query('CREATE DATABASE TaskAppHaGroup', (err, result) => {
//     db.query('CREATE DATABASE IF NOT EXISTS TaskAppHaGroup', (err, result) => {
//       if (err) {
//         console.log(`Database can't be created!!!`);
//       } else if (result) {
//         console.log(`Database already existed!!!`);
//       } else {
//         console.log(`Database created successfully!!!`);
//       }
//     })
//   }
// })

///////////////////////////////////////////

dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Server running on port ${PORT}...`);
})
