const mockCategorySave = jest.fn();
const mockCategoryFindOne = jest.fn();
const mockCategoryFind = jest.fn();
const mockCategoryUpdateMany = jest.fn();
const mockQuestionFindOne = jest.fn();
const mockQuestionFind = jest.fn();
const mockQuestionSave = jest.fn();
const mockAnswerFindOne = jest.fn();
const mockAnswerFind = jest.fn();
const mockAnswerSave = jest.fn();

jest.mock("./InterviewMgmt.v2.model", () => {
  function MockCategory(data) {
    this.save = mockCategorySave;
    this.uniqueId = data?.uniqueId || "cat-1";
    this.name = data?.name;
    this.parentId = data?.parentId;
    this.toObject = () => ({ ...data, uniqueId: this.uniqueId });
    return this;
  }
  function MockQuestion(data) {
    this.save = mockQuestionSave;
    this.uniqueId = data?.uniqueId || "q-1";
    this.toObject = () => ({ ...data, uniqueId: this.uniqueId });
    return this;
  }
  function MockAnswer(data) {
    this.save = mockAnswerSave;
    this.uniqueId = data?.uniqueId || "a-1";
    this.toObject = () => ({ ...data, uniqueId: this.uniqueId });
    return this;
  }
  MockCategory.findOne = mockCategoryFindOne;
  MockCategory.find = mockCategoryFind;
  MockCategory.updateMany = mockCategoryUpdateMany;
  MockQuestion.findOne = mockQuestionFindOne;
  MockQuestion.find = mockQuestionFind;
  MockAnswer.findOne = mockAnswerFindOne;
  MockAnswer.find = mockAnswerFind;
  return {
    Category: MockCategory,
    Question: MockQuestion,
    Answer: MockAnswer,
  };
});

const interviewMgmtV2Service = require("./InterviewMgmt.v2.service");

