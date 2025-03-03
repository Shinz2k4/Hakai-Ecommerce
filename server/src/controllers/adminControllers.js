const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra user có tồn tại
  const user = await (await User).findOne({ username });

  if (!user || user.role !== 'admin') {
    res.status(401); 
    throw new Error('Tài khoản admin không tồn tại');
  }

  // Kiểm tra mật khẩu
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Mật khẩu không đúng');
  }

  // Tạo JWT token với thông tin role và thời gian hết hạn
  const token = jwt.sign(
    { 
      id: user._id,
      role: user.role,
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Hết hạn sau 24h
    },
    process.env.JWT_SECRET
  );

  // Set cookie chứa token
  res.cookie('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000 // 24h
  });

  // Không cần lưu token vào localStorage vì đã được lưu trong cookie
  // Token sẽ được tự động gửi kèm trong mỗi request
  res.json({
    success: true,
    _id: user._id,
    username: user.username,
    role: user.role,
    token // Vẫn trả về token để client có thể sử dụng nếu cần
  });
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
const getAdminProfile = asyncHandler(async (req, res) => {
  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Không có quyền truy cập');
  }

  const user = await (await User).findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy thông tin admin');
  }
});



module.exports = {
  loginAdmin,
  getAdminProfile,
};
