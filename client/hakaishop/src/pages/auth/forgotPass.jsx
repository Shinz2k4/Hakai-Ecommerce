import React, { useState } from "react";
import "../../CSS/auth/forgotPass.css";

const ForgotPassword = ({ setActiveForm }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3001/api/users/forgot-password", {
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
    <div className="forgot-password-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Quên mật khẩu?</h2>
        <button 
          onClick={() => setActiveForm("login")}
          className="close-button-forgot"
        >
          ✕
        </button>
      </div>
      <p>Nhập email để reset mật khẩu.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Nhập email của bạn" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit">Gửi</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setActiveForm("login")}>Quay lại đăng nhập</button>
    </div>
  );
};

export default ForgotPassword;
