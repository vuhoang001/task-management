const taskRoute = require('./task.route')
const userRoute = require('./user.route')
module.exports = (app) => {
    const version = '/api/v1'
    app.use(version + `/tasks`, taskRoute)
    app.use(version + `/user`, userRoute)
}


