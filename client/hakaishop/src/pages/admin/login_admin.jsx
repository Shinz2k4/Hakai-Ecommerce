import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/admin/admin.css';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminToken', data.token);
        // Thêm history.pushState để thay đổi URL mà không reload trang
        window.history.pushState({}, '', '/admin/dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi kết nối với server');
    }
  };

  return (
    <div className="login-container admin-login">
      <div className="login-form">
        <div className="login-header">
          <h2>ADMIN LOGIN</h2>
          <p>Đăng nhập vào hệ thống quản trị</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password" 
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            ĐĂNG NHẬP
          </button>
        </form>

        <div className="login-footer">
          <p>© 2024 Admin Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
