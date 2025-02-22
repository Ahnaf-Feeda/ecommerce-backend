const express = require('express')
const router = express.Router()
router.use(express.json())

// localhost:3000/auth/signup

router.post('/signup', (req, res)=>{
    let {name,email,password} = req.body
    
})

module.exports = router