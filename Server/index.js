const express = require('express')
const server = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Router = require('./Router/index')
require('dotenv').config()
const path = require('path')
console.log('CLIENT:', process.env.CLIENT)
console.log('ADMIN:', process.env.ADMIN)
console.log('PORT:', process.env.PORT)
// ✅ Correct static path
server.use('/uploads', express.static(path.join(__dirname, 'uploads')))

server.use(
  cors({
    origin: [process.env.CLIENT],
    credentials: true,
  })
)
server.use(bodyparser.json())
server.use(express.json())
server.use('/api', Router)

const DBConnection = mongoose.connect(process.env.DBconnection)

DBConnection.then(() => {
  server.listen(process.env.PORT, () => {
    console.log('server is running')
    console.log('DB')
  })
}).catch((err) => {
  console.log('Error:', err)
})
