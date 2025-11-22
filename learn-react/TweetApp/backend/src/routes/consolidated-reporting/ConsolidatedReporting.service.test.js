const mockQuestionFind = jest.fn();
const mockTopicFind = jest.fn();
const mockTaskFind = jest.fn();

jest.mock("../interview-mgmt/InterviewMgmt.v2.model", () => ({
  Question: { find: mockQuestionFind },
  Category: {},
  Answer: {},
}));

jest.mock("../topic/Topic.model", () => ({
  Topic: { find: mockTopicFind },
  TopicSection: {},
}));

jest.mock("../task/Task.model", () => ({
  find: mockTaskFind,
}));

const {
  getAllQuestionsForReportingModule,
  getAllTopicsForReportingModule,
  getAllTasksForReportingModule,
} = require("./ConsolidatedReporting.service");

describe("ConsolidatedReporting.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("getAllQuestionsForReportingModule", () => {
    it("calls Question.find().select() and returns mapped items with parentId fallback", async () => {
      const docs = [
        { uniqueId: "q1", name: "Q1", parentId: "p1", toObject: () => ({ uniqueId: "q1", name: "Q1", parentId: "p1" }) },
        { uniqueId: "q2", name: "Q2", parentId: null, toObject: () => ({ uniqueId: "q2", name: "Q2", parentId: null }) },
      ];
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getAllQuestionsForReportingModule();

      expect(mockQuestionFind).toHaveBeenCalledWith();
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ uniqueId: "q1", parentId: "p1" });
      expect(result[1]).toMatchObject({ uniqueId: "q2", parentId: "SUPER-ROOT" });
    });

    it("returns empty array when find fails", async () => {
      mockQuestionFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await getAllQuestionsForReportingModule();

      expect(result).toEqual([]);
    });
  });

  describe("getAllTopicsForReportingModule", () => {
    it("calls Topic.find().select() and returns mapped items", async () => {
      const docs = [
        { uniqueId: "t1", name: "Topic1", parentId: "", toObject: () => ({ uniqueId: "t1", name: "Topic1", parentId: "" }) },
      ];
      mockTopicFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getAllTopicsForReportingModule();

      expect(mockTopicFind).toHaveBeenCalledWith();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ uniqueId: "t1", parentId: "SUPER-ROOT" });
    });
  });

  describe("getAllTasksForReportingModule", () => {
    it("calls Task.find().select() and returns mapped items", async () => {
      const docs = [
        { uniqueId: "task1", name: "Task1", parentId: undefined, toObject: () => ({ uniqueId: "task1", name: "Task1", parentId: undefined }) },
      ];
      mockTaskFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getAllTasksForReportingModule();

      expect(mockTaskFind).toHaveBeenCalledWith();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ uniqueId: "task1", parentId: "SUPER-ROOT" });
    });
  });
});
