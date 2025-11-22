jest.mock("./OrderInfo.model", () => ({
  findOneAndUpdate: jest.fn(),
  find: jest.fn(),
}));

const OrderInfo = require("./OrderInfo.model");
const { upsertOrderInfo, findByReferenceId } = require("./OrderInfo.service");

describe("OrderInfo.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("upsertOrderInfo", () => {
    it("calls findOneAndUpdate with referenceId, itemType, $set orderedItemIds, upsert and new true", async () => {
      const doc = {
        referenceId: "ref1",
        itemType: "Category",
        orderedItemIds: ["id1", "id2"],
      };
      OrderInfo.findOneAndUpdate.mockResolvedValue(doc);

      const result = await upsertOrderInfo("ref1", "Category", ["id1", "id2"]);

      expect(OrderInfo.findOneAndUpdate).toHaveBeenCalledWith(
        { referenceId: "ref1", itemType: "Category" },
        { $set: { orderedItemIds: ["id1", "id2"] } },
        { upsert: true, new: true }
      );
      expect(result).toEqual(doc);
    });

    it("throws when findOneAndUpdate fails", async () => {
      OrderInfo.findOneAndUpdate.mockRejectedValue(new Error("DB error"));

      await expect(
        upsertOrderInfo("ref1", "Question", ["a", "b"])
      ).rejects.toThrow("DB error");
    });
  });

  describe("findByReferenceId", () => {
    it("calls find with referenceId and returns result", async () => {
      const docs = [
        { referenceId: "ref1", itemType: "Category", orderedItemIds: [] },
      ];
      OrderInfo.find.mockReturnValue({ lean: undefined });
      OrderInfo.find.mockResolvedValue(docs);

      const result = await findByReferenceId("ref1");

      expect(OrderInfo.find).toHaveBeenCalledWith({ referenceId: "ref1" });
      expect(result).toEqual(docs);
    });

    it("returns empty array when no order info exists", async () => {
      OrderInfo.find.mockResolvedValue([]);

      const result = await findByReferenceId("missing");

      expect(result).toEqual([]);
    });

    it("throws when find fails", async () => {
      OrderInfo.find.mockRejectedValue(new Error("DB error"));

      await expect(findByReferenceId("ref1")).rejects.toThrow("DB error");
    });
  });
});
