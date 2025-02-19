import React from 'react';
import { motion } from 'framer-motion';
import "../../CSS/screen/store.css";

const Store = () => {
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1",
      description: "Mô tả sản phẩm 1",
      price: "199.000đ",
      image: "product1.jpg"
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      description: "Mô tả sản phẩm 2", 
      price: "299.000đ",
      image: "product2.jpg"
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      description: "Mô tả sản phẩm 3",
      price: "399.000đ", 
      image: "product3.jpg"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="store-container"
    >
      <h1>Cửa Hàng</h1>

      <div className="filters">
        <select>
          <option value="">Tất cả danh mục</option>
          <option value="category1">Danh mục 1</option>
          <option value="category2">Danh mục 2</option>
        </select>

        <select>
          <option value="">Sắp xếp theo</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="name-asc">Tên A-Z</option>
        </select>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="product-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="price">{product.price}</div>
            <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
          </motion.div>
        ))}
      </div>

      <div className="pagination">
        <button>&lt;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>&gt;</button>
      </div>
    </motion.div>
  );
};

export default Store;
