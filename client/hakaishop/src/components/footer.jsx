import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import '../CSS/components/footer.css';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>Về chúng tôi</Title>
              <Text>
                Hakai Shop - Chuyên cung cấp các sản phẩm điện nước chất lượng cao, 
                đảm bảo uy tín và chất lượng phục vụ.
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>Liên hệ</Title>
              <Space direction="vertical">
                <Text><PhoneOutlined /> 0967884187</Text>
                <Text><MailOutlined /> dminh2k4cn@gmail.com</Text>
                <Text><EnvironmentOutlined /> Hà Nội, Việt Nam</Text>
              </Space>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>Chính sách</Title>
              <Space direction="vertical">
                <Link>Chính sách bảo hành</Link>
                <Link>Chính sách đổi trả</Link>
                <Link>Chính sách vận chuyển</Link>
                <Link>Điều khoản dịch vụ</Link>
              </Space>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="footer-section">
              <Title level={4}>Theo dõi chúng tôi</Title>
              <Space size="large">
                <Link href="https://www.facebook.com/profile.php?id=61573813380063" target="_blank">
                  <FacebookOutlined className="social-icon" />
                </Link>
                <InstagramOutlined className="social-icon" />
                <TwitterOutlined className="social-icon" />
              </Space>
            </div>
          </Col>
        </Row>

        <Divider />
        
        <div className="footer-bottom">
          <Text>© 2024 Hakai Shop. Tất cả các quyền được bảo lưu.</Text>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
