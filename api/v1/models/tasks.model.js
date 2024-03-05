const mongoose = require('mongoose')


const tasksScheme = new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        parentIdtask: String,
        listUsers: Array,
        deleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

const tasks = mongoose.model('task', tasksScheme, 'tasks')

module.exports = tasks