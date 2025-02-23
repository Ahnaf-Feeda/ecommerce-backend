const express = require('express')
const SignupController = require('../../controllers/auth/auth')
const router = express.Router()



// localhost:3000/auth/signup

router.post('/signup', SignupController)

module.exports = router