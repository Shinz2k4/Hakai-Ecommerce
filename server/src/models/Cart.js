const mongoose = require('mongoose');
const connectDB = require('../config/db');

const initDB = async () => {
  const { productsDb } = await connectDB(); // Get products database connection
  return productsDb;
};
require('./User');
require('./Product');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: false },
    price: { type: Number, required: false },
    images: { type: Array, required: false },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const createCartModel = async () => {
  const productsDb = await initDB();
  return productsDb.model('Cart', cartSchema);
};
const Cart = createCartModel();

module.exports = Cart;
