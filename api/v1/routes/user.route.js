const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const auth = require('../../../middlewares/auth.middlewares')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/forget-password', controller.forgetPassword)
router.post('/otp', controller.otp)
router.post('/reset-password', controller.reset)
router.get('/detail', auth.requestAuth, controller.detail)
module.exports = router 