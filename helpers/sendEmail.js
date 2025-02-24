const nodemailer = require("nodemailer");

async function sendEmail(email, OTP){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APPPASS,
        },
      });
      const info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "OTP verification for Fashion Flourish", // Subject line
        text: OTP, // plain text body
        html: `<b>Your OTP is ${OTP}</b>`, // html body
      });
}

module.exports = sendEmail