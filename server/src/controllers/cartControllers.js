const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');


// Lấy giỏ hàng của người dùng
const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await (await Cart).findOne({ user: userId })
            .populate({
                path: 'items.product',
                strictPopulate: false
            });

        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500);
        throw new Error('Lỗi khi lấy giỏ hàng: ' + error.message);
    }
});
// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const cart = await (await Cart).findOne({ user: userId });
        const product = await (await Product).findById(productId);

        if (!cart) {
            res.status(404);
            throw new Error('Không tìm thấy giỏ hàng');
        }

        if (!product) {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm');
        }

        const itemIndex = cart.products.findIndex(item => 
            item.product.toString() === productId
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                // Xóa sản phẩm khỏi giỏ hàng nếu số lượng <= 0
                cart.products.splice(itemIndex, 1);
            } else {
                // Cập nhật số lượng
                cart.products[itemIndex].quantity = quantity;
            }

            // Tính lại tổng giá
            let total = 0;
            for (const item of cart.products) {
                const itemProduct = await (await Product).findById(item.product);
                total += itemProduct.price * item.quantity;
            }
            cart.totalPrice = total;

            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Lỗi khi cập nhật giỏ hàng: ' + error.message);
    }
});
// Xóa sản phẩm khỏi giỏ hàng

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const cart = await (await Cart).findOne({ user: userId });

        if (!cart) {
            res.status(404);
            throw new Error('Không tìm thấy giỏ hàng');
        }

        const itemIndex = cart.products.findIndex(item => 
            item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Xóa sản phẩm khỏi giỏ hàng
            cart.products.splice(itemIndex, 1);

            // Tính lại tổng giá
            cart.totalPrice = cart.products.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Lỗi khi xóa sản phẩm khỏi giỏ hàng: ' + error.message);
    }
});
// Xóa toàn bộ giỏ hàng
const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await (await Cart).findOne({ user: userId });

        if (!cart) {
            res.status(404);
            throw new Error('Không tìm thấy giỏ hàng');
        }

        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: 'Đã xóa toàn bộ giỏ hàng' });
    } catch (error) {
        res.status(500);
        throw new Error('Lỗi khi xóa giỏ hàng: ' + error.message);
    }
});

module.exports = {
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
