const http = require('http')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { authRouter } = require('./routers/authRouter')
const { employeesRouter } = require('./routers/employeesRouter')
const { orderRouter } = require('./routers/orderRouter')

dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/auth', authRouter)
app.use('/app', employeesRouter)
app.use('/app/order', orderRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Server running on port ${PORT}...`);
})
