const multer = require('multer');
const path = require('path');

// Configure storage for local file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/assets/'); // Save to public/assets folder
  },
  filename: function(req, file, cb) {
    // Generate unique filename with timestamp
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

module.exports = upload;
