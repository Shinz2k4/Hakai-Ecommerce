import React from 'react';
import { motion } from 'framer-motion';
import "../../CSS/screen/news.css";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Tin tức mới 1",
      content: "Nội dung tin tức 1",
      date: "01/08/2023",
      image: "news1.jpg"
    },
    {
      id: 2,
      title: "Tin tức mới 2",
      content: "Nội dung tin tức 2", 
      date: "02/08/2023",
      image: "news2.jpg"
    },
    {
      id: 3,
      title: "Tin tức mới 3",
      content: "Nội dung tin tức 3",
      date: "03/08/2023",
      image: "news3.jpg" 
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
      <h1>Tin Tức</h1>

      <div className="news-grid">
        {newsItems.map((item) => (
          <motion.div
            key={item.id}
            className="news-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src={item.image} alt={item.title} />
            <div className="news-content">
              <h2>{item.title}</h2>
              <p className="date">{item.date}</p>
              <p className="content">{item.content}</p>
              <button className="read-more-btn">Đọc thêm</button>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="featured-news">
        <h2>Tin Tức Nổi Bật</h2>
        <div className="featured-grid">
          {/* Featured news will be added here */}
        </div>
      </section>

      <section className="newsletter-news">
        <h2>Đăng ký nhận tin tức</h2>
        <p>Cập nhật tin tức mới nhất</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Nhập email của bạn" />
          <button type="submit">Đăng ký</button>
        </form>
      </section>
    </motion.div>
  );
};

export default News;
