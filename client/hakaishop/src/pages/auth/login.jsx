import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "../../CSS/auth/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Thêm credentials để gửi và nhận cookie
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Lưu thông tin user vào context và localStorage
        login(data); // data sẽ chứa token và thông tin user từ server
        navigate("/");
        
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

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Đăng Nhập</h2>
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
            <span onClick={() => navigate("/register")} className="auth-link">
              Đăng ký ngay
            </span>
          </p>
          <p>
            <span onClick={() => navigate("/forgot-password")} className="auth-link">
              Quên mật khẩu?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
