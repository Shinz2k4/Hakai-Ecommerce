import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Card, Row, Col, Input, Button, Tag, Pagination, Space } from 'antd';
import { SearchOutlined, CalendarOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons';
import "../../CSS/screen/news.css";

const { Title, Paragraph } = Typography;

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const newsItems = [
    {
      id: 1,
      title: "Xu hướng thiết bị điện nước thông minh năm 2024",
      summary: "Khám phá những công nghệ mới nhất trong lĩnh vực thiết bị điện nước, từ vòi nước cảm ứng đến hệ thống điều khiển thông minh.",
      content: "Trong năm 2024, thị trường thiết bị điện nước chứng kiến nhiều đổi mới đáng kể...",
      date: "15/03/2024",
      image: "https://example.com/smart-devices.jpg",
      category: "Công nghệ",
      views: 1250,
      likes: 45
    },
    {
      id: 2,
      title: "Giải pháp tiết kiệm nước cho gia đình hiện đại",
      summary: "Tìm hiểu các phương pháp hiệu quả giúp tiết kiệm nước trong sinh hoạt hàng ngày mà vẫn đảm bảo tiện nghi.",
      content: "Với tình hình khan hiếm nước ngày càng nghiêm trọng...",
      date: "12/03/2024",
      image: "https://example.com/water-saving.jpg",
      category: "Tiết kiệm",
      views: 980,
      likes: 38
    },
    {
      id: 3,
      title: "Top 5 thương hiệu thiết bị vệ sinh cao cấp 2024",
      summary: "Đánh giá chi tiết về chất lượng và giá cả của các thương hiệu thiết bị vệ sinh hàng đầu trên thị trường.",
      content: "Khi lựa chọn thiết bị vệ sinh cho không gian phòng tắm...",
      date: "10/03/2024",
      image: "https://example.com/bathroom-fixtures.jpg",
      category: "Đánh giá",
      views: 1500,
      likes: 62
    }
  ];

  const featuredNews = [
    {
      id: 4,
      title: "Cách chọn máy nước nóng phù hợp cho mùa đông",
      date: "08/03/2024",
      image: "https://example.com/water-heater.jpg",
      views: 2100
    },
    {
      id: 5,
      title: "Bí quyết bảo dưỡng thiết bị điện nước định kỳ",
      date: "05/03/2024",
      image: "https://example.com/maintenance.jpg",
      views: 1800
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="news-container"
    >
      <div className="news-header">
        <Title level={2}>Tin Tức & Sự Kiện</Title>
        <div className="news-search">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm tin tức..."
            size="large"
          />
        </div>
      </div>

      <Row gutter={[24, 24]} className="featured-news-section">
        <Col span={24}>
          <Title level={3}>Tin Tức Nổi Bật</Title>
        </Col>
        {featuredNews.map(news => (
          <Col xs={24} sm={12} key={news.id}>
            <Card
              hoverable
              cover={<img alt={news.title} src={news.image} />}
              className="featured-news-card"
            >
              <Tag color="blue">{news.views} lượt xem</Tag>
              <Title level={4}>{news.title}</Title>
              <Space>
                <CalendarOutlined /> {news.date}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="news-grid">
        {newsItems.map(item => (
          <Col xs={24} md={8} key={item.id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                hoverable
                cover={<img alt={item.title} src={item.image} />}
                className="news-card"
              >
                <Tag color="green">{item.category}</Tag>
                <Title level={4}>{item.title}</Title>
                <Paragraph ellipsis={{ rows: 2 }}>{item.summary}</Paragraph>
                <Space className="news-meta">
                  <span><CalendarOutlined /> {item.date}</span>
                  <span><EyeOutlined /> {item.views}</span>
                  <span><LikeOutlined /> {item.likes}</span>
                </Space>
                <Button type="primary">Đọc tiếp</Button>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <div className="newsletter-section">
        <Card className="newsletter-card">
          <Title level={3}>Đăng ký nhận bản tin</Title>
          <Paragraph>
            Nhận thông tin mới nhất về sản phẩm và khuyến mãi từ Hakai Shop
          </Paragraph>
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="Nhập email của bạn" />
            <Button type="primary">Đăng ký</Button>
          </Space.Compact>
        </Card>
      </div>

      <div className="pagination-container">
        <Pagination
          current={currentPage}
          onChange={setCurrentPage}
          total={50}
          pageSize={10}
        />
      </div>
    </motion.div>
  );
};

export default News;
