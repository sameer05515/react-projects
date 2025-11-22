const express = require("express");
const request = require("supertest");
const consolidatedReportingRouter = require("./ConsolidatedReporting.routes");

jest.mock("./ConsolidatedReporting.service", () => ({
  getAllQuestionsForReportingModule: jest.fn(),
  getAllTopicsForReportingModule: jest.fn(),
  getAllTasksForReportingModule: jest.fn(),
}));

const consolidatedReportingService = require("./ConsolidatedReporting.service");

function createApp() {
  const app = express();
  app.use("/consolidated-reporting", consolidatedReportingRouter);
  return app;
}

describe("ConsolidatedReporting.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /consolidated-reporting/", () => {
    it("calls getAllQuestionsForReportingModule when moduleName=questions and returns 200", async () => {
      const questions = [{ uniqueId: "q1", name: "Q1", parentId: "SUPER-ROOT" }];
      consolidatedReportingService.getAllQuestionsForReportingModule.mockResolvedValue(
        questions
      );

      const res = await request(app).get(
        "/consolidated-reporting/?moduleName=questions"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(questions);
      expect(
        consolidatedReportingService.getAllQuestionsForReportingModule
      ).toHaveBeenCalledTimes(1);
      expect(
        consolidatedReportingService.getAllTopicsForReportingModule
      ).not.toHaveBeenCalled();
      expect(
        consolidatedReportingService.getAllTasksForReportingModule
      ).not.toHaveBeenCalled();
    });

    it("calls getAllTopicsForReportingModule when moduleName=topics and returns 200", async () => {
      const topics = [{ uniqueId: "t1", name: "Topic1", parentId: "SUPER-ROOT" }];
      consolidatedReportingService.getAllTopicsForReportingModule.mockResolvedValue(
        topics
      );

      const res = await request(app).get(
        "/consolidated-reporting/?moduleName=topics"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(topics);
      expect(
        consolidatedReportingService.getAllTopicsForReportingModule
      ).toHaveBeenCalledTimes(1);
    });

    it("calls getAllTasksForReportingModule when moduleName=tasks and returns 200", async () => {
      const tasks = [{ uniqueId: "task1", name: "Task1", parentId: "SUPER-ROOT" }];
      consolidatedReportingService.getAllTasksForReportingModule.mockResolvedValue(
        tasks
      );

      const res = await request(app).get(
        "/consolidated-reporting/?moduleName=tasks"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tasks);
      expect(
        consolidatedReportingService.getAllTasksForReportingModule
      ).toHaveBeenCalledTimes(1);
    });

    it("returns 200 with empty array when moduleName is not questions/topics/tasks", async () => {
      const res = await request(app).get(
        "/consolidated-reporting/?moduleName=other"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
      expect(
        consolidatedReportingService.getAllQuestionsForReportingModule
      ).not.toHaveBeenCalled();
      expect(
        consolidatedReportingService.getAllTopicsForReportingModule
      ).not.toHaveBeenCalled();
      expect(
        consolidatedReportingService.getAllTasksForReportingModule
      ).not.toHaveBeenCalled();
    });

    it("returns 400 when service throws", async () => {
      consolidatedReportingService.getAllQuestionsForReportingModule.mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).get(
        "/consolidated-reporting/?moduleName=questions"
      );

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });
});
