const express = require("express");
const request = require("supertest");
const interviewMgmtV2Router = require("./InterviewMgmt.v2.routes");

jest.mock("./InterviewMgmt.v2.service", () => ({
  createCategory: jest.fn(),
  getAllCategories: jest.fn(),
  getCategoryByUniqueId: jest.fn(),
  updateCategoryByUniqueId: jest.fn(),
  createQuestion: jest.fn(),
  getAllQuestions: jest.fn(),
  getAllQuestionsFlat: jest.fn(),
  getQuestionByUniqueId: jest.fn(),
  getQuestionByCategoryIdAndQuesId: jest.fn(),
  updateQuestionByUniqueId: jest.fn(),
  updateLastRevisedOfQuestionByUniqueId: jest.fn(),
  searchTopics: jest.fn(),
  createAnswer: jest.fn(),
  updateAnswerByUniqueId: jest.fn(),
}));

const interviewMgmtV2Service = require("./InterviewMgmt.v2.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/intvw-mgmt/v2", interviewMgmtV2Router);
  return app;
}

describe("InterviewMgmt.v2.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore?.();
  });

  describe("POST /intvw-mgmt/v2/categories", () => {
    it("calls createCategory and returns 201", async () => {
      const body = { name: "Cat", heading: "H", parentId: "", tags: [] };
      const created = { uniqueId: "c1", ...body };
      interviewMgmtV2Service.createCategory.mockResolvedValue(created);

      const res = await request(app).post("/intvw-mgmt/v2/categories").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
    });

    it("returns 400 when createCategory throws", async () => {
      interviewMgmtV2Service.createCategory.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/intvw-mgmt/v2/categories").send({});

      expect(res.status).toBe(400);
    });
  });

  describe("GET /intvw-mgmt/v2/categories", () => {
    it("calls getAllCategories and returns 200 with array", async () => {
      const categories = [{ uniqueId: "c1", name: "Cat", children: [], questions: [] }];
      interviewMgmtV2Service.getAllCategories.mockResolvedValue(categories);

      const res = await request(app).get("/intvw-mgmt/v2/categories");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(categories);
    });
  });

  describe("GET /intvw-mgmt/v2/categories/:uniqueId", () => {
    it("calls getCategoryByUniqueId and returns 200 with DTO", async () => {
      const dto = { uniqueId: "c1", name: "Cat", children: [], ancestors: [], questions: [] };
      interviewMgmtV2Service.getCategoryByUniqueId.mockResolvedValue(dto);

      const res = await request(app).get("/intvw-mgmt/v2/categories/c1");

      expect(res.status).toBe(200);
      expect(interviewMgmtV2Service.getCategoryByUniqueId).toHaveBeenCalledWith("c1");
    });
  });

  describe("PUT /intvw-mgmt/v2/categories/:uniqueId", () => {
    it("calls updateCategoryByUniqueId and returns 200", async () => {
      const updated = { uniqueId: "c1", name: "Updated" };
      interviewMgmtV2Service.updateCategoryByUniqueId.mockResolvedValue(updated);

      const res = await request(app)
        .put("/intvw-mgmt/v2/categories/c1")
        .send({ name: "Updated" });

      expect(res.status).toBe(200);
      expect(interviewMgmtV2Service.updateCategoryByUniqueId).toHaveBeenCalledWith(
        "c1",
        { name: "Updated" }
      );
    });
  });

  describe("POST /intvw-mgmt/v2/questions", () => {
    it("calls createQuestion and returns 201", async () => {
      const body = { name: "Q", heading: "H", linkedCategoryId: "c1", tags: [] };
      const created = { uniqueId: "q1", ...body };
      interviewMgmtV2Service.createQuestion.mockResolvedValue(created);

      const res = await request(app).post("/intvw-mgmt/v2/questions").send(body);

      expect(res.status).toBe(201);
    });
  });

  describe("GET /intvw-mgmt/v2/export/questions/flat", () => {
    it("calls getAllQuestionsFlat and returns 200 with flat array (with answers)", async () => {
      const flat = [
        { uniqueId: "q1", name: "Q1", heading: "H", parentId: null, linkedCategoryId: "c1", tags: [], ancestors: [], answers: [{ uniqueId: "a1", name: "A1", linkedQuestionsId: "q1" }] },
      ];
      interviewMgmtV2Service.getAllQuestionsFlat.mockResolvedValue(flat);

      const res = await request(app).get("/intvw-mgmt/v2/export/questions/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(interviewMgmtV2Service.getAllQuestionsFlat).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("interview-questions-export-flat.json");
    });

    it("returns 500 when getAllQuestionsFlat throws", async () => {
      interviewMgmtV2Service.getAllQuestionsFlat.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/intvw-mgmt/v2/export/questions/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /intvw-mgmt/v2/questions", () => {
    it("calls getAllQuestions and returns 201 with array", async () => {
      interviewMgmtV2Service.getAllQuestions.mockResolvedValue([]);

      const res = await request(app).get("/intvw-mgmt/v2/questions");

      expect(res.status).toBe(201);
    });
  });

  describe("GET /intvw-mgmt/v2/questions/:uniqueId", () => {
    it("calls getQuestionByUniqueId and returns 200", async () => {
      const question = { uniqueId: "q1", name: "Q", answers: [], children: [], ancestors: [] };
      interviewMgmtV2Service.getQuestionByUniqueId.mockResolvedValue(question);

      const res = await request(app).get("/intvw-mgmt/v2/questions/q1");

      expect(res.status).toBe(200);
      expect(interviewMgmtV2Service.getQuestionByUniqueId).toHaveBeenCalledWith("q1");
    });
  });

  describe("GET /intvw-mgmt/v2/categories/:categoryId/questions/:quesId", () => {
    it("calls getQuestionByCategoryIdAndQuesId and returns 200", async () => {
      const question = { uniqueId: "q1", answers: [] };
      interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId.mockResolvedValue(question);

      const res = await request(app).get("/intvw-mgmt/v2/categories/c1/questions/q1");

      expect(res.status).toBe(200);
      expect(interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId).toHaveBeenCalledWith(
        "c1",
        "q1"
      );
    });
  });

  describe("PUT /intvw-mgmt/v2/questions/:uniqueId", () => {
    it("calls updateQuestionByUniqueId and returns 200", async () => {
      const updated = { uniqueId: "q1", name: "Updated" };
      interviewMgmtV2Service.updateQuestionByUniqueId.mockResolvedValue(updated);

      const res = await request(app)
        .put("/intvw-mgmt/v2/questions/q1")
        .send({ name: "Updated" });

      expect(res.status).toBe(200);
    });
  });

  describe("PATCH /intvw-mgmt/v2/questions/:uniqueId", () => {
    it("calls updateLastRevisedOfQuestionByUniqueId and returns 200 with success", async () => {
      interviewMgmtV2Service.updateLastRevisedOfQuestionByUniqueId.mockResolvedValue();

      const res = await request(app).patch("/intvw-mgmt/v2/questions/q1");

      expect(res.status).toBe(200);
      expect(res.body).toBe("success");
    });
  });

  describe("POST /intvw-mgmt/v2/questions/search", () => {
    it("returns 400 when searchString is missing", async () => {
      const res = await request(app).post("/intvw-mgmt/v2/questions/search").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("searchString is required");
    });

    it("calls searchTopics and returns 200 with results", async () => {
      interviewMgmtV2Service.searchTopics.mockResolvedValue([{ uniqueId: "q1", name: "Match" }]);

      const res = await request(app)
        .post("/intvw-mgmt/v2/questions/search")
        .send({ searchString: "test" });

      expect(res.status).toBe(200);
      expect(interviewMgmtV2Service.searchTopics).toHaveBeenCalledWith("test", undefined);
    });
  });

  describe("POST /intvw-mgmt/v2/answers", () => {
    it("calls createAnswer and returns 201", async () => {
      const body = { name: "A", heading: "H", linkedQuestionsId: "q1", tags: [] };
      const created = { uniqueId: "a1", ...body };
      interviewMgmtV2Service.createAnswer.mockResolvedValue(created);

      const res = await request(app).post("/intvw-mgmt/v2/answers").send(body);

      expect(res.status).toBe(201);
    });
  });

  describe("PUT /intvw-mgmt/v2/answers/:uniqueId", () => {
    it("calls updateAnswerByUniqueId and returns 200", async () => {
      const updated = { uniqueId: "a1", name: "Updated" };
      interviewMgmtV2Service.updateAnswerByUniqueId.mockResolvedValue(updated);

      const res = await request(app)
        .put("/intvw-mgmt/v2/answers/a1")
        .send({ name: "Updated" });

      expect(res.status).toBe(200);
    });
  });
});
