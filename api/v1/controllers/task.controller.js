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

// [PATCH] /api/v1/tasks/change-status/:id 
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

// [PATCH] /api/v1/tasks/change-multi 
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids
    const key = req.body.key
    const value = req.body.value
    switch (key) {
        case "status": {
            await taskModel.updateMany({
                _id: { $in: ids }
            }, {
                status: value
            })

            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công !"
            })
            break
        }
        case "delete": {
            await taskModel.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true,
                deletedAt: new Date()
            })

            res.json({
                code: 200,
                message: "Xóa nhiều records thành công !"
            })
            break
        }
        default: {
            res.json({
                code: 400,
                message: "Hoạt động thất bại !"
            })
            break;
        }

    }
}

//[POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
    try {
        req.body.createdBy = req.user.id
        req.body.listUsers = req.body.listUsers
        const task = new taskModel(req.body)
        const data = await task.save()
        res.json({
            code: 200,
            data: data,
            message: "Thêm mới thành công !"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Thêm mới thất bại !"
        })
    }
}

//[PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const data = await taskModel.updateOne({
            _id: id
        }, req.body)
        res.json({
            code: 200,
            message: "Chỉnh sửa thành công !"
        })
    } catch (e) {
        res.json({
            code: 200,
            message: "Chỉnh sửa thất bại !"
        })
    }


}

// [DELETE] /api/v1/tasks/delete/:id 
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id
        await taskModel.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date()
        })

        res.json({
            code: 200,
            message: "Xóa thành công !"
        })
    } catch (e) {
        res.json({
            code: 400,
            message: "Xóa thất bại !"
        })
    }
}