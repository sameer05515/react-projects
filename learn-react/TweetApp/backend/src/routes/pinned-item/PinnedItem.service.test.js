// PinnedItem.service.test.js
const PinnedItem = require("./PinnedItem.model");
const {
  upsertPinnedItem,
  getAllPinnedItemsByType,
  getAllPinnedItems,
} = require("./PinnedItem.service");

jest.mock("./PinnedItem.model", () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
}));

describe("PinnedItem.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("upsertPinnedItem", () => {
    it("creates new pinned item when findOne returns null", async () => {
      const body = {
        linkedUniqueId: "topic-1",
        linkedItemType: "topic",
        softDelete: false,
      };
      PinnedItem.findOne.mockResolvedValue(null);
      const created = { uniqueId: "pi-1", ...body };
      PinnedItem.create.mockResolvedValue(created);

      const result = await upsertPinnedItem(body);

      expect(PinnedItem.findOne).toHaveBeenCalledWith({
        linkedUniqueId: "topic-1",
        linkedItemType: "topic",
      });
      expect(PinnedItem.create).toHaveBeenCalled();
      expect(result).toEqual(created);
    });

    it("updates existing pinned item when findOne returns doc", async () => {
      const body = {
        linkedUniqueId: "topic-1",
        linkedItemType: "topic",
        softDelete: true,
      };
      const existing = {
        uniqueId: "pi-1",
        linkedUniqueId: "topic-1",
        linkedItemType: "topic",
        softDelete: false,
        save: jest.fn().mockResolvedValue(undefined),
      };
      PinnedItem.findOne.mockResolvedValue(existing);
      existing.save.mockResolvedValue({ ...existing, ...body });

      const result = await upsertPinnedItem(body);

      expect(PinnedItem.findOne).toHaveBeenCalledWith({
        linkedUniqueId: "topic-1",
        linkedItemType: "topic",
      });
      expect(existing.softDelete).toBe(true);
      expect(existing.save).toHaveBeenCalled();
    });

    it("throws when create fails", async () => {
      PinnedItem.findOne.mockResolvedValue(null);
      PinnedItem.create.mockRejectedValue(new Error("Validation failed"));

      await expect(
        upsertPinnedItem({ linkedUniqueId: "x", linkedItemType: "topic" })
      ).rejects.toThrow("Validation failed");
    });
  });

  describe("getAllPinnedItemsByType", () => {
    it("returns items from find with criteria", async () => {
      const items = [{ uniqueId: "pi-1", linkedItemType: "topic" }];
      PinnedItem.find.mockResolvedValue(items);

      const result = await getAllPinnedItemsByType("topic");

      expect(PinnedItem.find).toHaveBeenCalledWith({
        linkedItemType: "topic",
        softDelete: false,
      });
      expect(result).toEqual(items);
    });
  });

  describe("getAllPinnedItems", () => {
    it("returns all non-deleted items", async () => {
      const items = [{ uniqueId: "pi-1" }];
      PinnedItem.find.mockResolvedValue(items);

      const result = await getAllPinnedItems();

      expect(PinnedItem.find).toHaveBeenCalledWith({ softDelete: false });
      expect(result).toEqual(items);
    });
  });
});
