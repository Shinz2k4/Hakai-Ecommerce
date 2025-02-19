import React from 'react';
import { motion } from 'framer-motion';
import "../../CSS/screen/discount.css";

const Discount = () => {
  const discountItems = [
    {
      id: 1,
      title: "Giảm giá mùa hè",
      description: "Giảm giá lên đến 50% cho tất cả sản phẩm mùa hè", 
      discount: "50%",
      validUntil: "31/08/2023"
    },
    {
      id: 2, 
      title: "Flash Sale",
      description: "Giảm sốc 24h - Số lượng có hạn",
      discount: "70%",
      validUntil: "Hôm nay"
    },
    {
      id: 3,
      title: "Ưu đãi thành viên",
      description: "Giảm thêm 10% cho thành viên VIP",
      discount: "10%",
      validUntil: "31/12/2023"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="discount-container"
    >
      <h1>Khuyến Mãi Đặc Biệt</h1>
      
      <div className="discount-grid">
        {discountItems.map((item) => (
          <motion.div
            key={item.id}
            className="discount-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="discount-badge">{item.discount}</div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="validity">
              Có hiệu lực đến: {item.validUntil}
            </div>
            <button className="claim-btn">Nhận ưu đãi</button>
          </motion.div>
        ))}
      </div>

      <section className="newsletter-discount">
        <h2>Đăng ký nhận thông tin khuyến mãi</h2>
        <p>Để không bỏ lỡ các ưu đãi đặc biệt</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Nhập email của bạn" />
          <button type="submit">Đăng ký</button>
        </form>
      </section>
    </motion.div>
  );
};

export default Discount;
