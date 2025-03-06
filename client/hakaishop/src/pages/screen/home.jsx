import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Button, Input, Card, Row, Col, Carousel } from 'antd';
import { ShoppingOutlined, RocketOutlined, ThunderboltOutlined, GiftOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import "../../CSS/screen/home.css";
import may_loc_nuoc from "../../assets/may_loc_nuoc.jpg";
import binh_nong_lanh from "../../assets/binh_nong_lanh.jpg";
import bon_nuoc from "../../assets/bon_nuoc.jpg";
import dieu_hoa from "../../assets/dieu_hoa.jpg";

const { Title, Paragraph } = Typography;

const Home = () => {
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Máy lọc nước RO",
      price: "5.990.000đ",
      image: may_loc_nuoc
    },
    {
      id: 2, 
      name: "Bình nóng lạnh",
      price: "3.990.000đ",
      image: binh_nong_lanh
    },
    {
      id: 3,
      name: "Bồn nước",
      price: "1.990.000đ", 
      image: bon_nuoc
    },
    {
      id: 4,
      name: "Điều hòa",
      price: "890.000đ",
      image: dieu_hoa
    }
  ]);

  const carouselImages = [
    may_loc_nuoc,
    binh_nong_lanh, 
    bon_nuoc,
    dieu_hoa
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <Carousel autoplay effect="fade">
            {carouselImages.map((image, index) => (
              <div key={index} className="hero-slide">
                <motion.div 
                  className="hero-content"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Title level={1}>Chào mừng quý khách đến Hakai E-commerce</Title>
                  <Paragraph> Hakai E-commerce  Giải pháp toàn diện cho nhu cầu của bạn</Paragraph>
                  <Button 
                    type="primary"
                    size="large"
                    icon={<RocketOutlined />}
                    className="glow-button"
                    onClick={() => window.location.href = 'http://localhost:5173/store'}
                  >
                    Khám phá sản phẩm
                  </Button>
                </motion.div>
                <div className="hero-image">
                  <motion.img 
                    src={image}
                    alt="Thiết bị điện nước"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} sm={12} md={8} lg={6}>
              <motion.div
                className="feature-card glass-effect"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <ThunderboltOutlined className="feature-icon" />
                <Title level={4}>Lắp đặt nhanh chóng</Title>
                <Paragraph>Hoàn thành trong ngày</Paragraph>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <motion.div
                className="feature-card glass-effect"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <SafetyCertificateOutlined className="feature-icon" />
                <Title level={4}>Bảo hành dài hạn</Title>
                <Paragraph>Bảo hành chính hãng 12 tháng</Paragraph>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <motion.div
                className="feature-card glass-effect"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <CustomerServiceOutlined className="feature-icon" />
                <Title level={4}>Hỗ trợ 24/7</Title>
                <Paragraph>Đội ngũ kỹ thuật chuyên nghiệp</Paragraph>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <Title level={2} className="section-title">
            <ShoppingOutlined /> Sản phẩm nổi bật
          </Title>
          <Row gutter={[24, 24]}>
            {featuredProducts.map(product => (
              <Col xs={24} sm={12} md={6} key={product.id}>
                <motion.div
                  whileHover={{ y: -10, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    hoverable
                    className="product-card glass-effect"
                    cover={
                      <motion.div className="product-image-container">
                        <img alt={product.name} src={product.image} className="product-image" />
                      </motion.div>
                    }
                  >
                    <Card.Meta
                      title={<span className="product-title">{product.name}</span>}
                      description={<span className="product-price">{product.price}</span>}
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Categories Grid */}
        <section className="categories-section">
          <Title level={2} className="section-title">
            Danh mục sản phẩm
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                className="category-card glass-effect"
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <img src={may_loc_nuoc} alt="Máy lọc nước" />
                <div className="category-overlay">
                  <Title level={3}>Máy lọc nước</Title>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                className="category-card glass-effect"
                whileHover={{ scale: 1.02, rotateY: -5 }}
              >
                <img src={binh_nong_lanh} alt="Thiết bị nước nóng" />
                <div className="category-overlay">
                  <Title level={3}>Thiết bị nước nóng</Title>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                className="category-card glass-effect"
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <img src={bon_nuoc} alt="Thiết bị phòng tắm" />
                <div className="category-overlay">
                  <Title level={3}>Thiết bị phòng tắm</Title>
                </div>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <motion.div
            className="newsletter-container glass-effect"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Title level={2}>Đăng ký nhận tin</Title>
            <Paragraph>Nhận thông tin ưu đãi và cập nhật mới nhất</Paragraph>
            <div className="newsletter-form">
              <Input.Search
                placeholder="Nhập email của bạn"
                enterButton="Đăng ký"
                size="large"
                className="newsletter-input"
                onSearch={value => console.log(value)}
              />
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
