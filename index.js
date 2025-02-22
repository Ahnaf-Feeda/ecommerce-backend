require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const app = express()
const router = require('./routes')
const dbConnect = require('./config/db')
dbConnect()
app.use(router)

app.listen(port, ()=>{
    console.log('Server is running')
})