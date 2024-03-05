const userModel = require('../api/v1/models/user.model')
module.exports.requestAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        const user = await userModel.findOne({
            tokenUser: token
        }).select("-password")
        if (!user) {
            res.json({
                code: 200,
                message: "Token không hợp lệ"
            })
            return
        }

        req.user = user
        next()
    } else {
        res.json({
            code: 400,
            message: "Vui lòng gửi thêm token !"
        })
        next()
    }
}