const User = require('../models/User');
const connectDB = require('../config/db');

// Connect to database
connectDB();
// Lấy danh sách tất cả users / Get all users
const getUsers = async (req, res) => {
  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Không có quyền truy cập');
  }

  try {
    const users = await (await User).find().select('-password');
    if (!users || users.length === 0) {
      res.status(404);
      throw new Error('Không tìm thấy danh sách users');
    }
    res.json(users);
  } catch (error) {
    res.status(500);
    throw new Error('Lỗi server khi lấy danh sách users');
  }
};

// Xóa user / Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await (await User).findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Chỉ cho phép xóa tài khoản có vai trò user / Only allow deleting user role accounts
    if (user.role !== 'user') {
      return res.status(400).json({ message: 'Can only delete user accounts' });
    }

    await (await User).findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật thông tin và quyền user / Update user info and role
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role, birthofDate, gender } = req.body;
    const user = await (await User).findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Không cho phép thay đổi thông tin admin chính / Don't allow changing main admin info
    if (user.email === 'admin@gmail.com') {
      return res.status(400).json({ message: 'Cannot modify main admin account' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.birthofDate = birthofDate || user.birthofDate;
    user.gender = gender || user.gender;
    
    // Chỉ cập nhật role nếu được cung cấp / Only update role if provided
    if (role) {
      user.role = role;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      birthofDate: updatedUser.birthofDate,
      gender: updatedUser.gender,
      email: updatedUser.email,
      role: updatedUser.role
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser
};
