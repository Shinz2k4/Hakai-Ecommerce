import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext"; 
import logo from "../assets/logo.avif";
import "../CSS/components/header.css";

const Header = () => {
  const { isLoggedIn, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
                <p>{currentUser?.firstName && currentUser?.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : currentUser?.username}</p>
                <p onClick={logout}>Đăng xuất</p>
              </>
            ) : (
              <>
                <p onClick={() => navigate('/login')}>Đăng Nhập</p>
                <p onClick={() => navigate('/register')}>Đăng Kí</p>
              </>
            )}
            <p>Vi</p>
            <p>En</p>
          </div>
        </div>
      </div>

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
            <NavLink to="/mess" className="icon-wrapper"><i className="fa-brands fa-facebook-messenger"></i></NavLink>
            <NavLink to="/cart" className="icon-wrapper"><i className="fa-solid fa-cart-shopping"></i></NavLink>
            <NavLink to="/profile" className="icon-wrapper"><i className="fa-solid fa-user"></i></NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
