const { default: mongoose, Schema } = require("mongoose");

const categorySchema = new Schema({
    name : {
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model("Category", categorySchema)