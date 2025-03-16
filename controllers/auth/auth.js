const sendEmail = require("../../helpers/sendEmail");
const UserModel = require("../../models/usermodel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function SignupController(req, res) {
  let { name, email, password, phone, role } = req.body;
  let OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });
  try {
    try {
      let existingemail = await UserModel.findOne({ email });
      let existingnumber = await UserModel.findOne({ phone });

      if (!existingemail && !existingnumber) {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          // Store hash in your password DB.
          let user = new UserModel({
            name: name,
            email: email,
            password: hash,
            phone: phone,
            role: role,
          });

          await user.save();

          sendEmail(email, OTP);

          // OTP
          user.otp = OTP;
          await user.save();
          // setTimeout( async () => {
          //   user.otp=null
          //   await user.save()
          // }, 180000);
          // OTP
          res
            .status(201)
            .json({ msg: "User creation successfull", success: true });
        });
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

async function VerifyOTPController(req, res) {
  let { OTP, email } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      if (user.otp == OTP) {
        // user.isverify = true
        // user.otp = null
        // await user.save()
        await UserModel.findOneAndUpdate(
          { email },
          { isverify: true, otp: null },
          { new: true }
        );

        res.status(201).json({msg: "Account verified successfully", success:true, data:user});
      }else{
        res.status(500).json({ msg: "OTP invalid", success: false });
      }
    }else{
      res.status(404).json({ msg: "Account not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ msg: error, success: false });
  }
}

async function LoginController(req, res) {
  let {email, password} = req.body
  try {
    let existinguser = await UserModel.findOne({email})
    if(existinguser){
      if(existinguser.isverify == true){
        bcrypt.compare(password, existinguser.password,async function(err, result) {
          if (result == true){
            let user = await UserModel.findOne({email}).select("-password")
            return res.status(200).json({
              success: true,
              msg: "Login Successfull",
              data: user
            })
          }else{
            res.status(500).json({ msg: 'Password does not match', success: false });
          }
      });
      }else{
        res.status(500).json({ msg: 'Account not verified', success: false });
      }
    }else{
      res.status(404).json({ msg: 'Email not found', success: false });
    }
  } catch (error) {
    
    res.status(500).json({ msg: error, success: false });
    
  }
  
}


module.exports = { SignupController, VerifyOTPController, LoginController };
