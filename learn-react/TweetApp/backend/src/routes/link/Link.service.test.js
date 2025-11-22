jest.mock("./Link.model", () => ({
  create: jest.fn(),
  find: jest.fn().mockReturnValue({ select: jest.fn().mockResolvedValue([]) }),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndRemove: jest.fn(),
}));

const Link = require("./Link.model");
const {
  createLink,
  getLinks,
  getLinkByUniqueId,
  getLinkChildren,
  getAllAncestors,
  updateLinkByUniqueId,
  deleteLinkByUniqueId,
} = require("./Link.service");

describe("Link.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createLink", () => {
    it("calls Link.create with linkData and returns the created link", async () => {
      const linkData = { name: "My Link", linkType: "EXTERNAL-WEB", linkUrl: "https://x.com" };
      const saved = { ...linkData, uniqueId: "u1", toObject: () => ({ ...linkData, uniqueId: "u1" }) };
      Link.create.mockResolvedValue(saved);

      const result = await createLink(linkData);

      expect(Link.create).toHaveBeenCalledWith(linkData);
      expect(result).toEqual(saved);
    });

    it("throws with error.message when create fails", async () => {
      Link.create.mockRejectedValue(new Error("Validation failed"));

      await expect(createLink({})).rejects.toThrow("Validation failed");
    });
  });

  describe("getLinks", () => {
    it("calls find with root criteria when parentId is null and returns tree", async () => {
      const doc = {
        uniqueId: "r1",
        parentId: null,
        toObject: () => ({ uniqueId: "r1", parentId: null }),
      };
      Link.find
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce([doc]),
        })
        .mockReturnValue({
          select: jest.fn().mockResolvedValue([]),
        });
      Link.findOne.mockResolvedValue(null);

      const result = await getLinks(null, { uniqueId: 1, name: 1, parentId: 1 });

      expect(Link.find).toHaveBeenCalledWith({
        parentId: { $in: [null, undefined, ""] },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("uniqueId", "r1");
      expect(result[0]).toHaveProperty("children");
      expect(result[0]).toHaveProperty("ancestors");
    });

    it("throws Error fetching links when find fails", async () => {
      Link.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(getLinks(null, {})).rejects.toThrow("Error fetching links");
    });
  });

  describe("getLinkByUniqueId", () => {
    it("returns link when found", async () => {
      const link = {
        uniqueId: "u1",
        name: "Link",
        toObject: () => ({ uniqueId: "u1", name: "Link" }),
      };
      Link.findOne.mockResolvedValue(link);

      const result = await getLinkByUniqueId("u1");

      expect(Link.findOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(result).toEqual(link);
    });

    it("throws Link not found when not found", async () => {
      Link.findOne.mockResolvedValue(null);

      await expect(getLinkByUniqueId("missing")).rejects.toThrow("Link not found");
    });
  });

  describe("getLinkChildren", () => {
    it("returns children for parentId", async () => {
      const children = [
        { uniqueId: "c1", name: "Child1", parentId: "p1" },
      ];
      Link.find.mockResolvedValue(children);

      const result = await getLinkChildren("p1");

      expect(Link.find).toHaveBeenCalledWith({ parentId: "p1" });
      expect(result).toEqual(children);
    });

    it("throws Error fetching link children when find fails", async () => {
      Link.find.mockRejectedValue(new Error("DB error"));

      await expect(getLinkChildren("p1")).rejects.toThrow(
        "Error fetching link children"
      );
    });
  });

  describe("getAllAncestors", () => {
    it("returns empty array when parentId is falsy", async () => {
      const result = await getAllAncestors(null);
      expect(result).toEqual([]);
      expect(Link.findOne).not.toHaveBeenCalled();
    });

    it("returns ancestors by walking parentId chain", async () => {
      const parent = {
        uniqueId: "p1",
        name: "Parent",
        parentId: null,
      };
      Link.findOne
        .mockResolvedValueOnce(parent)
        .mockResolvedValueOnce(null);

      const result = await getAllAncestors("p1");

      expect(Link.findOne).toHaveBeenCalledWith({ uniqueId: "p1" });
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        name: "Parent",
        uniqueId: "p1",
        parentId: null,
      });
    });
  });

  describe("updateLinkByUniqueId", () => {
    it("calls findOneAndUpdate and returns updated link", async () => {
      const updated = {
        uniqueId: "u1",
        name: "Updated",
        toObject: () => ({ uniqueId: "u1", name: "Updated" }),
      };
      Link.findOneAndUpdate.mockResolvedValue(updated);

      const result = await updateLinkByUniqueId("u1", { name: "Updated" });

      expect(Link.findOneAndUpdate).toHaveBeenCalledWith(
        { uniqueId: "u1" },
        { name: "Updated" },
        { new: true }
      );
      expect(result).toEqual(updated);
    });

    it("throws Link not found when no document matched", async () => {
      Link.findOneAndUpdate.mockResolvedValue(null);

      await expect(
        updateLinkByUniqueId("missing", { name: "X" })
      ).rejects.toThrow("Link not found");
    });
  });

  describe("deleteLinkByUniqueId", () => {
    it("calls findOneAndRemove and returns removed link", async () => {
      const removed = { uniqueId: "u1", name: "Deleted" };
      Link.findOneAndRemove.mockResolvedValue(removed);

      const result = await deleteLinkByUniqueId("u1");

      expect(Link.findOneAndRemove).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(result).toEqual(removed);
    });

    it("throws Link not found when no document matched", async () => {
      Link.findOneAndRemove.mockResolvedValue(null);

      await expect(deleteLinkByUniqueId("missing")).rejects.toThrow(
        "Link not found"
      );
    });
  });
});
