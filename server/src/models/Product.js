const mongoose = require('mongoose');
const connectDB = require('../config/db');

const initDB = async () => {
  const { productsDb } = await connectDB(); // Get products database connection
  return productsDb;
};

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, 
  price: { type: Number, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true },
  images: [{
    url: { type: String, required: true }, // URL của ảnh trên Cloudinary
    public_id: { type: String, required: true }, // Public ID của ảnh trên Cloudinary
  }]
}, { timestamps: true });

const createProductModel = async () => {
  const productsDb = await initDB();
  return productsDb.model('Product', productSchema);
};

const Product = createProductModel();

module.exports = Product;
