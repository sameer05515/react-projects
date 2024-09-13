import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  static async uploadFile(
    file: string,
    folder: string
  ): Promise<Partial<UploadApiResponse>> {
    const res = await cloudinary.uploader.upload(file, { folder: folder });

    return {
      public_id: res.public_id,
      secure_url: res.secure_url,
    };
  }

  static async deleteFile(file: string): Promise<boolean> {
    const res = await cloudinary.uploader.destroy(file);

    return res?.result === "ok";
  }

  static async renameFile(
    currentPublicId: string,
    newPublicId: string
  ): Promise<UploadApiResponse> {
    const res = await cloudinary.uploader.rename(currentPublicId, newPublicId);
    return res;
  }
}
