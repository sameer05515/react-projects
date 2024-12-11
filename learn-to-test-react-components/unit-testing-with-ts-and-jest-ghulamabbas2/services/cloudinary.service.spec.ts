import { CloudinaryService } from "./cloudinary.service";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

jest.mock("cloudinary");

describe("CloudinaryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload a file to Cloudinary", async () => {
    const mockFile = "mockFileData";
    const mockFolder = "products";

    const mockUploadResponse: Partial<UploadApiResponse> = {
      public_id: "testPublicId",
      secure_url: "testSecureUrl",
    };

    const mockUpload = cloudinary.uploader.upload as jest.Mock;
    mockUpload.mockResolvedValue(mockUploadResponse);

    const result = await CloudinaryService.uploadFile(mockFile, mockFolder);

    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(mockFile, {
      folder: mockFolder,
    });
    expect(result).toEqual({
      public_id: mockUploadResponse.public_id,
      secure_url: mockUploadResponse.secure_url,
    });
  });

  it("should delete a file from Cloudinary", async () => {
    const mockFile = "testFile";
    const mockDeleteResponse = {
      result: "ok",
    };

    const mockDestroy = cloudinary.uploader.destroy as jest.Mock;
    mockDestroy.mockResolvedValue(mockDeleteResponse);

    const result = await CloudinaryService.deleteFile(mockFile);

    expect(mockDestroy).toHaveBeenCalledWith(mockFile);
    expect(result).toBe(true);
  });

  it("should rename a file in Cloudinary", async () => {
    const mockRename = cloudinary.uploader.rename as jest.Mock;

    const mockCurrentPublicId = "testCurrentPublicId";
    const mockNewPublicId = "testNewPublicId";

    await CloudinaryService.renameFile(mockCurrentPublicId, mockNewPublicId);

    expect(mockRename).toHaveBeenCalledWith(
      mockCurrentPublicId,
      mockNewPublicId
    );
  });
});
