const User = require("../models/User");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../util/MailSender");

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(500).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Bad Approach
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpSaved = await OTP.create({ email: email, otp: otp });

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp: otpSaved.otp,
    });
  } catch (error) {
    console.log("OTP Error : ", error);
    return res.status(500).json({
      success: true,
      message: "Sending OTP Error",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, otp } = req.body;

    if (!fullName || !username || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const userData = await User.findOne({ email: email });

    if (userData) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const recentOTP = await OTP.findOne({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOTP?.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is Invalid",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });

    const savedUser = await User.create({
      username: username,
      fullName: fullName,
      email: email,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
    });

    return res.status(200).json({
      success: true,
      message: "User Sign Up Successful",
      savedUser,
    });
  } catch (error) {
    console.log("User Sign Up ", error);
    return res.status(500).json({
      success: false,
      message: "User Sign Up Error, Please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email | !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password Both Required",
      });
    }

    const user = await User.findOne({ email: email }).populate(
      "additionalDetails"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User with this email not exists",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

      return res
        .cookie("token", user.token, { maxAge: 90000000, httpOnly: true })
        .json({
          success: true,
          message: "Login Successful",
          token,
          user,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Is Incorrect",
      });
    }
  } catch (error) {
    console.log("Login error ", error.message);
    return res.status(500).json({
      success: false,
      message: "Login Error, Please Try Again",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email Required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User with this email",
      });
    }

    const token = crypto.randomUUID();

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        resetPasswordToken: token,
        resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    const response = mailSender(
      email,
      "Reset Password Link - StudyNotion",
      `Reset Password by Clicking Here ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset Password Link Sent Successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Reset Password Error, Please Try Again",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Invalid",
      });
    }

    if (user.resetPasswordTokenExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Expired Token, Generate New Token",
      });
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { token: token },
      { password: hashedNewPassword },
      { new: true }
    ).populate("additionalDetails").select("-password");

    return res.status(200).json({
      success: true,
      message: "Password Update Successful",
      user: updatedUser
    });
  } catch (error) {
    console.log("Password Reset Error ", error.message);
    return res.status(500).json({
      success: false,
      message: "Password Reset Error, Try Again",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { email } = req.user;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const user = await User.findOne(email);

    const result = await bcrypt.compare(newPassword, user.email);

    if (result === true) {
      return res.status(400).json({ success: false, message: "Same Password" });
    }

    const newHashedPassword = bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: newHashedPassword },
      { new: true }
    );

    const response = await mailSender(
      user.email,
      "Password Change Successful - StudyNotion",
      `Password Changed for ${user.firstName} ${user.lastName}`
    );

    console.log(response);

    return res.status(200).json({
      success: true,
      message: "Password Change Successful",
    });
  } catch (error) {
    console.log("Password change ", error.message);
    return res.status(400).json({
      success: false,
      message: "Error In Password Change, Please Try Again",
    });
  }
};
