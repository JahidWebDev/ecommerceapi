const usersSchema = require("../models/usersSchema");
const crypto = require("crypto");

async function otpController(req, res) {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await usersSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        errorCode: "USER_NOT_FOUND",
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
        errorCode: "ALREADY_VERIFIED",
      });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
        errorCode: "INVALID_OTP",
      });
    }
    //  Update user as verified and clear OTP
    // user.isVerified = true;
    // user.otp = undefined;
    // user.otpExpiry = undefined;
    // await user.save();
    const updateUser = await usersSchema.findOneAndUpdate(
      { email },
      {
        $set: { isVerified: true },
        $unset: { otp: "", otpExpiry: "" },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // // Check if OTP matches
    // if (user.otp !== otp) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid OTP",
    //     errorCode: "INVALID_OTP",
    //   });
    // }

    // // Check if OTP is expired
    // if (user.otpExpiry < new Date()) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "OTP has expired",
    //     errorCode: "OTP_EXPIRED",
    //   });
    // }

    // Update user as verified and clear OTP
    // user.isVerified = true;
    // user.otp = undefined;
    // user.otpExpiry = undefined;
    // await user.save();

    // const updatedUser = await usersSchema.findOneAndUpdate(
    //   { email },
    //   { $set: { isVerified: true, otp: "", otpExpiry: "" } },
    // {
    //    $set:{isVerified: true,} ,
    //    $unset:{otpExpiry: "" },
    // }
    // { new: true }
    // );
    // return res.status(200).json({
    //   success: true,
    //   message: "Email verified successfully",
    //   data: {
    //     email: user.email,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //   },
    // });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorCode: "SERVER_ERROR",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

async function resendOtpController(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.json({ message: "please give a email" });
  }

  const user = await usersSchema.findOne({ email });

  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }

  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(otp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const updateUser = await usersSchema.findOneAndUpdate(
    { email },
    {
      $set: { otp, otpExpiry },
    },
    { new: true }
  );
  // user.otp = otp;
  // user.otpExpiry = otpExpiry;

  // await user.save();

  res.status(200).json({
    message: "Resend OTP send successfully",
  });
}

module.exports = { otpController, resendOtpController };
