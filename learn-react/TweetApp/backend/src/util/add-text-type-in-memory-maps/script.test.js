jest.mock("../../routes/memory-map/MemoryMap.model", () => ({
  MemoryMap: {
    find: jest.fn(),
  },
}));

const { MemoryMap } = require("../../routes/memory-map/MemoryMap.model");
const {
  updateTagsInMemoryMaps,
  verifyTagUpdates,
} = require("./script");

describe("add-text-type-in-memory-maps script", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateTagsInMemoryMaps", () => {
    it("finds all memory maps and sets skeletonTextType then saves", async () => {
      const save = jest.fn().mockResolvedValue(undefined);
      const docs = [
        { uniqueId: "m1", skeletonTextType: null, save },
        { uniqueId: "m2", skeletonTextType: null, save },
      ];
      MemoryMap.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(docs) });

      await updateTagsInMemoryMaps();

      expect(MemoryMap.find).toHaveBeenCalledWith();
      expect(docs[0].skeletonTextType).toBe("indented-string");
      expect(docs[1].skeletonTextType).toBe("indented-string");
      expect(save).toHaveBeenCalledTimes(2);
    });
  });

  describe("verifyTagUpdates", () => {
    it("returns when all have skeletonTextType indented-string", async () => {
      const docs = [
        { uniqueId: "m1", skeletonTextType: "indented-string" },
        { uniqueId: "m2", skeletonTextType: "indented-string" },
      ];
      MemoryMap.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(docs) });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await verifyTagUpdates();

      expect(MemoryMap.find).toHaveBeenCalledWith();
      expect(logSpy).toHaveBeenCalledWith(
        "All memoryMaps have been updated with skeletonTextTypes."
      );
      logSpy.mockRestore();
    });

    it("logs missing when some lack skeletonTextType", async () => {
      const docs = [
        { uniqueId: "m1", skeletonTextType: "indented-string" },
        { uniqueId: "m2", skeletonTextType: null },
      ];
      MemoryMap.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(docs) });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await verifyTagUpdates();

      expect(logSpy).toHaveBeenCalledWith(
        "MemoryMap with ID m2 has no skeletonTextType."
      );
      expect(logSpy).toHaveBeenCalledWith(
        "Some memoryMaps are missing skeletonTextTypes."
      );
      logSpy.mockRestore();
    });
  });
});
