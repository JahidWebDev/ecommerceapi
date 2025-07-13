const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const uploadImage = async (fileName) => {
  try {
    const result = await cloudinary.uploader.upload(fileName);
    fs.unlinkSync(fileName); // Delete local file after upload
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error; // <- throw so it can be caught in the controller
  }
};

module.exports = uploadImage;
