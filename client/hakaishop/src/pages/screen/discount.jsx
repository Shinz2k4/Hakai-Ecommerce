import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Card, Row, Col, Input, Button, Tag, Divider } from 'antd';
import { GiftOutlined, ClockCircleOutlined, PercentageOutlined, BellOutlined } from '@ant-design/icons';
import "../../CSS/screen/discount.css";

const { Title, Paragraph } = Typography;

const Discount = () => {
  const [email, setEmail] = useState('');

  const discountItems = [
    {
      id: 1,
      title: "Ưu đãi mùa hè sôi động",
      description: "Giảm giá lên đến 50% cho toàn bộ thiết bị điện nước cao cấp", 
      discount: "50%",
      validUntil: "31/08/2024",
      type: "seasonal",
      code: "SUMMER50"
    },
    {
      id: 2, 
      title: "Flash Sale cuối tuần",
      description: "Siêu giảm giá 24h - Số lượng có hạn, nhanh tay săn deal",
      discount: "70%",
      validUntil: "48 giờ",
      type: "flash",
      code: "FLASH70"
    },
    {
      id: 3,
      title: "Ưu đãi thành viên VIP",
      description: "Đặc quyền giảm thêm 10% cho thành viên VIP trên mọi đơn hàng",
      discount: "10%",
      validUntil: "31/12/2024",
      type: "member",
      code: "VIP10"
    },
    {
      id: 4,
      title: "Combo tiết kiệm",
      description: "Mua càng nhiều giảm càng sâu - Áp dụng cho bộ sản phẩm",
      discount: "25%",
      validUntil: "30/09/2024",
      type: "combo",
      code: "COMBO25"
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký email
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="discount-container"
    >
      <div className="discount-header">
        <Title level={1}>
          <PercentageOutlined /> Ưu Đãi Đặc Biệt
        </Title>
        <Paragraph className="subtitle">
          Khám phá các chương trình khuyến mãi hấp dẫn từ Hakai Shop
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} className="discount-grid">
        {discountItems.map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className={`discount-card ${item.type}`}
                hoverable
              >
                <div className="discount-badge">
                  <span>{item.discount}</span>
                </div>
                <Title level={3}>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <div className="validity">
                  <ClockCircleOutlined /> Hiệu lực đến: {item.validUntil}
                </div>
                <Tag color="gold" className="promo-code">{item.code}</Tag>
                <Button type="primary" block className="claim-btn">
                  <GiftOutlined /> Nhận ưu đãi ngay
                </Button>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Divider />

      <section className="newsletter-section">
        <Row justify="center" align="middle">
          <Col xs={24} md={16} lg={12}>
            <Card className="newsletter-card">
              <Title level={2}>
                <BellOutlined /> Đừng bỏ lỡ ưu đãi
              </Title>
              <Paragraph>
                Đăng ký nhận thông báo để cập nhật những chương trình khuyến mãi mới nhất
              </Paragraph>
              <form onSubmit={handleEmailSubmit} className="newsletter-form">
                <Input.Group compact>
                  <Input 
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: 'calc(100% - 200px)' }}
                  />
                  <Button type="primary" htmlType="submit">
                    Đăng ký ngay
                  </Button>
                </Input.Group>
              </form>
            </Card>
          </Col>
        </Row>
      </section>
    </motion.div>
  );
};

export default Discount;
