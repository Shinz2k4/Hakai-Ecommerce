import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, InputNumber, Typography, message, Space, Image, Card, Row, Col } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Cart = () => {
  const [cart, setCart] = useState({
    _id: '',
    user: '',
    products: [],
    totalPrice: 0,
    createdAt: '',
    updatedAt: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      message.error('Không thể tải giỏ hàng');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put('http://localhost:5000/api/users/cart/update', 
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchCart();
    } catch (error) {
      message.error('Không thể cập nhật số lượng');
      console.error(error);
    }
  };
  const navigate = useNavigate();

  const handleNavigateToOrders = () => {
    navigate('/payments/orders');
  };
  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:5000/api/users/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
      message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (error) {
      message.error('Không thể xóa sản phẩm');
      console.error(error);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete('http://localhost:5000/api/users/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
      message.success('Đã xóa toàn bộ giỏ hàng');
    } catch (error) {
      message.error('Không thể xóa giỏ hàng');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'product',
      render: (_, record) => (
        <Space>
          <Image
            width={100}
            src={record.images?.[0]?.url}
            alt={record.name}
            style={{ borderRadius: '8px' }}
          />
          <span style={{ fontWeight: '500' }}>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span style={{ color: '#ff4d4f', fontWeight: '500' }}>{price?.toLocaleString()}đ</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.product, value)}
          style={{ width: '80px' }}
        />
      ),
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (_, record) => (
        <span style={{ color: '#ff4d4f', fontWeight: '500' }}>
          {(record.price * record.quantity).toLocaleString()}đ
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.product)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>

      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <ShoppingCartOutlined /> Giỏ hàng của bạn
            </Title>
          </Col>
          <Col>
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />}
              onClick={handleClearCart}
              disabled={!cart.products?.length}
            >
              Xóa tất cả
            </Button>
          </Col>
        </Row>

        <Table
          loading={loading}
          columns={columns}
          dataSource={cart.products}
          rowKey={(record) => record._id}
          pagination={false}
          bordered
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <strong>Tổng tiền</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong style={{ color: '#ff4d4f', fontSize: '18px' }}>
                    {cart.totalPrice?.toLocaleString()}đ
                  </strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} />
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
        <Button 
          type="primary"
          danger
          icon={<ShoppingCartOutlined />}
          onClick={handleNavigateToOrders}
          disabled={!cart.products?.length}
        >
          Đặt hàng
        </Button>
      </Card>
    </div>
  );
};

export default Cart;
