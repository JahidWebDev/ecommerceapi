const nodemailer = require("nodemailer");

async function emailVarification(email, otp) {
    
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "webdeveloper2324@gmail.com",
      pass: "bcbj ricj zjba cknm ",
    },
  });
  const info = await transporter.sendMail({
    from: '"E-Commerce site jahidshop 👻" <webdeveloper2324@gmail.com>', // sender address
    to: email,  
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: `<b>JAHID Shop is a Ecommerce shop. Here is OTP: ${otp}</b>`, 
  });
}

module.exports = emailVarification