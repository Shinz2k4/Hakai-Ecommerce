import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaChartBar, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa';
import Dashboard from './dashboard';
import ProductManagement from './product_management';
import Revenue from './revenue.jsx';
import UserManagement from './user_management';
import Statistical from './statistical.jsx';
import Order_management from './order_management.jsx';
import LoginAdmin from './login_admin';
import '../../CSS/admin/admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isAdminLoggedIn && !window.location.pathname.includes('/admin')) {
      navigate('/admin');
    }
  }, [navigate]);

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Trang chủ' },
    { path: '/admin/products', icon: <FaBox />, label: 'Quản lý sản phẩm' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Quản lý đơn hàng' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Quản lý người dùng' },
    { path: '/admin/revenue', icon: <FaMoneyBillWave />, label: 'Doanh thu' },
    { path: '/admin/statistical', icon: <FaChartBar />, label: 'Thống kê' }
  ];

  return (
    <div className="admin-layout">
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>{isCollapsed ? 'A' : 'Admin'}</h2>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? '>' : '<'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="nav-item">
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order_management />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/statistical" element={<Statistical />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
