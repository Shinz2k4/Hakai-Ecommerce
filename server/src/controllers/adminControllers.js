const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

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

// Hàm thêm sản phẩm
const addProduct = asyncHandler(async (req, res) => {
  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Không có quyền truy cập');
  }

  const { name, description, price, category, countInStock, images } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!name || !description || !price || !category || !countInStock || !images) {
    res.status(400);
    throw new Error('Vui lòng điền đầy đủ thông tin sản phẩm');
  }

  // Validate dữ liệu
  if (isNaN(price) || price <= 0) {
    res.status(400);
    throw new Error('Giá sản phẩm không hợp lệ');
  }

  if (isNaN(countInStock) || countInStock < 0) {
    res.status(400);
    throw new Error('Số lượng sản phẩm không hợp lệ');
  }

  try {
    const ProductModel = await Product;
    const newProduct = await ProductModel.create({
      name: name.trim(),
      description: description.trim(), 
      price: Number(price),
      category: category.trim(),
      countInStock: Number(countInStock),
      images: images
    });

    res.status(201).json({
      success: true,
      product: {
        _id: newProduct._id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        countInStock: newProduct.countInStock,
        images: newProduct.images
      }
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400);
    throw new Error('Không thể tạo sản phẩm: ' + error.message);
  }
});

// @desc    Get all products
// @route   GET /api/admin/products  
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Không có quyền truy cập');
  }

  // In ra token từ request header
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token:', token);

  // Lấy tất cả sản phẩm từ collection
  const products = await (await Product).find({});

  if (products.length > 0) {
    res.json({
      success: true,
      products: products.map(product => ({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        countInStock: product.countInStock,
        images: product.images
      }))
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm nào');
  }
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Không có quyền truy cập');
  }

  const { id } = req.params;
  const { name, description, price, category, countInStock, images } = req.body;

  const product = await (await Product).findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.countInStock = countInStock || product.countInStock;
  product.images = images || product.images;

  const updatedProduct = await product.save();

  if (updatedProduct) {
    res.json({
      success: true,
      product: {
        _id: updatedProduct._id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        category: updatedProduct.category,
        countInStock: updatedProduct.countInStock,
        images: updatedProduct.images
      }
    });
  } else {
    res.status(400);
    throw new Error('Không thể cập nhật sản phẩm');
  }
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id 
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Không có quyền truy cập');
  }

  const { id } = req.params;
  const product = await (await Product).findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }

  // Xóa ảnh trên Cloudinary trước khi xóa sản phẩm
  if (product.image && product.image.public_id) {
    await cloudinary.uploader.destroy(product.image.public_id);
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: 'Xóa sản phẩm thành công'
  });
});

module.exports = {
  loginAdmin,
  getAdminProfile,
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct
};
