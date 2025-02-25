import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/auth/forgotPass.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Kiểm tra email của bạn để đặt lại mật khẩu.");
      } else {
        setMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      setMessage("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form">
        <div className="forgot-header">
          <h2>Quên mật khẩu?</h2>
          <p>Nhập email để reset mật khẩu của bạn</p>
        </div>

        {message && <div className="error-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">Gửi yêu cầu</button>
          
          <div className="back-to-login">
            <button className="back-to-login-button"
              onClick={() => navigate("/login")}
            >
              <a>Quay lại đăng nhập</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
