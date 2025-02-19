import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../CSS/admin/admin.css';

const Order_management = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Nguyễn Văn A",
      date: "2023-08-15",
      amount: 1500000,
      status: "Đã giao hàng",
      items: [
        { name: "Sản phẩm 1", quantity: 2, price: 500000 },
        { name: "Sản phẩm 2", quantity: 1, price: 500000 }
      ]
    },
    {
      id: 2,
      customer: "Trần Thị B", 
      date: "2023-08-14",
      amount: 2300000,
      status: "Đang xử lý",
      items: [
        { name: "Sản phẩm 3", quantity: 1, price: 2300000 }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="order-management-container"
    >
      <h1>Quản lý đơn hàng</h1>

      <div className="orders-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{formatCurrency(order.amount)}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => setSelectedOrder(order)}>
                    Chi tiết
                  </button>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao hàng">Đang giao hàng</option>
                    <option value="Đã giao hàng">Đã giao hàng</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal">
          <div className="order-details">
            <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <p><strong>Khách hàng:</strong> {selectedOrder.customer}</p>
            <p><strong>Ngày đặt:</strong> {selectedOrder.date}</p>
            <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
            
            <table className="items-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="total">
              <strong>Tổng cộng:</strong> {formatCurrency(selectedOrder.amount)}
            </p>

            <button onClick={() => setSelectedOrder(null)}>Đóng</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Order_management;
