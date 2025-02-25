import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, InputNumber, message, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [form] = Form.useForm();

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get('http://localhost:5000/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data.products);
    } catch (error) {
      message.error('Could not load product list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Convert image to buffer
  const convertToBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Convert to buffer first
      const buffer = await convertToBuffer(file);
      
      const formData = new FormData();
      formData.append("file", new Blob([buffer]));
      formData.append("upload_preset", "hakai_preset");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/do8gfnops/image/upload",
        formData
      );

      if (response.data && response.data.secure_url) {
        setPreviewImages([...previewImages, response.data.secure_url]);
        console.log(response.data.secure_url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      message.error('Error uploading image');
      console.error(error);
    }
  };

  // Handle remove image
  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  // Handle add/edit product
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!previewImages.length) {
        message.error('Please upload at least one image');
        return;
      }

      const productData = {
        ...values,
        images: previewImages.map(url => ({ url, public_id: url.split('/').pop().split('.')[0] }))
      };

      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/admin/products/${editingProduct._id}`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Product updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/admin/products', productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Product added successfully');
      }
      setModalVisible(false);
      form.resetFields();
      setPreviewImages([]);
      fetchProducts();
    } catch (error) {
      message.error('An error occurred');
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Could not delete product');
    }
  };

  const columns = [
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Stock', dataIndex: 'countInStock', key: 'countInStock' },
    {
      title: 'Images', dataIndex: 'images', key: 'images',
      render: images => (
        <Image.PreviewGroup>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '200px' }}>
            {images?.map((image, index) => (
              <Image 
                key={index} 
                src={image.url} 
                style={{ 
                  width: '45px',
                  height: '45px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid #f0f0f0'
                }} 
              />
            ))}
          </div>
        </Image.PreviewGroup>
      )
    },
    {
      title: 'Actions', key: 'action',
      render: (_, record) => (
        <>
          <Button type="primary" icon={<EditOutlined />} onClick={() => {
            setEditingProduct(record);
            setPreviewImages(record.images?.map(img => img.url) || []);
            form.setFieldsValue(record);
            setModalVisible(true);
          }}>Edit</Button>
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} style={{ marginLeft: 8 }}>Delete</Button>
        </>
      )
    }
  ];
  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingProduct(null);
          setPreviewImages([]);
          form.resetFields();
          setModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setPreviewImages([]);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="countInStock"
            label="Stock Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Product Images"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: '10px' }}
            />
          </Form.Item>

          {previewImages.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p>Image Preview:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {previewImages.map((preview, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={preview}
                      alt={`preview-${index}`}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover'
                      }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'rgba(255,255,255,0.8)'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={previewImages.length === 0}>
              {editingProduct ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
