const mongoose = require('mongoose')

const forgetPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 180
        }
    }, { timestamps: true }
)

const forgetPassword = mongoose.model("forgetPassword", forgetPasswordSchema, "forgetPasswords")

module.exports = forgetPassword