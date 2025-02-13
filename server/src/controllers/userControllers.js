const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

module.exports = { registerUser, loginUser, getUserProfile };
