const express = require('express')


// Nhúng dotenv
require('dotenv').config()
// Kết thúc nhúng dotenv


const app = express()
const port = process.env.PORT


// Kết nối database
const database = require('./config/database')
database.connect()
// Kết thúc kết nối database


// Router version 1
const routerVersion1 = require('./api/v1/routes/index.route')

routerVersion1(app)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})