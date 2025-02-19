import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../CSS/admin/admin.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 500000,
      category: "Áo",
      stock: 50,
      image: "product1.jpg"
    },
    {
      id: 2,
      name: "Sản phẩm 2", 
      price: 800000,
      category: "Quần",
      stock: 30,
      image: "product2.jpg"
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleAddProduct = () => {
    setProducts([...products, {
      id: products.length + 1,
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    }]);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      stock: '',
      image: ''
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="product-management-container"
    >
      <h1>Quản lý sản phẩm</h1>
      
      <button 
        className="add-product-btn"
        onClick={() => setIsAddingProduct(true)}
      >
        Thêm sản phẩm mới
      </button>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => setSelectedProduct(product)}>Sửa</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddingProduct && (
        <div className="modal">
          <div className="product-form">
            <h2>Thêm sản phẩm mới</h2>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <input
              type="number"
              placeholder="Giá"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <input
              type="text"
              placeholder="Danh mục"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            />
            <input
              type="number"
              placeholder="Số lượng tồn kho"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
            />
            <input
              type="text"
              placeholder="URL hình ảnh"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <div className="button-group">
              <button onClick={handleAddProduct}>Thêm</button>
              <button onClick={() => setIsAddingProduct(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="modal">
          <div className="product-form">
            <h2>Chỉnh sửa sản phẩm</h2>
            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
            />
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})}
            />
            <input
              type="text"
              value={selectedProduct.category}
              onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
            />
            <input
              type="number"
              value={selectedProduct.stock}
              onChange={(e) => setSelectedProduct({...selectedProduct, stock: e.target.value})}
            />
            <div className="button-group">
              <button onClick={() => {
                setProducts(products.map(p => 
                  p.id === selectedProduct.id ? selectedProduct : p
                ));
                setSelectedProduct(null);
              }}>Lưu</button>
              <button onClick={() => setSelectedProduct(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductManagement;
