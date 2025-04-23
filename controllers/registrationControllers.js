const emailValidation = require("../helpers/emailValidation");
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
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(otp);

  try {
    const hash = await bcrypt.hash(password, 10);
    const users = new usersSchema({
      firstName,
      lastName,
      email,
      password: hash,
      otp
    });
    
    await users.save();
    
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