import React from 'react';
import { motion } from 'framer-motion';
import "../../CSS/screen/home.css";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Hakai Shop</h1>
            <p>Discover our amazing collection of products</p>
            <button className="cta-button">Shop Now</button>
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {/* Product cards will go here */}
          </div>
        </section>

        {/* Categories */}
        <section className="categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            {/* Category cards will go here */}
          </div>
        </section>

        {/* Special Offers */}
        <section className="special-offers">
          <h2>Special Offers</h2>
          <div className="offers-grid">
            {/* Offer cards will go here */}
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with our latest products and offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
