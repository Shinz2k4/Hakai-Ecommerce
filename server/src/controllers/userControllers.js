const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Đăng ký user
const registerUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, dateOfBirth, gender, email, password } = req.body;

  const userExists = await (await User).findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(400);
    throw new Error('Email hoặc username đã tồn tại');
  }

  const user = await (await User).create({ 
    username, 
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email, 
    password 
  });

  if (user) {
    res.status(201).json({ 
      message: 'Đăng ký thành công',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } else {
    res.status(400);
    throw new Error('Lỗi khi đăng ký');
  }
});

// Đăng nhập user
const loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;
  
  // Tìm user theo email hoặc username
  const user = await (await User).findOne({
    $or: [
      { email: emailOrUsername },
      { username: emailOrUsername }
    ]
  });

  if (user && (await user.comparePassword(password))) {
    res.json({ 
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } else {
    res.status(401);
    throw new Error('Thông tin đăng nhập không chính xác');
  }
});

// Quên mật khẩu
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await (await User).findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy tài khoản với email này');
  }

  // Tạo token reset password
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // Token hết hạn sau 1 giờ
  await user.save();

  // Gửi email reset password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  const mailOptions = {
    from: '"Hakai Ecommerce"',
    to: user.email,
    subject: 'Reset Password - Hakai Ecommerce',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #2c3e50; margin-bottom: 20px;">Yêu cầu đặt lại mật khẩu</h1>
        </div>
        <div style="color: #34495e; line-height: 1.6;">
          <p>Xin chào,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại Hakai Ecommerce.</p>
          <p>Vui lòng click vào nút bên dưới để tiến hành đặt lại mật khẩu:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Đặt lại mật khẩu</a>
          </div>
          <p style="color: #e74c3c;"><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 1 giờ.</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #7f8c8d; font-size: 12px; text-align: center;">© 2024 Hakai Ecommerce. All rights reserved.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await (await User).findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Token không hợp lệ hoặc đã hết hạn');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Mật khẩu đã được đặt lại thành công' });
});

// Lấy thông tin user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await (await User).findById(req.user.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy user');
  }
});

module.exports = { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword };
