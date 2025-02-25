import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaChartBar, FaMoneyBillWave, FaShoppingCart, FaBars, FaSignOutAlt } from 'react-icons/fa';
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
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
    else if (window.location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Trang chủ' },
    { path: '/admin/products', icon: <FaBox />, label: 'Quản lý sản phẩm' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Quản lý đơn hàng' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Quản lý người dùng' },
    { path: '/admin/revenue', icon: <FaMoneyBillWave />, label: 'Doanh thu' },
    { path: '/admin/statistical', icon: <FaChartBar />, label: 'Thống kê' }
  ];

  return (
    <div className="admin-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{
        width: isCollapsed ? '60px' : '250px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        transition: 'width 0.3s ease'
      }}>
        <div className="sidebar-header">
          <h2>{isCollapsed ? 'Ad' : 'Admin Panel'}</h2>
          <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="nav-item">
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            {!isCollapsed && <span>Đăng xuất</span>}
          </button>
        </nav>
      </div>

      <div className="main-content" style={{
        marginLeft: isCollapsed ? '60px' : '250px',
        flexGrow: 1,
        padding: '50px',
        transition: 'margin-left 0.3s ease'
      }}>
        <div className="content-area">
          <Routes>
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Order_management />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/statistical" element={<Statistical />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
