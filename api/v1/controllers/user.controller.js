const userModel = require('../models/user.model')
const forgetPasswordModel = require('../models/forget-password.model')
const generate = require('../../../helpers/generateString.helper')
const sendMail = require('../../../helpers/sendMail.helpers')
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

// [POST] {{BASE_URL}}/api/v1/user/login 
module.exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const existedEmail = await userModel.findOne({
        email: email,
        deleted: false
    })
    if (!existedEmail) {
        res.json({
            code: 400,
            message: "Email không tồn tại !"
        })
        return
    }
    if (md5(password) != existedEmail.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu !"
        })
        return;
    }
    const token = existedEmail.tokenUser
    res.cookie("token", token)
    res.json({
        code: 200,
        token: token,
        message: "Đăng nhập thành công !"
    })
}


// [POST] {{BASE_URL}}/api/v1/user/forget-password 
module.exports.forgetPassword = async (req, res) => {
    const email = req.body.email
    const existedEmail = await userModel.findOne({
        email: email
    })
    if (!existedEmail) {
        res.json({
            code: 200,
            message: "Không tồn tại Email !"
        })
        return;
    }
    const otp = generate.generateNumber(5)
    const objectForgetPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }

    const forgetPassword = new forgetPasswordModel(objectForgetPassword)
    await forgetPassword.save()

    //Send OTP to Email 
    const object = 'OTP code to confirm to get your password'
    const html = `Your OTP is: ${otp}`
    sendMail.sendMail(email, object, html)
    res.json({
        code: 200,
        message: "Đã gửi mã OTP"
    })
}