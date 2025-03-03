const express = require('express');
const { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword, updateUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const { getProducts, addToCart, getProductById} = require('../controllers/userProductController');
const {getCart, removeFromCart, clearCart, updateCartItem} = require('../controllers/cartControllers');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); 
router.get('/profile', protect, getUserProfile); 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/profile',protect ,updateUserProfile); 

router.get('/store', getProducts);
router.post('/add-to-cart', protect, addToCart);
router.get('/productUser/:id', getProductById);
router.get('/cart', protect, getCart);
router.delete('/cart/:productId', protect, removeFromCart);
router.delete('/cart', protect, clearCart);
router.put('/cart/:productId', protect, updateCartItem);


module.exports = router;