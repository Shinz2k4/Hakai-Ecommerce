import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../CSS/admin/admin.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 150,
    totalRevenue: 45000000,
    totalUsers: 89,
    totalProducts: 200
  });

  const [recentOrders] = useState([
    {
      id: 1,
      customer: "Nguyễn Văn A",
      date: "2023-08-15",
      amount: 1500000,
      status: "Đã giao hàng"
    },
    {
      id: 2, 
      customer: "Trần Thị B",
      date: "2023-08-14",
      amount: 2300000,
      status: "Đang xử lý"
    },
    {
      id: 3,
      customer: "Lê Văn C", 
      date: "2023-08-13",
      amount: 1800000,
      status: "Đã hủy"
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard-container"
    >
      <h1>Bảng điều khiển</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng đơn hàng</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Doanh thu</h3>
          <p>{formatCurrency(stats.totalRevenue)}</p>
        </div>
        <div className="stat-card">
          <h3>Người dùng</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Sản phẩm</h3>
          <p>{stats.totalProducts}</p>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Đơn hàng gần đây</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Ngày</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{formatCurrency(order.amount)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Dashboard;
