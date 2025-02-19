import React, { useState } from 'react';
import { motion } from 'framer-motion';


const Statistical = () => {
  const [stats, setStats] = useState({
    totalProducts: 150,
    totalCategories: 8,
    topSellingProducts: [
      {
        name: "Áo thun nam",
        sold: 250,
        revenue: 25000000
      },
      {
        name: "Quần jean nữ",
        sold: 180,
        revenue: 27000000
      },
      {
        name: "Giày thể thao",
        sold: 120,
        revenue: 36000000
      }
    ],
    categoryStats: [
      {
        name: "Quần áo nam",
        products: 45,
        revenue: 150000000
      },
      {
        name: "Quần áo nữ", 
        products: 55,
        revenue: 180000000
      },
      {
        name: "Giày dép",
        products: 30,
        revenue: 120000000
      }
    ]
  });

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
      className="statistical-container"
    >
      <h1>Thống Kê Sản Phẩm</h1>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Tổng số sản phẩm</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Số danh mục</h3>
          <p>{stats.totalCategories}</p>
        </div>
      </div>

      <div className="top-selling">
        <h2>Sản phẩm bán chạy</h2>
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đã bán</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {stats.topSellingProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.sold}</td>
                <td>{formatCurrency(product.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="category-stats">
        <h2>Thống kê theo danh mục</h2>
        <table>
          <thead>
            <tr>
              <th>Danh mục</th>
              <th>Số sản phẩm</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {stats.categoryStats.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>{category.products}</td>
                <td>{formatCurrency(category.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Statistical;
