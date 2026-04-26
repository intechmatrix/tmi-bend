import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dpkbxdvhm",
  api_key: process.env.CLOUDINARY_API_KEY || "164143441749944",
  api_secret: process.env.CLOUDINARY_API_SECRET || "0eDPaLz4bnlA_TJVLW9ZDQi1AUE"
});

export const uploadImage = async (filePath, folder = "tech-matrix") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};

export default cloudinary;
