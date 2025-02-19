import React, { useState, useEffect } from "react";
import "../../CSS/user_menu/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 100000,
      quantity: 2,
      image: "product1.jpg"
    },
    {
      id: 2, 
      name: "Sản phẩm 2",
      price: 200000,
      quantity: 1,
      image: "product2.jpg"
    }
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const sum = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotal(sum);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  return (
    <div className="cart-container">
      <h1>Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng trống</p>
          <button onClick={() => window.location.href='/store'}>
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">{formatPrice(item.price)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="item-total">
                  <p>{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.id)} className="remove-button">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <h3>Tổng giỏ hàng</h3>
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button className="checkout-button">Thanh toán</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
