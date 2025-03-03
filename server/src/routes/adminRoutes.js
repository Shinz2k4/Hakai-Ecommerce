const express = require('express');
const { loginAdmin, getAdminProfile } = require('../controllers/adminControllers');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/adminProductControllers');
const { getUsers, deleteUser, updateUser } = require('../controllers/adminUserControllers');
const { protect, admin } = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);

router.get('/products', protect, getProducts);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);
router.post('/products', protect, admin, addProduct);

router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.put('/users/:id', protect, admin, updateUser);

module.exports = router;
