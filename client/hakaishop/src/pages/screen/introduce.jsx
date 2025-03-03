import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Row, Col, Card, Space } from 'antd';
import { ShopOutlined, SafetyCertificateOutlined, CustomerServiceOutlined, TeamOutlined } from '@ant-design/icons';
import "../../CSS/screen/introduce.css";

const { Title, Paragraph } = Typography;

const Introduce = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="introduce-container"
    >
      <div className="introduce-header">
        <Title level={1}>Hakai - Thiết Bị Điện Gia Dụng Cao Cấp</Title>
        <Paragraph>
          Chuyên cung cấp các sản phẩm thiết bị điện gia dụng chính hãng với chất lượng hàng đầu
        </Paragraph>
      </div>

      <div className="introduce-section">
        <Title level={2}>Về Chúng Tôi</Title>
        <Paragraph>
          Hakai là đơn vị tiên phong trong lĩnh vực cung cấp thiết bị điện gia dụng tại Việt Nam. 
          Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến cho khách hàng những sản phẩm đa dạng 
          từ các thương hiệu uy tín trên thế giới như bếp từ, quạt hơi nước, máy bơm, đèn LED, 
          tủ lạnh, lò vi sóng, thiết bị phòng tắm và nhiều sản phẩm khác.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} className="introduce-features">
        <Col xs={24} sm={12} lg={6}>
          <Card className="feature-card">
            <ShopOutlined style={{ fontSize: '36px', color: '#00aa0e' }} />
            <Title level={3}>Sản Phẩm Đa Dạng</Title>
            <Paragraph>
              Hơn 10,000+ sản phẩm từ các thương hiệu hàng đầu thế giới
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="feature-card">
            <SafetyCertificateOutlined style={{ fontSize: '36px', color: '#00aa0e' }} />
            <Title level={3}>Bảo Hành Chính Hãng</Title>
            <Paragraph>
              Cam kết 100% sản phẩm chính hãng với chế độ bảo hành toàn diện
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="feature-card">
            <CustomerServiceOutlined style={{ fontSize: '36px', color: '#00aa0e' }} />
            <Title level={3}>Hỗ Trợ 24/7</Title>
            <Paragraph>
              Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng mọi lúc
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="feature-card">
            <TeamOutlined style={{ fontSize: '36px', color: '#00aa0e' }} />
            <Title level={3}>Đội Ngũ Lắp Đặt</Title>
            <Paragraph>
              Dịch vụ lắp đặt chuyên nghiệp, nhanh chóng tại nhà
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <div className="introduce-section">
        <Title level={2}>Cam Kết Của Chúng Tôi</Title>
        <Space direction="vertical" size="large">
          <Paragraph>
            • Sản phẩm chính hãng 100% với giá cả cạnh tranh nhất thị trường
          </Paragraph>
          <Paragraph>
            • Dịch vụ giao hàng nhanh chóng, miễn phí trong nội thành
          </Paragraph>
          <Paragraph>
            • Đội ngũ kỹ thuật viên lành nghề, tư vấn tận tâm
          </Paragraph>
          <Paragraph>
            • Chính sách đổi trả linh hoạt trong vòng 30 ngày
          </Paragraph>
        </Space>
      </div>

      <div className="introduce-section">
        <Title level={2}>Thông Tin Liên Hệ</Title>
        <Space direction="vertical" size="large">
          <Paragraph>
            <strong>Showroom:</strong> 123 Đường ABC, Quận XYZ, TP.HCM
          </Paragraph>
          <Paragraph>
            <strong>Hotline:</strong> 0967884187
          </Paragraph>
          <Paragraph>
            <strong>Email:</strong> dminh2k4cn@gmail.com
          </Paragraph>
          <Paragraph>
            <strong>Giờ làm việc:</strong> 8:00 - 21:00 (Thứ 2 - Chủ Nhật)
          </Paragraph>
        </Space>
      </div>
    </motion.div>
  );
};

export default Introduce;
