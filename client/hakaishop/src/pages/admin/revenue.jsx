import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Revenue = () => {
  const [revenueData, setRevenueData] = useState({
    daily: 5000000,
    weekly: 32000000, 
    monthly: 150000000,
    yearly: 1800000000
  });

  const [revenueHistory, setRevenueHistory] = useState([
    {
      date: '2023-08-01',
      amount: 4800000,
      orders: 12
    },
    {
      date: '2023-08-02', 
      amount: 5200000,
      orders: 15
    },
    {
      date: '2023-08-03',
      amount: 4900000, 
      orders: 13
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
      transition={{ duration: 0.5 }}
      className="revenue-container"
    >
      <h1>Báo Cáo Doanh Thu</h1>

      <div className="revenue-stats">
        <div className="stat-card">
          <h3>Doanh thu hôm nay</h3>
          <p>{formatCurrency(revenueData.daily)}</p>
        </div>
        <div className="stat-card">
          <h3>Doanh thu tuần này</h3>
          <p>{formatCurrency(revenueData.weekly)}</p>
        </div>
        <div className="stat-card">
          <h3>Doanh thu tháng này</h3>
          <p>{formatCurrency(revenueData.monthly)}</p>
        </div>
        <div className="stat-card">
          <h3>Doanh thu năm nay</h3>
          <p>{formatCurrency(revenueData.yearly)}</p>
        </div>
      </div>

      <div className="revenue-history">
        <h2>Lịch sử doanh thu</h2>
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Doanh thu</th>
              <th>Số đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {revenueHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{formatCurrency(record.amount)}</td>
                <td>{record.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Revenue;
