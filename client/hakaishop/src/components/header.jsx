import React, { useState } from "react";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";


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
          {activeForm === 'login' ? 
            <Login 
              setIsLoggedIn={setIsLoggedIn} 
              setUser={setUser} 
              setIsModalOpen={setIsModalOpen}
              setActiveForm={setActiveForm}
            /> : 
            <Register 
              setIsModalOpen={setIsModalOpen}
              setActiveForm={setActiveForm} 
            />
          }
          <button onClick={() => setIsModalOpen(false)}>Đóng</button>
        </div>
      )}
    </>
  );
};

export default Header;
