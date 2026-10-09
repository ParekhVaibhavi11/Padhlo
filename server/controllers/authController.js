const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// REGISTER USER

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// LOGIN USER

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getCurrentUser = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
      });
    }

    const genericResponse = {
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    };

    const user = await User.findOne({ email: email.toLowerCase() });

    // SECURITY: Prevent account enumeration (do not reveal if email exists)
    if (!user) {
      return res.status(200).json(genericResponse);
    }

    // Generate cryptographically secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store ONLY the SHA-256 hash of the token in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set short expiry (15 minutes)
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const textMessage = `You requested a password reset for your Padhlo account.\n\nPlease navigate to the following link to reset your password:\n\n${resetUrl}\n\nThis link will expire in 15 minutes.\nIf you did not request this, please ignore this email.`;

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #6d28d9; margin-top: 0; text-align: center;">Padhlo Password Reset</h2>
        <p style="color: #374151; font-size: 16px;">Hello <strong>${user.name}</strong>,</p>
        <p style="color: #4b5563; line-height: 1.5;">You recently requested to reset your password for your Padhlo account. Click the button below to choose a new password:</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${resetUrl}" style="background-color: #7c3aed; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #4b5563; font-size: 14px;">Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #6d28d9; font-size: 13px; background-color: #f3e8ff; padding: 10px; border-radius: 6px;">${resetUrl}</p>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">This password reset link will expire in 15 minutes.<br />If you did not request a password reset, no action is required.</p>
      </div>
    `;

    try {
      const emailResult = await sendEmail({
        to: user.email,
        subject: "Padhlo - Password Reset Request",
        text: textMessage,
        html: htmlMessage,
        resetUrl: resetUrl,
      });

      return res.status(200).json({
        success: true,
        message: genericResponse.message,
        isSmtpConfigured: emailResult.configured,
      });
    } catch (err) {
      console.error("[ForgotPassword Error]", err.message);
      return res.status(200).json({
        success: true,
        message: genericResponse.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};


// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (!req.params.token) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing password reset token",
      });
    }

    // Get SHA-256 hash of incoming unhashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }

    // Hash new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Invalidate reset token immediately (single-use)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while resetting password.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};