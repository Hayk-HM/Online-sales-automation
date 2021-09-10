const http = require('http')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const socket = require('socket.io')
const { authRouter } = require('./routers/authRouter')
const { employeesRouter } = require('./routers/employeesRouter')
const { orderRouter } = require('./routers/orderRouter')
const { excelRouter } = require('./routers/excelRouter')
const { departmentRouter } = require('./routers/departmentRouter')

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000"],
  }
})

let activeUsers = []

const addActiveUser = (activeUser) => {
  !activeUsers.some(user => user.userId === activeUser.userId) && activeUsers.push(activeUser)
}

const removeActiveUser = (socketId) => {
  activeUsers = activeUsers.filter(user => user.socketId !== socketId)
}


io.on("connection", (socket) => {
  console.log(`User connected - ${socket.id}`);

  socket.on('addActiveUser', (data) => {
    addActiveUser({ ...data, socketId: socket.id })
    io.emit('getActiveUsers', activeUsers)
  })

  socket.on('disconnect', () => {
    console.log(`User was disconnected - ${socket.id}`)
    removeActiveUser(socket.id)
    io.emit("getActiveUsers", activeUsers);
  })
});

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/auth', authRouter)
app.use('/app', employeesRouter)
app.use('/app/order', orderRouter)
app.use('/app/excel', excelRouter)
app.use('/app/department', departmentRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Server running on port ${PORT}...`);
})
