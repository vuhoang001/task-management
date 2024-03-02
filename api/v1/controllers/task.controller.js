const taskModel = require('../models/tasks.model')

module.exports.index = async (req, res) => {
    {
        const find = {
            deleted: false
        }
        const sort = {

        }
        const status = req.query.status
        if (status) {
            find.status = status
        }

        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue
        }
        const data = await taskModel.find(find).sort(sort)

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