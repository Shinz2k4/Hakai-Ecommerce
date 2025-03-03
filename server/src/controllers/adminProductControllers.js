const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});
// Hàm thêm sản phẩm
const addProduct = asyncHandler(async (req, res) => {
    // Kiểm tra quyền admin
    if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Không có quyền truy cập');
    }
  
    const { name, description, price, category, countInStock, images, specifications, warranty } = req.body;
  
    // Kiểm tra dữ liệu đầu vào
    if (!name || !description || !price || !category || !countInStock || !images || !specifications || !warranty) {
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
        images: images,
        specifications: specifications.trim(),
        warranty: warranty.trim()
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
          images: newProduct.images,
          specifications: newProduct.specifications,
          warranty: newProduct.warranty
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
          images: product.images,
          specifications: product.specifications,
          warranty: product.warranty
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
    const { name, description, price, category, countInStock, images, specifications, warranty } = req.body;
  
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
    product.specifications = specifications || product.specifications;
    product.warranty = warranty || product.warranty;
  
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
          images: updatedProduct.images,
          specifications: updatedProduct.specifications,
          warranty: updatedProduct.warranty
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
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
  };
