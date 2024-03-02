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


const taskModel = require('./models/tasks.model')

app.get('/tasks', async (req, res) => {
    const data = await taskModel.find({
        deleted: false
    })

    res.json(data)
})


app.get('/tasks/detail/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await taskModel.findOne({
            _id: id,
            deleted: false
        })

        res.json(data)
    } catch (e) {
        res.json('ERROR !')
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})