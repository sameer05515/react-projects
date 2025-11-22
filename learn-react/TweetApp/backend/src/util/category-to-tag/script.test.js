jest.mock("../../routes/interview-mgmt/InterviewMgmt.v2.model", () => ({
  Category: { find: jest.fn() },
  Question: { find: jest.fn() },
}));
jest.mock("../../routes/tag/Tag.model", () => {
  const fn = jest.fn(function (data) {
    return {
      ...data,
      uniqueId: data.uniqueId || "tag-1",
      save: jest.fn().mockResolvedValue({ uniqueId: data.uniqueId || "tag-1" }),
    };
  });
  return fn;
});

const { Category, Question } = require("../../routes/interview-mgmt/InterviewMgmt.v2.model");
const Tag = require("../../routes/tag/Tag.model");
const {
  createTagsForCategories,
  mapTagsToCategories,
  updateTagsInQuestions,
  verifyTagUpdates,
} = require("./script");

describe("category-to-tag script", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTagsForCategories", () => {
    it("creates a tag per category and returns mapping", async () => {
      const categories = [
        { uniqueId: "c1", name: "Cat1", smartContent: {} },
        { uniqueId: "c2", name: "Cat2", smartContent: null },
      ];
      Category.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(categories) });
      let callCount = 0;
      Tag.mockImplementation(function (data) {
        callCount += 1;
        const id = `tag-${callCount}`;
        return {
          ...data,
          uniqueId: id,
          save: jest.fn().mockResolvedValue({ uniqueId: id }),
        };
      });

      const mapping = await createTagsForCategories();

      expect(Category.find).toHaveBeenCalledWith();
      expect(Tag).toHaveBeenCalledTimes(2);
      expect(mapping.c1).toBe("tag-1");
      expect(mapping.c2).toBe("tag-2");
    });
  });

  describe("mapTagsToCategories", () => {
    it("returns result of createTagsForCategories", async () => {
      Category.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ uniqueId: "c1", name: "C", smartContent: null }]),
      });
      Tag.mockImplementation(function () {
        return {
          uniqueId: "tag-1",
          save: jest.fn().mockResolvedValue({ uniqueId: "tag-1" }),
        };
      });

      const result = await mapTagsToCategories();

      expect(result).toEqual({ c1: "tag-1" });
    });
  });

  describe("updateTagsInQuestions", () => {
    it("updates question tags from mapping and saves", async () => {
      const tagCategoryMapping = { cat1: "tag-1" };
      const q1 = { uniqueId: "q1", linkedCategoryId: "cat1", tags: [], save: jest.fn().mockResolvedValue(undefined) };
      const q2 = { uniqueId: "q2", linkedCategoryId: "other", tags: [], save: jest.fn().mockResolvedValue(undefined) };
      Question.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([q1, q2]) });

      await updateTagsInQuestions(tagCategoryMapping);

      expect(q1.tags).toEqual(["tag-1"]);
      expect(q1.save).toHaveBeenCalled();
      expect(q2.tags).toEqual([]);
      expect(q2.save).not.toHaveBeenCalled();
    });
  });

  describe("verifyTagUpdates", () => {
    it("logs all updated when every question has tags", async () => {
      Question.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { uniqueId: "q1", tags: ["tag-1"] },
          { uniqueId: "q2", tags: ["tag-2"] },
        ]),
      });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await verifyTagUpdates();

      expect(logSpy).toHaveBeenCalledWith("All questions have been updated with tags.");
      logSpy.mockRestore();
    });

    it("logs missing when some questions have no tags", async () => {
      Question.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { uniqueId: "q1", tags: ["tag-1"] },
          { uniqueId: "q2", tags: [] },
        ]),
      });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await verifyTagUpdates();

      expect(logSpy).toHaveBeenCalledWith("Question with ID q2 has no tags.");
      expect(logSpy).toHaveBeenCalledWith("Some questions are missing tags.");
      logSpy.mockRestore();
    });
  });
});