describe("InterviewMgmt.v2.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("createCategory", () => {
    it("creates category and saves, returns category", async () => {
      mockCategorySave.mockResolvedValue(undefined);
      const data = { name: "Cat", heading: "H", parentId: "", tags: [] };

      const result = await interviewMgmtV2Service.createCategory(data);

      expect(mockCategorySave).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.name).toBe("Cat");
    });

    it("throws when save fails", async () => {
      mockCategorySave.mockRejectedValue(new Error("Validation failed"));

      await expect(
        interviewMgmtV2Service.createCategory({ name: "Cat", tags: [] })
      ).rejects.toThrow("Validation failed");
    });
  });

  describe("getAllCategories", () => {
    it("returns tree from getCategories", async () => {
      const doc = {
        uniqueId: "c1",
        parentId: "",
        name: "Root",
        toObject: () => ({ uniqueId: "c1", parentId: "", name: "Root" }),
      };
      mockCategoryFind
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce([doc]),
        })
        .mockReturnValue({ select: jest.fn().mockResolvedValue([]) });
      mockCategoryFindOne.mockResolvedValue(null);
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await interviewMgmtV2Service.getAllCategories();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("uniqueId", "c1");
      expect(result[0]).toHaveProperty("children");
      expect(result[0]).toHaveProperty("questions");
    });

    it("returns empty array when getCategories (find) fails", async () => {
      mockCategoryFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await interviewMgmtV2Service.getAllCategories();

      expect(result).toEqual([]);
    });
  });

  describe("getCategoryByUniqueId", () => {
    it("returns DTO with category, children, ancestors, questions", async () => {
      const category = {
        uniqueId: "c1",
        name: "Cat",
        parentId: "",
        toObject: () => ({ uniqueId: "c1", name: "Cat", parentId: "" }),
      };
      mockCategoryFindOne.mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce(category),
      });
      mockCategoryFind.mockResolvedValueOnce([{ title: "Child", uniqueId: "c2" }]);
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });
      mockCategoryFindOne.mockResolvedValue(null);

      const result = await interviewMgmtV2Service.getCategoryByUniqueId("c1");

      expect(result).toHaveProperty("uniqueId", "c1");
      expect(result).toHaveProperty("children");
      expect(result.children[0]).toMatchObject({ title: "Child", uniqueId: "c2" });
      expect(result).toHaveProperty("ancestors");
      expect(result).toHaveProperty("questions");
    });

    it("returns empty ancestors when getAllAncestors throws", async () => {
      const category = {
        uniqueId: "c1",
        name: "Cat",
        parentId: "p1",
        toObject: () => ({ uniqueId: "c1", name: "Cat", parentId: "p1" }),
      };
      mockCategoryFindOne
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce(category),
        })
        .mockRejectedValueOnce(new Error("ancestor error"));
      mockCategoryFind.mockResolvedValueOnce([]);
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await interviewMgmtV2Service.getCategoryByUniqueId("c1");

      expect(result.ancestors).toEqual([]);
    });

    it("throws when category not found", async () => {
      mockCategoryFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(
        interviewMgmtV2Service.getCategoryByUniqueId("missing")
      ).rejects.toThrow();
    });
  });

  describe("updateCategoryByUniqueId", () => {
    it("finds category, updates fields, save and updateMany children, returns category", async () => {
      const existing = {
        uniqueId: "c1",
        name: "Old",
        parentId: "",
        save: jest.fn().mockResolvedValue({ uniqueId: "c1", name: "New" }),
      };
      mockCategoryFindOne.mockResolvedValue(existing);
      mockCategoryUpdateMany.mockResolvedValue({ nModified: 1 });

      const result = await interviewMgmtV2Service.updateCategoryByUniqueId("c1", {
        name: "New",
        children: ["c2"],
      });

      expect(mockCategoryFindOne).toHaveBeenCalledWith({ uniqueId: "c1" });
      expect(existing.save).toHaveBeenCalled();
      expect(mockCategoryUpdateMany).toHaveBeenCalledWith(
        { uniqueId: { $in: ["c2"] } },
        { parentId: "c1" }
      );
      expect(result.name).toBe("New");
    });

    it("throws Task not found when findOne returns null", async () => {
      mockCategoryFindOne.mockResolvedValue(null);

      await expect(
        interviewMgmtV2Service.updateCategoryByUniqueId("missing", { name: "X" })
      ).rejects.toThrow("Task not found");
    });
  });

  describe("createQuestion", () => {
    it("creates question and saves", async () => {
      mockQuestionSave.mockResolvedValue(undefined);

      const result = await interviewMgmtV2Service.createQuestion({
        name: "Q",
        heading: "H",
        linkedCategoryId: "c1",
        tags: [],
      });

      expect(mockQuestionSave).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("throws when save fails", async () => {
      mockQuestionSave.mockRejectedValue(new Error("Validation failed"));

      await expect(
        interviewMgmtV2Service.createQuestion({
          name: "Q",
          heading: "H",
          linkedCategoryId: "c1",
          tags: [],
        })
      ).rejects.toThrow("Validation failed");
    });
  });

  describe("getAllQuestions", () => {
    it("returns tree from getQuestionsForParentId", async () => {
      const doc = {
        uniqueId: "q1",
        parentId: "",
        name: "Q1",
        toObject: () => ({ uniqueId: "q1", parentId: "", name: "Q1" }),
      };
      mockQuestionFind
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce([doc]),
        })
        .mockReturnValue({ select: jest.fn().mockResolvedValue([]) });
      mockQuestionFindOne.mockResolvedValue(null);

      const result = await interviewMgmtV2Service.getAllQuestions();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("uniqueId", "q1");
      expect(result[0]).toHaveProperty("children");
      expect(result[0]).toHaveProperty("ancestors");
    });

    it("returns empty array when getQuestionsForParentId fails", async () => {
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await interviewMgmtV2Service.getAllQuestions();

      expect(result).toEqual([]);
    });
  });

  describe("getQuestionByCategoryIdAndQuesId", () => {
    it("returns question with answers when found", async () => {
      const question = {
        uniqueId: "q1",
        linkedCategoryId: "c1",
        name: "Q",
        toObject: () => ({ uniqueId: "q1", linkedCategoryId: "c1", name: "Q" }),
      };
      mockQuestionFindOne.mockResolvedValueOnce(question);
      mockAnswerFind.mockResolvedValueOnce([{ uniqueId: "a1", answer: "A1" }]);

      const result = await interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId(
        "c1",
        "q1"
      );

      expect(mockQuestionFindOne).toHaveBeenCalledWith({
        uniqueId: "q1",
        linkedCategoryId: "c1",
      });
      expect(mockAnswerFind).toHaveBeenCalledWith({ linkedQuestionsId: "q1" });
      expect(result).toHaveProperty("uniqueId", "q1");
      expect(result).toHaveProperty("answers");
      expect(result.answers).toHaveLength(1);
    });

    it("throws Question not found when findOne returns null", async () => {
      mockQuestionFindOne.mockResolvedValue(null);

      await expect(
        interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId("c1", "q1")
      ).rejects.toThrow("Question not found");
    });
  });

  describe("getQuestionByUniqueId", () => {
    it("returns question with answers, children, ancestors when found", async () => {
      const question = {
        uniqueId: "q1",
        name: "Q",
        parentId: "",
        toObject: () => ({ uniqueId: "q1", name: "Q", parentId: "" }),
      };
      mockQuestionFindOne.mockResolvedValueOnce(question);
      mockAnswerFind.mockResolvedValueOnce([]);
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });
      mockQuestionFindOne.mockResolvedValue(null);

      const result = await interviewMgmtV2Service.getQuestionByUniqueId("q1");

      expect(mockQuestionFindOne).toHaveBeenCalledWith({ uniqueId: "q1" });
      expect(result).toHaveProperty("uniqueId", "q1");
      expect(result).toHaveProperty("answers");
      expect(result).toHaveProperty("children");
      expect(result).toHaveProperty("ancestors");
    });

    it("throws Question not found when findOne returns null", async () => {
      mockQuestionFindOne.mockResolvedValue(null);

      await expect(
        interviewMgmtV2Service.getQuestionByUniqueId("missing")
      ).rejects.toThrow("Question not found");
    });
  });

  describe("updateLastRevisedOfQuestionByUniqueId", () => {
    it("finds question, sets lastRevisedOn, saves and returns question", async () => {
      const question = {
        uniqueId: "q1",
        lastRevisedOn: null,
        save: jest.fn().mockResolvedValue({ uniqueId: "q1", lastRevisedOn: new Date() }),
      };
      mockQuestionFindOne.mockResolvedValue(question);

      const result = await interviewMgmtV2Service.updateLastRevisedOfQuestionByUniqueId(
        "q1"
      );

      expect(mockQuestionFindOne).toHaveBeenCalledWith({ uniqueId: "q1" });
      expect(question.lastRevisedOn).toBeDefined();
      expect(question.save).toHaveBeenCalled();
    });

    it("throws Question not found for uniqueId when findOne returns null", async () => {
      mockQuestionFindOne.mockResolvedValue(null);

      await expect(
        interviewMgmtV2Service.updateLastRevisedOfQuestionByUniqueId("missing")
      ).rejects.toThrow("Question not found for uniqueId");
    });
  });

  describe("updateQuestionByUniqueId", () => {
    it("finds question, updates fields, saves and returns", async () => {
      const question = {
        uniqueId: "q1",
        name: "Old",
        save: jest.fn().mockResolvedValue({ uniqueId: "q1", name: "New" }),
      };
      mockQuestionFindOne.mockResolvedValue(question);

      const result = await interviewMgmtV2Service.updateQuestionByUniqueId("q1", {
        name: "New",
      });

      expect(mockQuestionFindOne).toHaveBeenCalledWith({ uniqueId: "q1" });
      expect(question.name).toBe("New");
      expect(question.save).toHaveBeenCalled();
    });

    it("throws Question not found when findOne returns null", async () => {
      mockQuestionFindOne.mockResolvedValue(null);

      await expect(
        interviewMgmtV2Service.updateQuestionByUniqueId("missing", { name: "X" })
      ).rejects.toThrow("Question not found");
    });
  });

  describe("getQuestionsByTagId", () => {
    it("calls Question.find with tags and returns results", async () => {
      const docs = [{ uniqueId: "q1", name: "Q1" }];
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await interviewMgmtV2Service.getQuestionsByTagId("tag1");

      expect(mockQuestionFind).toHaveBeenCalledWith({ tags: "tag1" });
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(
        interviewMgmtV2Service.getQuestionsByTagId("tag1")
      ).rejects.toThrow("Error retrieving Questions with tagId");
    });
  });

  describe("createAnswer", () => {
    it("creates answer and saves", async () => {
      mockAnswerSave.mockResolvedValue(undefined);

      const result = await interviewMgmtV2Service.createAnswer({
        name: "A",
        heading: "H",
        linkedQuestionsId: "q1",
        tags: [],
      });

      expect(mockAnswerSave).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("throws when save fails", async () => {
      mockAnswerSave.mockRejectedValue(new Error("Validation failed"));

      await expect(
        interviewMgmtV2Service.createAnswer({
          name: "A",
          heading: "H",
          linkedQuestionsId: "q1",
          tags: [],
        })
      ).rejects.toThrow("Validation failed");
    });
  });

  describe("updateAnswerByUniqueId", () => {
    it("finds answer, updates fields, saves and returns", async () => {
      const answer = {
        uniqueId: "a1",
        name: "Old",
        save: jest.fn().mockResolvedValue({ uniqueId: "a1", name: "New" }),
      };
      mockAnswerFindOne.mockResolvedValue(answer);

      const result = await interviewMgmtV2Service.updateAnswerByUniqueId("a1", {
        name: "New",
      });

      expect(mockAnswerFindOne).toHaveBeenCalledWith({ uniqueId: "a1" });
      expect(answer.name).toBe("New");
      expect(answer.save).toHaveBeenCalled();
    });

    it("throws Answer not found when findOne returns null", async () => {
      mockAnswerFindOne.mockResolvedValue(null);

      await expect(
        interviewMgmtV2Service.updateAnswerByUniqueId("missing", {})
      ).rejects.toThrow("Answer not found");
    });
  });

  describe("searchTopics", () => {
    it("calls Question.find with regex criteria and returns results", async () => {
      const docs = [{ uniqueId: "q1", name: "Match" }];
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await interviewMgmtV2Service.searchTopics("test");

      expect(mockQuestionFind).toHaveBeenCalledWith(
        expect.objectContaining({
          $or: expect.arrayContaining([
            expect.objectContaining({ name: expect.objectContaining({ $regex: expect.any(RegExp) }) }),
            expect.objectContaining({ heading: expect.objectContaining({ $regex: expect.any(RegExp) }) }),
          ]),
        })
      );
      expect(result).toEqual(docs);
    });

    it("adds description to criteria when searchOptions.description is set", async () => {
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      await interviewMgmtV2Service.searchTopics("x", { description: 1 });

      expect(mockQuestionFind).toHaveBeenCalledWith(
        expect.objectContaining({
          $or: expect.arrayContaining([
            expect.objectContaining({ description: expect.objectContaining({ $regex: expect.any(RegExp) }) }),
          ]),
        })
      );
    });
  });
});
