import React, { useState } from "react";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgotPass";
import logo from "../assets/logo.avif";
import "./header.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // Xóa token từ localStorage
    localStorage.removeItem('userToken');
  };

  return (
    <>
      <div className="headerTab">
        <div className="headerContainer">
          <div className="contactInfo">
            <p>Điện thoại: 0967884187</p>
            <p>Email: dminh2k4cn@gmail.com</p>
          </div>
          <div className="authOptions">
            {isLoggedIn ? (
              <>
                <p>{user?.firstName} {user?.lastName}</p>
                <p onClick={handleLogout}>Đăng xuất</p>
              </>
            ) : (
              <>
                <p onClick={() => {
                  setActiveForm('login');
                  setIsModalOpen(true);
                }}>Đăng Nhập</p>
                <p onClick={() => {
                  setActiveForm('register'); 
                  setIsModalOpen(true);
                }}>Đăng Kí</p>
              </>
            )}
            <p>Vi</p>
            <p>En</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          {activeForm === 'login' ? (
            <Login 
              setIsLoggedIn={setIsLoggedIn} 
              setUser={setUser} 
              setIsModalOpen={setIsModalOpen}
              setActiveForm={setActiveForm}
            />
          ) : activeForm === 'register' ? (
            <Register 
              setIsModalOpen={setIsModalOpen}
              setActiveForm={setActiveForm} 
            />
          ) : (
            <ForgotPassword
              setActiveForm={setActiveForm}
            />
          )}
        </div>
      )}
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Logo" />
          <h1>Hakai Ecommerce</h1>
        </div>
        <div className="header-content">
          <p>Trang chủ</p>
          <p>Cửa hàng</p>
          <p>Tin tức</p>
          <p>Giảm giá</p>
          <p>Giới thiệu</p>
        </div>
        <div className="header-task">
          <div className="header-icons">
            <div className="icon-wrapper">
            <i class="fa-brands fa-facebook-messenger"></i>
            </div>
            <div className="icon-wrapper">
            <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="icon-wrapper">
            <i class="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
