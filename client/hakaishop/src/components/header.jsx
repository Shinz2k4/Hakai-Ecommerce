import React, { useState } from "react";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgotPass";
import logo from "../assets/logo.avif";
import { NavLink } from "react-router-dom";
import "../CSS/components/header.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userToken');
  };

  return (
    <>
      <div className="headerTab">
        <div className="headerTabContainer">
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
          <NavLink to="/">
            <img src={logo} alt="Logo" />
            <h1>Hakai Ecommerce</h1>
          </NavLink>
        </div>
        <nav className="header-content">
          <NavLink to="/" className="nav-item">Trang chủ</NavLink>
          <NavLink to="/store" className="nav-item">Cửa hàng</NavLink>
          <NavLink to="/news" className="nav-item">Tin tức</NavLink>
          <NavLink to="/discount" className="nav-item">Giảm giá</NavLink>
          <NavLink to="/introduce" className="nav-item">Giới thiệu</NavLink>
        </nav>
        <div className="header-task">
          <div className="header-icons">
            <NavLink to="/mess" className="icon-wrapper">
              <i className="fa-brands fa-facebook-messenger"></i>
            </NavLink>
            <NavLink to="/cart" className="icon-wrapper">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            <NavLink to="/profile" className="icon-wrapper">
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
