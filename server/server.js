const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("./src/config/cloudinary.js");
const connectDB = require("./src/config/db.js");
const userRoutes = require("./src/routes/userRoutes.js");
const adminRoutes = require("./src/routes/adminRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const storage = multer.diskStorage({});
const upload = multer({ storage });

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ 
      success: true,
      imageUrl: result.secure_url 
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to upload image" 
    });
  }
});

// Error handling middleware 
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
