import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Image, Button, message, Row, Col, Descriptions, InputNumber, Space, Tabs, Table } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import "../../CSS/screen/product.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [specificationData, setSpecificationData] = useState([]);
  const [markdownSpecs, setMarkdownSpecs] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/productUser/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]?.url);
        
        // Parse specifications
        if (response.data.specifications) {
          const specMatch = response.data.specifications.match(/@-(.*?)-@/);
          if (specMatch) {
            // Extract table data between @- and -@
            const tableData = specMatch[1].split('-').filter(spec => spec.trim());
            const parsedSpecs = tableData.map(spec => {
              const [key, value] = spec.split(':').map(s => s.trim());
              return {
                key: key,
                value: value
              };
            }).filter(spec => spec.key && spec.value);
            
            setSpecificationData(parsedSpecs);

            // Get remaining markdown content
            const remainingMarkdown = response.data.specifications.replace(/@-.*?-@/, '').trim();
            setMarkdownSpecs(remainingMarkdown);
          } else {
            setMarkdownSpecs(response.data.specifications);
          }
        }
      } catch (error) {
        message.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setLoadingAction(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        message.error('Bạn chưa đăng nhập!');
        return;
      }

      await axios.post('http://localhost:5000/api/users/add-to-cart', {
        productId: id,
        quantity: quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success(`Đã thêm ${product.name} vào giỏ hàng`);
    } catch (error) {
      message.error(error.response?.data?.message || 'Không thể thêm vào giỏ hàng. Vui lòng thử lại.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      setLoadingAction(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        message.warning("Vui lòng đăng nhập để thêm vào danh sách yêu thích");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/users/wishlist",
        {
          productId: id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      message.success("Đã thêm vào danh sách yêu thích");
    } catch (error) {
      message.error(error.response?.data?.message || "Không thể thêm vào danh sách yêu thích");
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <Text>Không tìm thấy sản phẩm</Text>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-container">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={10} className="product-image-section">
            <div className="image-container">
              <Image.PreviewGroup>
                <Image 
                  src={selectedImage} 
                  alt="Ảnh sản phẩm" 
                  className="main-product-image"
                  preview={true}
                />
                <div className="product-thumbnail-container">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    className={`thumbnail-image ${selectedImage === image.url ? "active" : ""}`}
                    preview={false}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))}
              </div>
              </Image.PreviewGroup>
            </div>
          </Col>

          <Col xs={24} md={14} className="product-info-section">
            <Title level={2}>{product.name}</Title>

            <Descriptions column={1} className="product-description">
              <Descriptions.Item label="Giá">
                <span className="product-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  }).format(product.price)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng">
                <span className={product.countInStock > 0 ? "in-stock" : "out-of-stock"}>
                  {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                <div style={{ height: '200px', padding: '10px' }}>
                  <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>
              </Descriptions.Item>
            </Descriptions>

            <div className="quantity-selector">
              <Text>Số lượng:</Text>
              <InputNumber
                min={1}
                max={product.countInStock}
                value={quantity}
                onChange={setQuantity}
                disabled={product.countInStock === 0}
              />
            </div>

            <Space>
              <Button 
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                loading={loadingAction}
                disabled={product.countInStock === 0}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                type="primary"
                icon={<HeartOutlined />}
                onClick={handleAddToWishlist}
                loading={loadingAction}
              >
                Yêu thích
              </Button>
            </Space>

            
          </Col>
        </Row>
      </div>
      <div className="product-detail">
        <Row gutter={[24, 24]} align="middle">
          
        <Tabs defaultActiveKey="1" className="product-tabs">
              <TabPane tab="Thông số kỹ thuật" key="1">
                {specificationData.length > 0 && (
                  <>
                    {markdownSpecs && (
                      <div style={{ marginBottom: '20px' }}>
                        <ReactMarkdown>{markdownSpecs}</ReactMarkdown>
                      </div>
                    )}
                    <Table 
                      dataSource={specificationData}
                      columns={[
                        { title: 'Thông số', dataIndex: 'key', key: 'key' },
                        { title: 'Giá trị', dataIndex: 'value', key: 'value' }
                      ]}
                      pagination={false}
                      bordered
                    />
                  </>
                )}
                {specificationData.length === 0 && (
                  <ReactMarkdown>{product.specifications}</ReactMarkdown>
                )}
              </TabPane>
              <TabPane tab="Chính sách bảo hành" key="2">
                <ReactMarkdown>{product.warranty || "# Chính sách bảo hành\n\n## Thời gian bảo hành\n- Thời gian bảo hành: 12 tháng\n- Áp dụng từ ngày mua hàng\n\n## Điều kiện bảo hành\n1. Sản phẩm còn trong thời hạn bảo hành\n2. Tem bảo hành và mã sản phẩm còn nguyên vẹn\n3. Sản phẩm lỗi do nhà sản xuất\n\n## Không bảo hành các trường hợp\n- Sản phẩm hết thời hạn bảo hành\n- Sản phẩm bị tác động vật lý làm biến dạng\n- Sản phẩm bị vào nước hoặc do thiên tai\n- Sản phẩm không còn tem bảo hành"}</ReactMarkdown>
              </TabPane>
            </Tabs> 
        </Row>
      </div>
    </div>
  );
};

export default Product;
