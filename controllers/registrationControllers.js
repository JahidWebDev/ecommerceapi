const emailValidation = require("../helpers/emailValidation");
const emailVarification = require("../helpers/emailVerification");
const usersSchema = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");  // Changed to lowercase to match usage

async function registrationController(req, res) {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName) {
    return res.json({ error: "Firstname & lastName is required" });
  }
  if (!email) {
    return res.json({ error: "Email is required" });
  }
  if (!emailValidation(email)) {
    return res.json({ error: "Email is not valid" });
  }
  
  // Fixed typo in variable name
  const existingEmail = await usersSchema.find({ email });
  if (existingEmail.length > 0) {
    return res.json({ error: "Email is already in use" });
  }
  
  if (!password) {
    return res.json({ error: "Password is required" });
  }

  // Using the correctly imported crypto module
  const otp = crypto.randomInt(10000000, 99999999).toString();
  console.log(otp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
  try {
    const hash = await bcrypt.hash(password, 10);
    const users = new usersSchema({
      firstName,
      lastName,
      email,
      password: hash,
      otp,
      otpExpiry,
    });
    await users.save();
    await emailVarification(email, otp);
   
    
    res.json({
      message: "Registration successfully done",
      status: "success",
      otp: otp  // Optional: Include OTP in response for testing
    });
  } catch (error) {
    res.status(500).json({
      error: "Registration failed",
      details: error.message
    });
  }
}

module.exports = registrationController;





// const emailValidation = require("../helpers/emailValidation");
// const usersSchema = require("../models/usersSchema");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");

// async function registrationController(req, res) {
//   const { firstName, lastName, email, password } = req.body;
  
//   if (!firstName || !lastName) {
//     return res.status(400).json({ error: "Firstname & lastName is required" });
//   }
//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }
//   if (!emailValidation(email)) {
//     return res.status(400).json({ error: "Email is not valid" });
//   }
  
//   const existingEmail = await usersSchema.find({ email });
//   if (existingEmail.length > 0) {
//     return res.status(409).json({ error: "Email is already in use" });
//   }
  
//   if (!password) {
//     return res.status(400).json({ error: "Password is required" });
//   }

//   const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP is more standard
//   const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  
//   try {
//     const hash = await bcrypt.hash(password, 10);
//     const user = new usersSchema({
//       firstName,
//       lastName,
//       email,
//       password: hash,
//       otp,
//       otpExpiry,
//     });
    
//     await user.save();
    
//     res.status(201).json({
//       message: "Registration successful",
//       status: "success",
//       // Don't send OTP in production, this is just for testing
//       otp: process.env.NODE_ENV === "development" ? otp : undefined
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       error: "Registration failed",
//       details: process.env.NODE_ENV === "development" ? error.message : undefined
//     });
//   }
// }

// module.exports = registrationController;