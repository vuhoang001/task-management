const taskModel = require('../models/tasks.model')

module.exports.index = async (req, res) => {
    {
        const data = await taskModel.find({
            deleted: false
        })

        res.json(data)
    }
}


module.exports.detail = async (req, res) => {
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
}