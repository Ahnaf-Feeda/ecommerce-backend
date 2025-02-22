const UserModel = require('../models/usermodel')

function SignupController(req, res) {
    let {name, email, password, phone} = req.body
    try {
        let user = new UserModel({
            name:name,
            email: email,
            password: password,
            phone:phone,
            role   
        }) 
        
        user.save()
    } catch (error) {
        
    }

}

module.exports = SignupController