const mockSave = jest.fn();
const mockFindOne = jest.fn();
const mockFind = jest.fn();

jest.mock("./MemoryMap.model", () => {
  function MockMemoryMap(data) {
    this._data = data;
    this.save = mockSave;
    this.uniqueId = data?.uniqueId;
    this.parentId = data?.parentId;
    this.name = data?.name;
    this.details = data?.details;
    this.references = data?.references;
    this.softDelete = data?.softDelete;
    this.skeleton = data?.skeleton;
    this.updatedDate = data?.updatedDate;
    this.toObject = () => ({ ...this._data, uniqueId: this.uniqueId });
    return this;
  }
  MockMemoryMap.find = mockFind;
  MockMemoryMap.findOne = mockFindOne;
  return { MemoryMap: MockMemoryMap };
});

const {
  saveMemoryMap,
  updateMemoryMap,
  updateMemoryMapForGivenSkeleton,
  fetchAllMemoryMaps,
  fetchMemoryMapByUniqueId,
  searchMemoryMaps,
  getMemoryMapsByTagId,
} = require("./MemoryMap.service");
const { MemoryMap } = require("./MemoryMap.model");

describe("MemoryMap.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("saveMemoryMap", () => {
    it("creates new MemoryMap with data and saves, returns saved doc", async () => {
      const data = {
        name: "My Map",
        parentId: "p1",
        details: [{ uniqueId: "d1", smartContent: {} }],
        references: [],
      };
      mockSave.mockResolvedValue(undefined);

      const result = await saveMemoryMap(data);

      expect(mockSave).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.name).toBe("My Map");
      expect(result.parentId).toBe("p1");
      expect(result.uniqueId).toBeDefined();
      expect(result.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ uniqueId: "d1", smartContent: {} }),
        ])
      );
    });

    it("throws Error saving MemoryMap when save fails", async () => {
      mockSave.mockRejectedValue(new Error("Validation failed"));

      await expect(saveMemoryMap({ name: "X" })).rejects.toThrow(
        "Error saving MemoryMap"
      );
    });
  });

  describe("updateMemoryMap", () => {
    it("finds by uniqueId, updates fields, saves and returns", async () => {
      const existing = {
        uniqueId: "u1",
        name: "Old",
        parentId: null,
        details: [],
        references: [],
        save: jest.fn().mockImplementation(function () {
          this.name = "New";
          return Promise.resolve(this);
        }),
        toObject: () => ({ uniqueId: "u1", name: "New" }),
      };
      mockFindOne.mockResolvedValue(existing);

      const result = await updateMemoryMap("u1", { name: "New" });

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(existing.save).toHaveBeenCalled();
      expect(result.name).toBe("New");
    });

    it("throws MemoryMap not found when findOne returns null", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(updateMemoryMap("missing", { name: "X" })).rejects.toThrow(
        "MemoryMap not found"
      );
    });
  });

  describe("updateMemoryMapForGivenSkeleton", () => {
    it("finds by uniqueId, sets skeleton, saves and returns", async () => {
      const existing = {
        uniqueId: "u1",
        skeleton: "",
        save: jest.fn().mockImplementation(function () {
          this.skeleton = "{ nodes: [] }";
          return Promise.resolve(this);
        }),
      };
      mockFindOne.mockResolvedValue(existing);

      const result = await updateMemoryMapForGivenSkeleton("u1", {
        skeleton: "{ nodes: [] }",
      });

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(existing.save).toHaveBeenCalled();
    });

    it("throws MemoryMap not found when findOne returns null", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(
        updateMemoryMapForGivenSkeleton("missing", { skeleton: "x" })
      ).rejects.toThrow("MemoryMap not found");
    });
  });

  describe("fetchAllMemoryMaps", () => {
    it("calls getMemoryMaps and returns tree", async () => {
      const doc = {
        uniqueId: "r1",
        parentId: null,
        name: "Root",
        toObject: () => ({ uniqueId: "r1", parentId: null, name: "Root" }),
      };
      mockFind
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce([doc]),
        })
        .mockReturnValue({
          select: jest.fn().mockResolvedValue([]),
        });
      mockFindOne.mockResolvedValue(null);

      const result = await fetchAllMemoryMaps();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("uniqueId", "r1");
      expect(result[0]).toHaveProperty("children");
      expect(result[0]).toHaveProperty("ancestors");
    });

    it("returns empty array when getMemoryMaps (find) fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await fetchAllMemoryMaps();

      expect(result).toEqual([]);
    });
  });

  describe("fetchMemoryMapByUniqueId", () => {
    it("returns memoryMap.toObject() when found", async () => {
      const doc = {
        uniqueId: "u1",
        name: "Map",
        toObject: () => ({ uniqueId: "u1", name: "Map" }),
      };
      mockFindOne.mockResolvedValue(doc);

      const result = await fetchMemoryMapByUniqueId("u1");

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(result).toEqual({ uniqueId: "u1", name: "Map" });
    });

    it("throws MemoryMap not found when findOne returns null", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(fetchMemoryMapByUniqueId("missing")).rejects.toThrow(
        "MemoryMap not found"
      );
    });
  });

  describe("searchMemoryMaps", () => {
    it("calls find with regex criteria and returns results", async () => {
      const docs = [{ uniqueId: "u1", name: "Test Map" }];
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await searchMemoryMaps("test");

      expect(mockFind).toHaveBeenCalledWith(
        expect.objectContaining({
          $or: expect.arrayContaining([
            expect.objectContaining({
              name: expect.objectContaining({ $regex: expect.any(RegExp) }),
            }),
          ]),
        })
      );
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(searchMemoryMaps("x")).rejects.toThrow(
        "Error searching MemoryMaps"
      );
    });
  });

  describe("getMemoryMapsByTagId", () => {
    it("calls find with tags criteria and returns results", async () => {
      const docs = [{ uniqueId: "u1", name: "Map" }];
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getMemoryMapsByTagId("tag1");

      expect(mockFind).toHaveBeenCalledWith({ tags: "tag1" });
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(getMemoryMapsByTagId("t1")).rejects.toThrow(
        "Error retrieving MemoryMaps with tagId"
      );
    });
  });
});
