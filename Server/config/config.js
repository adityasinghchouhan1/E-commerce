// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dsrfuyc8o',
  api_key: '951447745665491',
  api_secret: 'u3iGOQ1kAzgbflkeWGEgknizqdw',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
    return {
      folder: 'uploads',
      resource_type: resourceType,
      public_id: Date.now() + '-' + file.originalname.split('.')[0],
    };
  },
});

const upload = require('multer')({ storage });

module.exports = { upload };
