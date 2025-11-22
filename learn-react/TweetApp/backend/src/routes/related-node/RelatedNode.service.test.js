// RelatedNode.service.test.js
const { RelatedNode } = require("./RelatedNode.model");
const {
  saveRelatedNode,
  updateRelatedNode,
  fetchAllRelatedNodes,
  fetchRelatedNodeByUniqueId,
  updateRelationInConnectedNodes,
} = require("./RelatedNode.service");

jest.mock("./RelatedNode.model", () => ({
  RelatedNode: jest.fn().mockImplementation(function (data) {
    this.uniqueId = data.uniqueId;
    this.name = data.name;
    this.itemType = data.itemType;
    this.softDelete = data.softDelete;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
    this.save = jest.fn();
    return this;
  }),
}));

describe("RelatedNode.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveRelatedNode", () => {
    it("saves new node and returns it", async () => {
      const data = { name: "N1", itemType: "topic" };
      const saved = { uniqueId: "rn-1", ...data, save: jest.fn().mockResolvedValue(undefined) };
      RelatedNode.mockImplementation(() => ({
        ...data,
        save: jest.fn().mockResolvedValue(saved),
      }));

      const result = await saveRelatedNode(data);

      expect(RelatedNode).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("uses provided uniqueId when trimmed non-empty", async () => {
      const data = { uniqueId: "custom-id", name: "N", itemType: "topic" };
      RelatedNode.mockImplementation(function (d) {
        this.save = jest.fn().mockResolvedValue(d);
        return this;
      });

      await saveRelatedNode(data);

      expect(RelatedNode).toHaveBeenCalledWith(
        expect.objectContaining({ uniqueId: "custom-id" })
      );
    });

    it("throws when save fails", async () => {
      RelatedNode.mockImplementation(function () {
        this.save = jest.fn().mockRejectedValue(new Error("DB error"));
        return this;
      });

      await expect(saveRelatedNode({ name: "N", itemType: "topic" })).rejects.toThrow(
        /Error saving RelatedNode/
      );
    });
  });

  describe("updateRelatedNode", () => {
    it("finds node, updates and saves", async () => {
      const existing = {
        uniqueId: "rn-1",
        name: "Old",
        itemType: "topic",
        softDelete: false,
        save: jest.fn().mockResolvedValue(undefined),
      };
      RelatedNode.findOne = jest.fn().mockResolvedValue(existing);
      existing.save.mockResolvedValue({ ...existing, name: "New" });

      const result = await updateRelatedNode("rn-1", { name: "New" });

      expect(RelatedNode.findOne).toHaveBeenCalledWith({ uniqueId: "rn-1" });
      expect(existing.name).toBe("New");
      expect(existing.save).toHaveBeenCalled();
    });

    it("throws when node not found", async () => {
      RelatedNode.findOne = jest.fn().mockResolvedValue(null);

      await expect(updateRelatedNode("missing", { name: "X" })).rejects.toThrow(
        "RelatedNode not found"
      );
    });
  });

  describe("fetchAllRelatedNodes", () => {
    it("returns list from getRelatedNodes", async () => {
      const list = [{ uniqueId: "rn-1", name: "N1" }];
      RelatedNode.find = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(
          list.map((n) => ({ ...n, toObject: () => n }))
        ),
      });

      const result = await fetchAllRelatedNodes();

      expect(RelatedNode.find).toHaveBeenCalledWith({});
      expect(result).toEqual(list);
    });

    it("returns empty array when find fails (getRelatedNodes catches)", async () => {
      RelatedNode.find = jest.fn().mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await fetchAllRelatedNodes();

      expect(result).toEqual([]);
    });
  });

  describe("fetchRelatedNodeByUniqueId", () => {
    it("returns node when found", async () => {
      const node = { uniqueId: "rn-1", name: "N", toObject: () => ({ uniqueId: "rn-1", name: "N" }) };
      RelatedNode.findOne = jest.fn().mockResolvedValue(node);

      const result = await fetchRelatedNodeByUniqueId("rn-1");

      expect(RelatedNode.findOne).toHaveBeenCalledWith({ uniqueId: "rn-1" });
      expect(result).toEqual({ uniqueId: "rn-1", name: "N" });
    });

    it("throws when not found", async () => {
      RelatedNode.findOne = jest.fn().mockResolvedValue(null);

      await expect(fetchRelatedNodeByUniqueId("missing")).rejects.toThrow("RelatedNode not found");
    });
  });

  describe("updateRelationInConnectedNodes", () => {
    it("throws when hasId node not found", async () => {
      RelatedNode.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        updateRelationInConnectedNodes({ hasId: "h1", withId: "w1" })
      ).rejects.toThrow(/hasId: h1 not found/);
    });

    it("throws when withId node not found", async () => {
      RelatedNode.findOne
        .mockResolvedValueOnce({ uniqueId: "h1", relations: [], save: jest.fn() })
        .mockResolvedValueOnce(null);

      await expect(
        updateRelationInConnectedNodes({ hasId: "h1", withId: "w1" })
      ).rejects.toThrow(/withId: w1 not found/);
    });

    it("updates both nodes and returns success", async () => {
      const hasIdNode = {
        uniqueId: "h1",
        relations: [],
        save: jest.fn().mockResolvedValue(undefined),
      };
      const withIdNode = {
        uniqueId: "w1",
        relations: [],
        save: jest.fn().mockResolvedValue(undefined),
      };
      RelatedNode.findOne
        .mockResolvedValueOnce(hasIdNode)
        .mockResolvedValueOnce(withIdNode);

      const result = await updateRelationInConnectedNodes({
        hasId: "h1",
        withId: "w1",
        name: "rel",
        type: "next",
      });

      expect(hasIdNode.relations.length).toBe(1);
      expect(withIdNode.relations.length).toBe(1);
      expect(hasIdNode.save).toHaveBeenCalled();
      expect(withIdNode.save).toHaveBeenCalled();
      expect(result).toEqual({ message: "Successfully updated relations" });
    });
  });
});
