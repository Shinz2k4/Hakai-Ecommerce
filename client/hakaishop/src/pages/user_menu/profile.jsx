import React, { useState, useEffect } from "react";
import "../../CSS/user_menu/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      setMessage("Không thể tải thông tin người dùng");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Cập nhật thông tin thành công!");
        setIsEditing(false);
      } else {
        setMessage(data.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      setMessage("Lỗi kết nối đến máy chủ");
    }
  };

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ:</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {!isEditing ? (
          <button
            type="button"
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa thông tin
          </button>
        ) : (
          <div className="button-group">
            <button type="submit" className="save-button">
              Lưu thay đổi
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setIsEditing(false);
                fetchUserProfile();
              }}
            >
              Hủy
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
