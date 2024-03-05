const taskRoute = require('./task.route')
const userRoute = require('./user.route')
const authRoute = require('../../../middlewares/auth.middlewares')
module.exports = (app) => {
    const version = '/api/v1'
    app.use(version + `/tasks`, authRoute.requestAuth, taskRoute)
    app.use(version + `/user`, userRoute)
}


