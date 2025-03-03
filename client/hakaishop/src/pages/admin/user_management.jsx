import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle update user
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("adminToken");
      const { firstName, lastName, ...otherValues } = values;
      const name = `${firstName} ${lastName}`.trim();
      
      if (!name) {
        message.error('Vui lòng nhập họ và tên');
        return;
      }

      await axios.put(`http://localhost:5000/api/admin/users/${editingUser._id}`, {
        ...otherValues,
        name
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Cập nhật thông tin thành công');
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật');
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Xóa người dùng thành công');
      fetchUsers();
    } catch (error) {
      message.error('Không thể xóa người dùng');
    }
  };
  
  const columns = [
    {
      title: 'STT',
      key: 'index', 
      width: 60,
      render: (_, __, index) => index + 1
    },
    {
      title: 'Tên',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (lastName) => lastName || 'Anonymous'
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth', 
      render: (date) => date ? moment(date).format('DD/MM/YYYY') : 'Chưa cập nhật'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => {
        switch(gender) {
          case 'male': return 'Nam';
          case 'female': return 'Nữ';
          case 'other': return 'Khác';
          default: return 'Chưa cập nhật';
        }
      }
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        switch(role) {
          case 'admin': return 'Quản trị viên';
          case 'user': return 'Người dùng';
          default: return role;
        }
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue({
                ...record,
                dateOfBirth: record.dateOfBirth ? moment(record.dateOfBirth) : null
              });
              setModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            style={{ marginLeft: 8 }}
          >
            Xóa
          </Button>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title="Sửa thông tin người dùng"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            firstName: '',
            lastName: '',
            gender: 'other',
            role: 'user'
          }}
        >
          <Form.Item
            name="firstName"
            label="Họ"
            rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
          >
            <Input placeholder="Nhập họ" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày sinh"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          >
            <Select>
              <Select.Option value="user">Người dùng</Select.Option>
              <Select.Option value="admin">Quản trị viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
