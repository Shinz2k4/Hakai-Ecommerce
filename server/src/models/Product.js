const mongoose = require('mongoose');
const connectDB = require('../config/db');

const initDB = async () => {
  const { productsDb } = await connectDB(); // Get products database connection
  return productsDb;
};

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        // Basic markdown validation - check for common markdown syntax
        return /^[\s\S]*(?:\*\*|__|#|>|\[|\]|\(|\)|`|-)[\s\S]*$/.test(v);
      },
      message: 'Description must be in markdown format'
    }
  },
  specifications: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Basic markdown validation - check for common markdown syntax
        return /^[\s\S]*(?:\*\*|__|#|>|\[|\]|\(|\)|`|-)[\s\S]*$/.test(v);
      },
      message: 'Specifications must be in markdown format'
    }
  },
  warranty: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Basic markdown validation - check for common markdown syntax
        return /^[\s\S]*(?:\*\*|__|#|>|\[|\]|\(|\)|`|-)[\s\S]*$/.test(v);
      },
      message: 'Warranty must be in markdown format'
    }
  },
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
