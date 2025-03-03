import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:5000/api/users/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        message.error('Không thể tải danh sách đơn hàng');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusTag = (status) => {
    switch (status) {
      case 'pending':
        return <Tag color="warning">Chờ xử lý</Tag>;
      case 'processing':
        return <Tag color="processing">Đang xử lý</Tag>;
      case 'shipped':
        return <Tag color="blue">Đang giao</Tag>;
      case 'delivered':
        return <Tag color="success">Đã giao</Tag>;
      case 'cancelled':
        return <Tag color="error">Đã hủy</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `${price?.toLocaleString()}đ`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary"
          onClick={() => navigate(`/orders/${record._id}`)}
        >
          Xem chi tiết
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <Title level={2} style={{ marginBottom: '20px' }}>Đơn hàng của tôi</Title>
        
        <Table
          loading={loading}
          columns={columns}
          dataSource={orders}
          rowKey={(record) => record._id}
          pagination={false}
          bordered
          locale={{
            emptyText: 'Bạn chưa có đơn hàng nào'
          }}
        />
      </Card>
    </div>
  );
};

export default Orders;
