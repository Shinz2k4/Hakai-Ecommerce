const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Middleware bảo vệ route yêu cầu xác thực
const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Kiểm tra token trong header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    try {
      token = req.headers.authorization.split(' ')[1];
      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user theo ID từ token
      const UserModel = await User;
      const user = await UserModel.findById(decoded.id).select('-password');
      console.log("User tìm thấy:", user);
      
      if (!user) {
        console.log("Không tìm thấy user");
        return res.status(401).json({ success: false, message: "User không tồn tại" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
    }
  } else {
    console.log("Không tìm thấy token trong header");
    res.status(401).json({ success: false, message: "Không có token, quyền truy cập bị từ chối" });
  }
});

// Middleware kiểm tra quyền admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Không có quyền truy cập, yêu cầu quyền admin');
  }
};

module.exports = { protect, admin };
