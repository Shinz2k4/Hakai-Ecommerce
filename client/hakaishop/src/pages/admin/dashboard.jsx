import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import '../../CSS/admin/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 150,
    totalOrders: 85, 
    totalRevenue: 25000000,
    growthRate: 12.5
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 1,
      customer: "Nguyễn Văn A",
      date: "2023-12-15",
      amount: 1500000,
      status: "Đã giao hàng"
    },
    {
      id: 2, 
      customer: "Trần Thị B",
      date: "2023-12-14", 
      amount: 2300000,
      status: "Đang xử lý"
    }
  ]);

  const [topProducts, setTopProducts] = useState([
    {
      id: 1,
      name: "Áo thun nam",
      sales: 45,
      revenue: 4500000,
      image: "product1.jpg"
    },
    {
      id: 2,
      name: "Quần jean nữ",
      sales: 38,
      revenue: 5700000,
      image: "product2.jpg" 
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (



    <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard-container"
    >
      <h1>Tổng quan</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <h3>Tổng người dùng</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaShoppingCart className="stat-icon" />
          <div className="stat-info">
            <h3>Tổng đơn hàng</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaMoneyBillWave className="stat-icon" />
          <div className="stat-info">
            <h3>Doanh thu</h3>
            <p>{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div className="stat-info">
            <h3>Tăng trưởng</h3>
            <p>{stats.growthRate}%</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-orders">
          <h2>Đơn hàng gần đây</h2>
          <div className="orders-list">
            {recentOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <h4>{order.customer}</h4>
                  <p>{order.date}</p>
                </div>
                <div className="order-details">
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <span className="amount">{formatCurrency(order.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-products">
          <h2>Sản phẩm bán chạy</h2>
          <div className="products-list">
            {topProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>Đã bán: {product.sales}</p>
                  <p>Doanh thu: {formatCurrency(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sales-chart">
          <h2>Biểu đồ doanh số</h2>
          {/* Thêm component biểu đồ ở đây */}
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Dashboard;
