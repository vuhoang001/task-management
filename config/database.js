const mongoose = require('mongoose')

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('Connect database success !')
    } catch (e) {
        console.log('Connect database error !')
    }
}