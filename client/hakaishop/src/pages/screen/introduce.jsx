import React from 'react';
import { motion } from 'framer-motion';
import "../../CSS/screen/introduce.css";

const Introduce = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="introduce-container"
    >
      <section className="intro-hero">
        <h1>Về Hakai Shop</h1>
        <p>Chào mừng đến với Hakai Shop - Nơi mang đến trải nghiệm mua sắm tuyệt vời nhất cho bạn</p>
      </section>

      <section className="our-story">
        <h2>Câu chuyện của chúng tôi</h2>
        <p>
          Được thành lập vào năm 2023, Hakai Shop đã không ngừng phát triển và 
          trở thành một trong những điểm đến mua sắm trực tuyến được yêu thích nhất.
          Chúng tôi tự hào mang đến cho khách hàng những sản phẩm chất lượng cao với 
          giá cả hợp lý.
        </p>
      </section>

      <section className="our-values">
        <h2>Giá trị cốt lõi</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Chất lượng</h3>
            <p>Cam kết mang đến những sản phẩm chất lượng cao nhất</p>
          </div>
          <div className="value-card">
            <h3>Uy tín</h3>
            <p>Xây dựng niềm tin với khách hàng qua từng giao dịch</p>
          </div>
          <div className="value-card">
            <h3>Dịch vụ</h3>
            <p>Hỗ trợ khách hàng 24/7 với đội ngũ chuyên nghiệp</p>
          </div>
        </div>
      </section>

      <section className="contact-info">
        <h2>Liên hệ với chúng tôi</h2>
        <div className="contact-details">
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
          <p>Email: dminh2k4cn@gmail.com</p>
          <p>Điện thoại: 0967884187</p>
        </div>
      </section>
    </motion.div>
  );
};

export default Introduce;
