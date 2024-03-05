const userModel = require('../models/user.model')
const generate = require('../../../helpers/generateString.helper')
const md5 = require('md5')
module.exports.register = async (req, res) => {
    try {
        req.body.password = md5(req.body.password)
        const existEmail = await userModel.findOne({
            email: req.body.email,
            deleted: false
        })

        if (!existEmail) {
            const data = new userModel({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            })
            data.save()
            const token = data.tokenUser
            res.cookie("token", token)
            res.json({
                code: 200,
                token: token,
                message: "Đăng ký tài khoản thành công !"
            })
        } else {
            res.json({
                code: 400,
                message: "Email đã tồn tại !"
            })
        }

    } catch (er) {
        res.json({
            code: 400,
            message: "Đăng ký tài khoản thất bại !"
        })
    }
}