const taskModel = require('../models/tasks.model')

const paginationHelper = require('../../../helpers/panigationHelpers.helper')
const searchHelper = require('../../../helpers/searchHelper.helper')
// [GET] /api/v1/tasks 
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

        // Search 
        let objectSearch = searchHelper(req.query)
        if (req.query.keyword) {
            find.title = objectSearch.regex
        }
        // End search 

        const data = await taskModel.find(find)
            .sort(sort)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip)

        res.json(data)
    }
}

// [GET] /api/v1/tasks/detail/:id 
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

// [GET] /api/v1/tasks/change-status/:id 
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.status;
        await taskModel.updateOne({
            _id: id,
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công !"
        })
    } catch (e) {
        res.json({
            code: 400,
            message: "Cập nhật trạng thái thất bại !"
        })
    }
}