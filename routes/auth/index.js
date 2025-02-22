const express = require('express')
const router = express.Router()
router.use(express.json())
const signup = require('../')


// localhost:3000/auth/signup

router.post('/signup')

module.exports = router