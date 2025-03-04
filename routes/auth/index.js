const express = require('express')
const {SignupController, VerifyOTPController, LoginController} = require('../../controllers/auth/auth')
const router = express.Router()



// localhost:3000/auth/signup

router.post('/signup', SignupController)

router.patch('/verifyOTP', VerifyOTPController)

router.post('/login', LoginController)

module.exports = router