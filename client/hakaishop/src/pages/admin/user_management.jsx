import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../CSS/admin/admin.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "nguyenvana",
      email: "nguyenvana@gmail.com",
      role: "Khách hàng",
      status: "Hoạt động",
      joinDate: "2023-07-15"
    },
    {
      id: 2,
      username: "tranthib", 
      email: "tranthib@gmail.com",
      role: "Khách hàng",
      status: "Bị khóa",
      joinDate: "2023-08-01"
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "Khách hàng",
    status: "Hoạt động"
  });

  const handleAddUser = () => {
    setUsers([...users, {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0]
    }]);
    setIsAddingUser(false);
    setNewUser({
      username: "",
      email: "",
      role: "Khách hàng", 
      status: "Hoạt động"
    });
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? {...user, status: newStatus} : user
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="user-management-container"
    >
      <h1>Quản lý người dùng</h1>
      
      <button 
        className="add-button"
        onClick={() => setIsAddingUser(true)}
      >
        Thêm người dùng
      </button>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tham gia</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.joinDate}</td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => updateUserStatus(user.id, e.target.value)}
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Bị khóa">Bị khóa</option>
                  </select>
                  <button onClick={() => setSelectedUser(user)}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddingUser && (
        <div className="modal">
          <div className="user-form">
            <h2>Thêm người dùng mới</h2>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={newUser.username}
              onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            />
            <input
              type="email" 
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="Khách hàng">Khách hàng</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="button-group">
              <button onClick={handleAddUser}>Thêm</button>
              <button onClick={() => setIsAddingUser(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="modal">
          <div className="user-details">
            <h2>Chi tiết người dùng</h2>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Tên đăng nhập:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Vai trò:</strong> {selectedUser.role}</p>
            <p><strong>Trạng thái:</strong> {selectedUser.status}</p>
            <p><strong>Ngày tham gia:</strong> {selectedUser.joinDate}</p>
            <button onClick={() => setSelectedUser(null)}>Đóng</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserManagement;
