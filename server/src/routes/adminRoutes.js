const express = require('express');
const { loginAdmin, getAdminProfile, getProducts, updateProduct, deleteProduct, addProduct } = require('../controllers/adminControllers');
const { protect, admin } = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.get('/products', protect, admin, getProducts);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);
router.post('/products', protect, admin, addProduct);

module.exports = router;
