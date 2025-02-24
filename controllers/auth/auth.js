const sendEmail = require("../../helpers/sendEmail");
const UserModel = require("../../models/usermodel");
const otpGenerator = require('otp-generator')


async function SignupController(req, res) {
  let { name, email, password, phone, role } = req.body;
  let OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
  try {
    try {
      let existingemail = await UserModel.findOne({ email });
      let existingnumber = await UserModel.findOne({ phone });

      if (!existingemail) {
        let user = new UserModel({
          name: name,
          email: email,
          password: password,
          phone: phone,
          role: role,
        });
        await user.save();
        sendEmail(email, OTP)

// OTP
        user.otp=OTP
        await user.save()
        setTimeout( async () => {
          user.otp=null
          await user.save()
        }, 180000);
        res
          .status(201)
          .json({ msg: "User creation successfull", success: true });
      } else {
        res
          .status(500)
          .json({ msg: "Email or Number already in use", success: false });
      }
    } catch (error) {
      res.status(500).json({ msg: error, success: false });
    }
  } catch (error) {
    res.status(500).json({ msg: error, success: false });
  }
}

module.exports = SignupController;
