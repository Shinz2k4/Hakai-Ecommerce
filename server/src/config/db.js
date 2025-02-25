const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Kết nối database users
    const usersDb = await mongoose.createConnection(process.env.MONGO_URI_1, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4
    });

    // Kết nối database products  
    const productsDb = await mongoose.createConnection(process.env.MONGO_URI_2, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true, 
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4
    });

    // Kết nối database orders
    const ordersDb = await mongoose.createConnection(process.env.MONGO_URI_3, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
      maxPoolSize: 10, 
      socketTimeoutMS: 45000,
      family: 4
    });

    // Kết nối database reviews
    const reviewsDb = await mongoose.createConnection(process.env.MONGO_URI_4, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4
    });

    // Kết nối database admin
    const adminDb = await mongoose.createConnection(process.env.MONGO_URI_5, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4
    });

    console.log('✅ Đã kết nối thành công tới tất cả các database MongoDB');

    // Export các connection để sử dụng ở nơi khác
    mongoose.usersDb = usersDb;
    mongoose.productsDb = productsDb;
    mongoose.ordersDb = ordersDb;
    mongoose.reviewsDb = reviewsDb;
    mongoose.adminDb = adminDb;
    return {
      usersDb,
      productsDb,
      ordersDb,
      reviewsDb,
      adminDb
    };

  } catch (error) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
