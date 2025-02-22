const { default: mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
})

module.exports = mongoose.model("User", userSchema)
