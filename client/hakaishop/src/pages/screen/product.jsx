import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Image, Button, message, Row, Col, Descriptions, InputNumber, Space } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import "../../CSS/screen/product.css";

const { Title, Text } = Typography;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(""); // Ảnh chính đang hiển thị

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/productUser/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]?.url); // Ảnh đầu tiên là mặc định
      } catch (error) {
        message.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      <Row gutter={[24, 24]} align="middle">
        {/* Cột hiển thị hình ảnh sản phẩm */}
        <Col xs={24} md={10} className="product-image-section">
          <Image.PreviewGroup>
            {/* Ảnh lớn */}
            <Image 
              src={selectedImage} 
              alt="Ảnh sản phẩm" 
              className="main-product-image"
              preview={true}
            />
            {/* Danh sách ảnh nhỏ bên dưới */}
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
        </Col>

        {/* Cột thông tin sản phẩm */}
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
            <Descriptions.Item label="Mô tả">{product.description}</Descriptions.Item>
          </Descriptions>

          <div className="quantity-selector">
            <Text>Số lượng:</Text>
            <InputNumber
              min={1}
              max={product.countInStock}
              value={quantity}
              onChange={setQuantity}
            />
          </div>

          <Space size="large" className="product-action-buttons">
            <Button type="primary" icon={<ShoppingCartOutlined />} className="add-to-cart-button">
              Thêm vào giỏ hàng
            </Button>

            <Button icon={<HeartOutlined />} className="add-to-wishlist-button">
              Yêu thích
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
