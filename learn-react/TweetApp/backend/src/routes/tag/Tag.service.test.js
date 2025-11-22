// Tag.service.test.js
const Tag = require("./Tag.model");
const {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  getTagsCountByDate,
  deleteTagById,
} = require("./Tag.service");

jest.mock("./Tag.model", () => {
  const fn = jest.fn();
  fn.findOne = jest.fn();
  fn.find = jest.fn();
  fn.updateMany = jest.fn();
  fn.aggregate = jest.fn();
  fn.findOneAndRemove = jest.fn();
  return fn;
});

jest.mock("../topic/Topic.service", () => ({
  getTopicsByTagId: jest.fn(),
  getTopicSectionsByTagId: jest.fn(),
}));
jest.mock("../task/Task.service", () => ({
  getTasksByTagId: jest.fn(),
}));
jest.mock("../interview-mgmt/InterviewMgmt.v2.service", () => ({
  getQuestionsByTagId: jest.fn(),
}));

const TopicService = require("../topic/Topic.service");
const TaskService = require("../task/Task.service");
const InterviewMgmtService = require("../interview-mgmt/InterviewMgmt.v2.service");

describe("Tag.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore?.();
  });

  describe("createTag", () => {
    it("creates tag and saves", async () => {
      const data = { name: "T1", parentId: "" };
      const instance = { save: jest.fn().mockResolvedValue(undefined) };
      Tag.mockImplementation(() => ({ ...data, ...instance }));

      const result = await createTag(data);

      expect(Tag).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "T1",
          parentId: "",
          smartContent: null,
        })
      );
      expect(result.save).toHaveBeenCalled();
      expect(result).toMatchObject({ name: "T1", parentId: "" });
    });

    it("throws when save fails", async () => {
      const instance = { save: jest.fn().mockRejectedValue(new Error("Validation failed")) };
      Tag.mockImplementation(() => instance);

      await expect(createTag({ name: "T1" })).rejects.toThrow("Validation failed");
    });
  });

  describe("getAllTags", () => {
    it("returns tree from getTags", async () => {
      const rootTags = [
        {
          uniqueId: "tag-1",
          name: "T1",
          parentId: "",
          toObject: function () {
            return { uniqueId: this.uniqueId, name: this.name, parentId: this.parentId };
          },
        },
      ];
      Tag.find
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce(rootTags),
        })
        .mockReturnValue({
          select: jest.fn().mockResolvedValue([]),
        });

      const result = await getAllTags();

      expect(Tag.find).toHaveBeenCalledWith({
        parentId: { $in: [null, undefined, ""] },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ uniqueId: "tag-1", name: "T1" });
    });

    it("returns empty array when getTags (find) fails", async () => {
      Tag.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await getAllTags();

      expect(result).toEqual([]);
    });
  });

  describe("getTagById", () => {
    it("returns DTO when tag found", async () => {
      const tag = {
        uniqueId: "tag-1",
        name: "T1",
        parentId: "",
        toObject: () => ({ uniqueId: "tag-1", name: "T1", parentId: "" }),
      };
      Tag.findOne
        .mockResolvedValueOnce(tag)
        .mockResolvedValue(null);
      Tag.find.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });
      TopicService.getTopicsByTagId.mockResolvedValue([]);
      TaskService.getTasksByTagId.mockResolvedValue([]);
      InterviewMgmtService.getQuestionsByTagId.mockResolvedValue([]);
      TopicService.getTopicSectionsByTagId.mockResolvedValue([]);

      const result = await getTagById("tag-1");

      expect(result).toMatchObject({
        uniqueId: "tag-1",
        name: "T1",
        children: [],
        ancestors: [],
        linkedTopics: [],
        linkedTopicSections: [],
        linkedTasks: [],
        linkedQuestions: [],
      });
    });

    it("returns null when tag not found", async () => {
      Tag.findOne.mockResolvedValue(null);

      const result = await getTagById("missing");

      expect(result).toBeNull();
    });
  });

  describe("updateTagById", () => {
    it("finds tag, updates and saves", async () => {
      const existing = {
        uniqueId: "tag-1",
        name: "Old",
        parentId: "",
        save: jest.fn().mockResolvedValue(undefined),
      };
      Tag.findOne.mockResolvedValue(existing);
      Tag.updateMany.mockResolvedValue({ nModified: 0 });
      existing.save.mockResolvedValue({ ...existing, name: "New" });

      const result = await updateTagById("tag-1", { name: "New" });

      expect(existing.name).toBe("New");
      expect(existing.save).toHaveBeenCalled();
      expect(Tag.updateMany).toHaveBeenCalledWith(
        { uniqueId: { $in: [] } },
        { parentId: "tag-1" }
      );
      expect(result).toBeDefined();
    });

    it("throws when tag not found", async () => {
      Tag.findOne.mockResolvedValue(null);

      await expect(updateTagById("missing", { name: "X" })).rejects.toThrow("Task not found");
    });
  });

  describe("getTagsCountByDate", () => {
    it("returns aggregate result", async () => {
      const agg = [{ _id: "2024-01-01", count: 5 }];
      Tag.aggregate.mockResolvedValue(agg);

      const result = await getTagsCountByDate();

      expect(Tag.aggregate).toHaveBeenCalled();
      expect(result).toEqual(agg);
    });

    it("throws when aggregate fails", async () => {
      Tag.aggregate.mockRejectedValue(new Error("DB error"));

      await expect(getTagsCountByDate()).rejects.toThrow(
        /Failed to get tags count by date/
      );
    });
  });

  describe("deleteTagById", () => {
    it("returns result of findOneAndRemove", async () => {
      const removed = { uniqueId: "tag-1", name: "T1" };
      Tag.findOneAndRemove.mockResolvedValue(removed);

      const result = await deleteTagById("tag-1");

      expect(Tag.findOneAndRemove).toHaveBeenCalledWith({ uniqueId: "tag-1" });
      expect(result).toEqual(removed);
    });
  });
});
