import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import "../../CSS/user_menu/profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "", 
    email: currentUser?.email || "",
    username: currentUser?.username || "",
    dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : "",
    gender: currentUser?.gender || ""
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!currentUser || !currentUser.token) {
          setMessage("Vui lòng đăng nhập để xem thông tin");
          return;
        }

        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          setMessage("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setUser({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            username: data.username || "",
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : "",
            gender: data.gender || ""
          });
        } else {
          setMessage(data.message || "Có lỗi xảy ra khi tải thông tin");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Lỗi kết nối đến máy chủ");
      }
    };

    fetchUserProfile();
  }, [currentUser]);

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
      // Kiểm tra user có đăng nhập không
      if (!currentUser || !currentUser.token) {
        setMessage("Vui lòng đăng nhập lại để thực hiện thao tác này");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,  
        },
        credentials: "include", // Nếu backend dùng cookie để xác thực
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        setMessage("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setMessage("Cập nhật thông tin thành công!");
        setIsEditing(false);
      } else {
        setMessage(data.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Lỗi kết nối đến máy chủ");
    }
  };

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Họ:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            name="lastName" 
            value={user.lastName}
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
          <label>Ngày sinh:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Giới tính:</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
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
                setUser({
                  firstName: currentUser?.firstName || "",
                  lastName: currentUser?.lastName || "",
                  email: currentUser?.email || "",
                  username: currentUser?.username || "",
                  dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : "",
                  gender: currentUser?.gender || ""
                });
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
