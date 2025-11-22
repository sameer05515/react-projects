const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockFindOneAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.mock("./ComparableObject.model", () => ({
  create: mockCreate,
  find: mockFind,
  findOne: mockFindOne,
  findOneAndUpdate: mockFindOneAndUpdate,
  findByIdAndDelete: mockFindByIdAndDelete,
}));

const {
  createItem,
  getAllItems,
  getItemByUniqueId,
  updateItemByUniqueId,
  deleteItemById,
} = require("./ComparableObject.service");

describe("ComparableObject.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createItem", () => {
    it("calls model.create with data and returns created doc", async () => {
      const data = { uniqueId: "u1", name: "Item" };
      const created = { _id: "id1", ...data };
      mockCreate.mockResolvedValue(created);

      const result = await createItem(data);

      expect(mockCreate).toHaveBeenCalledWith(data);
      expect(result).toEqual(created);
    });
  });

  describe("getAllItems", () => {
    it("calls model.find and returns array", async () => {
      const docs = [{ uniqueId: "u1" }];
      mockFind.mockResolvedValue(docs);

      const result = await getAllItems();

      expect(mockFind).toHaveBeenCalledWith();
      expect(result).toEqual(docs);
    });
  });

  describe("getItemByUniqueId", () => {
    it("calls findOne with uniqueId and returns doc", async () => {
      const doc = { uniqueId: "u1", name: "Item" };
      mockFindOne.mockResolvedValue(doc);

      const result = await getItemByUniqueId("u1");

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(result).toEqual(doc);
    });

    it("returns null when not found", async () => {
      mockFindOne.mockResolvedValue(null);

      const result = await getItemByUniqueId("missing");

      expect(result).toBeNull();
    });
  });

  describe("updateItemByUniqueId", () => {
    it("calls findOneAndUpdate and returns updated doc", async () => {
      const updated = { uniqueId: "u1", name: "Updated" };
      mockFindOneAndUpdate.mockResolvedValue(updated);

      const result = await updateItemByUniqueId("u1", { name: "Updated" });

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { uniqueId: "u1" },
        { name: "Updated" },
        { new: true }
      );
      expect(result).toEqual(updated);
    });
  });

  describe("deleteItemById", () => {
    it("calls findByIdAndDelete and returns deleted doc", async () => {
      const deleted = { _id: "id1", uniqueId: "u1" };
      mockFindByIdAndDelete.mockResolvedValue(deleted);

      const result = await deleteItemById("id1");

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith("id1");
      expect(result).toEqual(deleted);
    });
  });
});
