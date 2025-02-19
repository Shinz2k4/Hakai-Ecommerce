import React, { useState } from "react";
import "../../CSS/auth/login.css";

const Login = ({ setIsLoggedIn, setUser, setIsModalOpen, setActiveForm }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Lưu token vào localStorage
        localStorage.setItem('userToken', data.token);
        // Cập nhật trạng thái đăng nhập và thông tin user
        setIsLoggedIn(true);
        setUser(data.user);
        setIsModalOpen(false);
        
        // Reset form
        setFormData({
          emailOrUsername: "",
          password: ""
        });
      } else {
        alert("Đăng nhập thất bại: " + data.message);
      }
    } catch (err) {
      alert("Có lỗi xảy ra: " + err.message);
    }
  };

  const handleFormChange = (formName) => {
    if (!setActiveForm || !setIsModalOpen) {
      console.error('setActiveForm or setIsModalOpen is not provided');
      return;
    }
    setActiveForm(formName);
    setIsModalOpen(true);
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Đăng Nhập</h2>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="close-button"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Email hoặc tên đăng nhập"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Đăng Nhập
          </button>
        </form>
        <div className="auth-links">
          <p>
            Chưa có tài khoản?{" "}
            <span onClick={() => handleFormChange('register')} className="auth-link">
              Đăng ký ngay
            </span>
          </p>
          <p>
            <span onClick={() => handleFormChange('forgot-password')} className="auth-link">
              Quên mật khẩu?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
