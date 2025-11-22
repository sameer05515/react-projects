// MyResume.service.test.js
const MyResumeModel = require("./MyResume.model");
const { getResumeByUniqueId } = require("./MyResume.service");

jest.mock("./MyResume.model", () => ({
  findOne: jest.fn(),
}));

describe("MyResume.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getResumeByUniqueId", () => {
    it("returns resume when findOne resolves", async () => {
      const doc = { uniqueName: "john_doe", name: "John" };
      MyResumeModel.findOne.mockResolvedValue(doc);

      const result = await getResumeByUniqueId("john_doe");

      expect(MyResumeModel.findOne).toHaveBeenCalledWith({ uniqueName: "john_doe" });
      expect(result).toEqual(doc);
    });

    it("returns null when findOne returns null", async () => {
      MyResumeModel.findOne.mockResolvedValue(null);

      const result = await getResumeByUniqueId("missing");

      expect(result).toBeNull();
    });

    it("throws when findOne rejects", async () => {
      MyResumeModel.findOne.mockRejectedValue(new Error("DB error"));

      await expect(getResumeByUniqueId("x")).rejects.toThrow("DB error");
    });
  });
});
