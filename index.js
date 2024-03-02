const express = require('express')
const app = express()
const bodyParse = require('body-parser')
require('dotenv').config()
const port = process.env.PORT
const database = require('./config/database')
database.connect()

// parse application/json 
app.use(bodyParse.json())
// Router version 1
const routerVersion1 = require('./api/v1/routes/index.route')

routerVersion1(app)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})