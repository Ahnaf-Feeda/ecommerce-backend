const mongoose = require('mongoose')

let dbConnect=()=>{
    mongoose.connect(process.env.MONGODBLINK).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbConnect