import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/auth/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "", 
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Đăng ký thành công!");
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        navigate("/login");
      } else {
        alert("Đã xảy ra lỗi: " + data.message);
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi kết nối đến server: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Đăng Ký Tài Khoản</h2>
          <button 
            onClick={() => navigate("/")}
            className="close-button"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Họ"
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Tên"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="register-btn">
            Đăng Ký
          </button>
        </form>
        <div className="auth-links">
          <p>
            Đã có tài khoản?{" "}
            <span onClick={() => navigate("/login")} className="auth-link">
              Đăng nhập ngay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
