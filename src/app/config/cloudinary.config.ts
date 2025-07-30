import { v2 as cloudinary } from "cloudinary";
import config from ".";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME as string,
  api_key: config.CLOUDINARY_API_KEY as string,
  api_secret: config.CLOUDINARY_API_SECRET as string,
});

export const deleteImageFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const match = url.match(regex);
    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`File Deleted:- ${public_id}!!!`);
    }
  } catch (err: any) {
    console.log(`Failed to Delete,Error:- ${err.message}`);
  }
};

export const cloudinaryUpload = cloudinary;
