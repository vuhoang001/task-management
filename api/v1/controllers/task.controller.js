const taskModel = require('../models/tasks.model')

const paginationHelper = require('../../../helpers/panigationHelpers.helper')

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

        // Pagination 
        let initPagination = {
            currentPage: 1,
            limitItems: 2
        }
        const countTasks = await taskModel.countDocuments(find)
        const objectPagination = paginationHelper(
            initPagination,
            req.query,
            countTasks
        )
        // End pagination 
        const data = await taskModel.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)

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