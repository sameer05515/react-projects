const mockCreate = jest.fn();
const mockFindOne = jest.fn();
const mockFind = jest.fn();
const mockUpdateMany = jest.fn();

const mockSectionFind = jest.fn();
const mockSectionFindOne = jest.fn();
const mockSectionCreate = jest.fn();

jest.mock("./Topic.model", () => ({
  Topic: {
    create: mockCreate,
    findOne: mockFindOne,
    find: mockFind,
    updateMany: mockUpdateMany,
  },
  TopicSection: {
    find: mockSectionFind,
    findOne: mockSectionFindOne,
    create: mockSectionCreate,
  },
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "fixed-uuid"),
}));

jest.mock("../../redis/redisClient", () => ({
  getRedisClient: jest.fn(() => null),
}));

const {
  createTopic,
  createTopicsBulk,
  updateTopicByUniqueId,
  publishTopicByUniqueId,
  getAllTopics,
  getTopicByUniqueId,
  searchTopics,
  createTopicSection,
  getAllTopicSectionsById,
  getTopicSectionsById,
  updateTopicSectionsById,
  getTopicsByTagId,
  getTopicSectionsByTagId,
} = require("./Topic.service");

describe("Topic.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.log.mockRestore();
  });

  describe("createTopicsBulk", () => {
    it("returns empty created and errors when payload is not a non-empty array", async () => {
      await expect(createTopicsBulk(null)).resolves.toEqual({
        created: [],
        errors: [],
      });
      await expect(createTopicsBulk([])).resolves.toEqual({
        created: [],
        errors: [],
      });
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it("creates topics and collects per-row validation errors for empty name", async () => {
      mockCreate
        .mockResolvedValueOnce({
          uniqueId: "u1",
          name: "Ok",
          toObject: () => ({ uniqueId: "u1", name: "Ok" }),
        })
        .mockResolvedValueOnce({
          uniqueId: "u2",
          name: "Second",
          toObject: () => ({ uniqueId: "u2", name: "Second" }),
        });

      const result = await createTopicsBulk([
        { name: "  Ok  ", parentId: "p1", tags: ["t1"] },
        { name: "   ", parentId: "" },
        { name: "Second", description: "d" },
      ]);

      expect(mockCreate).toHaveBeenCalledTimes(2);
      expect(result.created).toHaveLength(2);
      expect(result.errors).toEqual([{ index: 1, message: "Name is required" }]);
    });

    it("records error when Topic.create throws for a row", async () => {
      mockCreate.mockRejectedValueOnce(new Error("duplicate key"));

      const result = await createTopicsBulk([{ name: "Dup" }]);

      expect(result.created).toHaveLength(0);
      expect(result.errors).toEqual([
        { index: 0, message: "duplicate key" },
      ]);
    });
  });

  describe("createTopic", () => {
    it("calls Topic.create with data and returns created topic", async () => {
      const data = { name: "T1", parentId: "", tags: [] };
      const created = { uniqueId: "u1", ...data };
      mockCreate.mockResolvedValue(created);

      const result = await createTopic(data);

      expect(mockCreate).toHaveBeenCalledWith(data);
      expect(result).toEqual(created);
    });

    it("throws when Topic.create fails", async () => {
      mockCreate.mockRejectedValue(new Error("Validation failed"));

      await expect(createTopic({})).rejects.toThrow("Validation failed");
    });
  });

  describe("updateTopicByUniqueId", () => {
    it("finds by uniqueId, updates fields, saves and updateMany children, returns topic", async () => {
      const existing = {
        uniqueId: "u1",
        name: "Old",
        parentId: null,
        save: jest.fn().mockResolvedValue({ uniqueId: "u1", name: "New" }),
      };
      mockFindOne.mockResolvedValue(existing);
      mockUpdateMany.mockResolvedValue({ nModified: 0 });

      const result = await updateTopicByUniqueId("u1", {
        name: "New",
        children: ["c1"],
      });

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(existing.save).toHaveBeenCalled();
      expect(mockUpdateMany).toHaveBeenCalledWith(
        { uniqueId: { $in: ["c1"] } },
        { parentId: "u1" }
      );
      expect(result.name).toBe("New");
    });

    it("throws Task not found when findOne returns null", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(
        updateTopicByUniqueId("missing", { name: "X" })
      ).rejects.toThrow("Task not found");
    });

    it("throws when body contains published: true (must use publish endpoint)", async () => {
      const existing = {
        uniqueId: "u1",
        name: "T1",
        parentId: null,
        save: jest.fn(),
      };
      mockFindOne.mockResolvedValue(existing);

      await expect(
        updateTopicByUniqueId("u1", { published: true })
      ).rejects.toThrow("Use PUT /:uniqueId/publish to publish");
    });
  });

  describe("publishTopicByUniqueId", () => {
    it("returns topic as-is when already published", async () => {
      const topic = {
        uniqueId: "u1",
        name: "T1",
        parentId: null,
        published: true,
        save: jest.fn(),
      };
      mockFindOne.mockResolvedValue(topic);

      const result = await publishTopicByUniqueId("u1");

      expect(result).toBe(topic);
      expect(topic.save).not.toHaveBeenCalled();
    });

    it("publishes topic when all ancestors are published", async () => {
      const topic = {
        uniqueId: "u1",
        name: "T1",
        parentId: null,
        published: false,
        save: jest.fn().mockResolvedValue(undefined),
      };
      mockFindOne
        .mockResolvedValueOnce(topic) // find topic
        .mockResolvedValue(null); // areAllAncestorsPublished: no parent

      const result = await publishTopicByUniqueId("u1");

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(topic.published).toBe(true);
      expect(topic.save).toHaveBeenCalled();
    });

    it("throws when topic not found", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(publishTopicByUniqueId("missing")).rejects.toThrow(
        "Topic not found"
      );
    });

    it("throws when parent is not published", async () => {
      const topic = {
        uniqueId: "u1",
        name: "Child",
        parentId: "p1",
        published: false,
        save: jest.fn(),
      };
      const parent = { uniqueId: "p1", parentId: null, published: false };
      mockFindOne
        .mockResolvedValueOnce(topic)
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValue(parent),
        });

      await expect(publishTopicByUniqueId("u1")).rejects.toThrow(
        "Cannot publish: parent or an ancestor topic is not published"
      );
      expect(topic.save).not.toHaveBeenCalled();
    });
  });

  describe("getAllTopics", () => {
    it("calls getTopics and returns tree", async () => {
      const doc = {
        uniqueId: "r1",
        parentId: "",
        name: "Root",
        tags: [],
        toObject: () => ({ uniqueId: "r1", parentId: "", name: "Root", tags: [] }),
      };
      mockFind
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce([doc]),
        })
        .mockReturnValue({
          select: jest.fn().mockResolvedValue([]),
        });
      mockFindOne.mockResolvedValue(null);

      const result = await getAllTopics();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("uniqueId", "r1");
      expect(result[0]).toHaveProperty("children");
      expect(result[0]).toHaveProperty("ancestors");
    });

    it("returns empty array when getTopics (find) fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await getAllTopics();

      expect(result).toEqual([]);
    });
  });

  describe("getTopicByUniqueId", () => {
    it("returns DTO with topic, children, sections, ancestors when found", async () => {
      const topic = {
        uniqueId: "u1",
        name: "Topic",
        parentId: "",
        tags: [],
        toObject: () => ({ uniqueId: "u1", name: "Topic", parentId: "", tags: [] }),
      };
      const sections = [
        {
          uniqueId: "s1",
          name: "Sec1",
          linkedTopicUniqueId: "u1",
          order: 1,
          toObject: () => ({}),
        },
      ];
      mockFindOne.mockResolvedValueOnce(topic);
      mockSectionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(sections),
      });
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await getTopicByUniqueId("u1");

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(mockSectionFind).toHaveBeenCalledWith({
        linkedTopicUniqueId: "u1",
      });
      expect(result).toHaveProperty("uniqueId", "u1");
      expect(result).toHaveProperty("children");
      expect(result).toHaveProperty("sections");
      expect(result).toHaveProperty("ancestors");
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0]).toMatchObject({
        uniqueId: "s1",
        name: "Sec1",
        linkedTopicUniqueId: "u1",
        order: 1,
      });
    });

    it("throws Topic not found when findOne returns null", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(getTopicByUniqueId("missing")).rejects.toThrow(
        "Topic not found"
      );
    });
  });

  describe("searchTopics", () => {
    it("calls find with regex criteria and returns results", async () => {
      const docs = [{ uniqueId: "u1", name: "Test Topic" }];
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await searchTopics("test");

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

    it("adds description to criteria when searchOptions.description is set", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      await searchTopics("x", { description: 1 });

      expect(mockFind).toHaveBeenCalledWith(
        expect.objectContaining({
          $or: expect.arrayContaining([
            expect.objectContaining({ description: expect.objectContaining({ $regex: expect.any(RegExp) }) }),
          ]),
        })
      );
    });
  });

  describe("createTopicSection", () => {
    it("creates section with uuid and returns newTopicSection", async () => {
      mockSectionCreate.mockResolvedValue(undefined);

      const sectionData = {
        linkedTopicUniqueId: "t1",
        name: "Section",
        smartContent: {},
        order: 1,
        tags: [],
      };

      const result = await createTopicSection(sectionData);

      expect(result).toMatchObject({
        uniqueId: "fixed-uuid",
        linkedTopicUniqueId: "t1",
        name: "Section",
        order: 1,
      });
      expect(mockSectionCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          uniqueId: "fixed-uuid",
          linkedTopicUniqueId: "t1",
          name: "Section",
          smartContent: {},
          order: 1,
          tags: [],
        })
      );
    });

    it("uses order 9999 when order not a number", async () => {
      mockSectionCreate.mockResolvedValue(undefined);

      await createTopicSection({
        linkedTopicUniqueId: "t1",
        name: "S",
        smartContent: {},
        tags: [],
      });

      expect(mockSectionCreate).toHaveBeenCalledWith(
        expect.objectContaining({ order: 9999 })
      );
    });
  });

  describe("getAllTopicSectionsById", () => {
    it("calls TopicSection.find with linkedTopicUniqueId and returns sections", async () => {
      const sections = [{ uniqueId: "s1", name: "S1" }];
      mockSectionFind.mockResolvedValue(sections);

      const result = await getAllTopicSectionsById("t1");

      expect(mockSectionFind).toHaveBeenCalledWith({
        linkedTopicUniqueId: "t1",
      });
      expect(result).toEqual(sections);
    });
  });

  describe("getTopicSectionsById", () => {
    it("returns section when found", async () => {
      const section = { uniqueId: "s1", linkedTopicUniqueId: "t1", name: "S1" };
      mockSectionFindOne.mockResolvedValue(section);

      const result = await getTopicSectionsById("t1", "s1");

      expect(mockSectionFindOne).toHaveBeenCalledWith({
        linkedTopicUniqueId: "t1",
        uniqueId: "s1",
      });
      expect(result).toEqual(section);
    });

    it("throws TopicSection not found when findOne returns null", async () => {
      mockSectionFindOne.mockResolvedValue(null);

      await expect(getTopicSectionsById("t1", "missing")).rejects.toThrow(
        "TopicSection not found"
      );
    });
  });

  describe("updateTopicSectionsById", () => {
    it("finds section, updates fields, saves and returns", async () => {
      const existing = {
        uniqueId: "s1",
        name: "Old",
        save: jest.fn().mockResolvedValue({ uniqueId: "s1", name: "New" }),
      };
      mockSectionFindOne.mockResolvedValue(existing);

      const result = await updateTopicSectionsById("t1", "s1", {
        linkedTopicUniqueId: "t1",
        name: "New",
      });

      expect(mockSectionFindOne).toHaveBeenCalledWith({
        linkedTopicUniqueId: "t1",
        uniqueId: "s1",
      });
      expect(existing.save).toHaveBeenCalled();
      expect(result.name).toBe("New");
    });

    it("throws TopicSection not found when findOne returns null", async () => {
      mockSectionFindOne.mockResolvedValue(null);

      await expect(
        updateTopicSectionsById("t1", "missing", { name: "X" })
      ).rejects.toThrow("TopicSection not found");
    });
  });

  describe("getTopicsByTagId", () => {
    it("calls Topic.find with tags and returns results", async () => {
      const docs = [{ uniqueId: "u1", name: "T1" }];
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getTopicsByTagId("tag1");

      expect(mockFind).toHaveBeenCalledWith({ tags: "tag1" });
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(getTopicsByTagId("t1")).rejects.toThrow(
        "Error retrieving topics with tagId"
      );
    });
  });

  describe("getTopicSectionsByTagId", () => {
    it("calls TopicSection.find with tags and returns results", async () => {
      const docs = [{ uniqueId: "s1", name: "S1" }];
      mockSectionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getTopicSectionsByTagId("tag1");

      expect(mockSectionFind).toHaveBeenCalledWith({ tags: "tag1" });
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockSectionFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(getTopicSectionsByTagId("t1")).rejects.toThrow(
        "Error retrieving topicSections with tagId"
      );
    });
  });
});
