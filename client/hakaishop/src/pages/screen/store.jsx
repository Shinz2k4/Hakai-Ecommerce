import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, Button, message, Image, Space, Divider, Tooltip, Select, Input } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Bếp từ',
    'Quạt điện',
    'Nồi cơm', 
    'Đèn',
    'Bình nóng lạnh',
    'Điều hòa',
    'Máy giặt',
    'Tủ lạnh'
  ];

  const fetchProducts = async () => {
    try {
      

      const response = await axios.get('http://localhost:5000/api/users/store');

      setProducts(response.data.products);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      message.error(error.response?.data?.message || 'Không thể tải danh sách sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    setLoadingProductId(product._id);
    try {
      const token = localStorage.getItem("userToken");
      const quantity = 1;
      if (!token) {
        message.error('Bạn chưa đăng nhập!');
        setLoadingProductId(null);
        return;
      }

      await axios.post('http://localhost:5000/api/users/add-to-cart', {
        productId: product._id,
        quantity: quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success(`Đã thêm ${product.name} vào giỏ hàng`);
    } catch (error) {
      message.error(error.response?.data?.message || 'Không thể thêm vào giỏ hàng. Vui lòng thử lại.');
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        message.error('Bạn chưa đăng nhập!');
        return;
      }

      await axios.post('http://localhost:5000/api/wishlist/add', {
        productId: product._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success(`Đã thêm ${product.name} vào danh sách yêu thích`);
    } catch (error) {
      message.error(error.response?.data?.message || 'Không thể thêm vào danh sách yêu thích. Vui lòng thử lại.');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sortedProducts = [...products];
    
    switch(value) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setProducts(sortedProducts);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    return str;
  }

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => {
      const normalizedProductName = removeVietnameseTones(product.name.toLowerCase());
      const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase());
      return normalizedProductName.includes(normalizedSearchTerm);
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="store-container" style={{ padding: '20px' }}>
      <Row gutter={[24, 24]}>
        {/* Cột bên trái - Bộ lọc (30%) */}
        <Col span={6}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Title level={3}>Bộ lọc</Title>
            <Divider />

            <div style={{ marginBottom: '20px' }}>
              <Text strong>Tìm kiếm:</Text>
              <Search
                placeholder="Tìm kiếm sản phẩm..."
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '100%', marginTop: '8px' }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <Text strong>Sắp xếp theo:</Text>
              <Select
                style={{ width: '100%', marginTop: '8px' }}
                defaultValue="default"
                onChange={handleSort}
              >
                <Option value="default">Mặc định</Option>
                <Option value="price-asc">Giá: Thấp đến cao</Option>
                <Option value="price-desc">Giá: Cao đến thấp</Option>
                <Option value="name-asc">Tên: A-Z</Option>
                <Option value="name-desc">Tên: Z-A</Option>
              </Select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Text strong>Thể loại:</Text>
              <Select
                style={{ width: '100%', marginTop: '8px' }}
                defaultValue="all"
                onChange={handleCategoryChange}
              >
                <Option value="all">Tất cả</Option>
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </div>
          </div>
        </Col>

        {/* Cột bên phải - Danh sách sản phẩm (70%) */}
        <Col span={18}>
          <div className="store-content">
            <Title level={2}>Sản phẩm nổi bật</Title>
            
            {filteredProducts.length === 0 ? (
              <div className="empty-products" style={{ textAlign: 'center', padding: '40px' }}>
                <Text>Không có sản phẩm nào</Text>
              </div>
            ) : (
              <Row gutter={[24, 24]}>
                {filteredProducts.map(product => (
                  <Col xs={24} sm={12} md={8} key={product._id}>
                    <Card
                      hoverable
                      style={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onClick={() => handleProductClick(product._id)}
                      cover={
                        <div style={{ 
                          height: '200px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}>
                          <Image
                            alt={product.name}
                            src={product.images[0]?.url}
                            preview={false}
                            style={{
                              width: '100%',
                              height: '200px',
                              objectFit: 'cover'
                            }}
                          />
                          <Button 
                            className="wishlist-button"
                            icon={<HeartOutlined />}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToWishlist(product);
                            }}
                          />
                        </div>
                      }
                    >
                      <div style={{ flex: 1 }}>
                        <Tooltip title={product.name}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            {product.name}
                          </Text>
                        </Tooltip>

                        <Text type="secondary" style={{ 
                          display: 'block',
                          marginBottom: '8px',
                          height: '40px',
                          overflow: 'hidden'
                        }}>
                          {product.description}
                        </Text>

                        <div style={{ marginTop: 'auto' }}>
                          <Text strong style={{ fontSize: '18px', color: '#ff4d4f', display: 'block' }}>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(product.price)}
                          </Text>
                          <Text type="secondary">
                            Còn lại: {product.countInStock}
                          </Text>

                          <Button 
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            style={{ width: '100%', marginTop: '12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            loading={loadingProductId === product._id}
                          >
                            Thêm vào giỏ
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Store;
