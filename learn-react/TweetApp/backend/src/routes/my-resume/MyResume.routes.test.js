const express = require("express");
const request = require("supertest");
const myResumeRouter = require("./MyResume.routes");

jest.mock("./MyResume.service", () => ({
  getResumeByUniqueId: jest.fn(),
}));

const myResumeService = require("./MyResume.service");

function createApp() {
  const app = express();
  app.use("/my-resume", myResumeRouter);
  return app;
}

describe("MyResume.routes", () => {
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

  describe("GET /my-resume/:uniqueId", () => {
    it("calls getResumeByUniqueId and returns 200 with resume", async () => {
      const resume = { uniqueName: "john_doe", name: "John" };
      myResumeService.getResumeByUniqueId.mockResolvedValue(resume);

      const res = await request(app).get("/my-resume/john_doe");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(resume);
      expect(myResumeService.getResumeByUniqueId).toHaveBeenCalledWith("john_doe");
    });

    it("returns 404 when getResumeByUniqueId returns null", async () => {
      myResumeService.getResumeByUniqueId.mockResolvedValue(null);

      const res = await request(app).get("/my-resume/missing");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Resume not found" });
    });

    it("returns 500 when getResumeByUniqueId throws", async () => {
      myResumeService.getResumeByUniqueId.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/my-resume/x");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Internal Server Error" });
    });
  });
});
