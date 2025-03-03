const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');


const getProducts = asyncHandler(async (req, res) => {
  
  // Lấy tất cả sản phẩm từ collection
  const products = await (await Product).find({});

  if (products.length > 0) {
    res.json({
      success: true,
      products: products.map(product => ({
        _id: product._id,
        name: product.name,
        description: product.description,
        specifications: product.specifications,
        warranty: product.warranty,
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

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await (await Product).findById(productId);

  if (product) {
    res.json({
      _id: product._id,
      name: product.name, 
      description: product.description,
      specifications: product.specifications,
      warranty: product.warranty,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      images: product.images
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, name, price, images } = req.body;
  const userId = req.user._id;

  try {
    let cart = await (await Cart).findOne({ user: userId });
    
    if (!cart) {
      cart = await (await Cart).create({
        user: userId,
        products: [],
        totalPrice: 0
      });
    }

    // Get product details
    const product = await (await Product).findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Sản phẩm không tồn tại');
    }

    // Check if product is in stock
    if (product.countInStock < quantity) {
      res.status(400);
      throw new Error('Số lượng sản phẩm trong kho không đủ');
    }

    // Check if product already in cart
    const existingProductIndex = cart.products.findIndex(
      item => item.product.toString() === productId
    );

    if (existingProductIndex > -1) {
      // Update quantity if product exists
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product if it doesn't exist
      cart.products.push({
        product: productId,
        quantity: quantity,
        name: name || product.name,
        price: price || product.price,
        images: images || product.images
      });
    }
    console.log(cart.products);

    // Calculate total price
    let totalPrice = 0;
    for (const item of cart.products) {
      const itemProduct = await (await Product).findById(item.product);
      totalPrice += item.quantity * itemProduct.price;
    }
    cart.totalPrice = totalPrice;

    // Save updated cart
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Thêm vào giỏ hàng thành công',
      cart
    });
  } catch (error) {
    res.status(500);
    throw new Error('Lỗi server khi thêm vào giỏ hàng: ' + error.message);
  }
});


module.exports = {
  getProducts,
  addToCart,
  getProductById,
};
