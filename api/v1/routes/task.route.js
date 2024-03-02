const express = require('express')
const Router = express.Router()

const taskModel = require('../../../models/tasks.model')
Router.get('/', async (req, res) => {
    const data = await taskModel.find({
        deleted: false
    })

    res.json(data)
})


Router.get('/detail/:id', async (req, res) => {
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


module.exports = Router