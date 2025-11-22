const express = require("express");
const request = require("supertest");
const wordRouter = require("./Word.routes");

jest.mock("./Word.service", () => ({
  getPaginatedWords: jest.fn(),
}));

const wordService = require("./Word.service");

function createApp() {
  const app = express();
  app.use("/words", wordRouter);
  return app;
}

describe("Word.routes", () => {
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

  describe("GET /words/", () => {
    it("calls getPaginatedWords with default page 1 and pageSize 10", async () => {
      const words = [{ word: "a" }, { word: "b" }];
      wordService.getPaginatedWords.mockResolvedValue(words);

      const res = await request(app).get("/words/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(words);
      expect(wordService.getPaginatedWords).toHaveBeenCalledWith(1, 10);
    });

    it("passes query page and pageSize to getPaginatedWords", async () => {
      wordService.getPaginatedWords.mockResolvedValue([]);

      await request(app).get("/words/?page=2&pageSize=20");

      expect(wordService.getPaginatedWords).toHaveBeenCalledWith(2, 20);
    });

    it("returns 500 when getPaginatedWords throws", async () => {
      wordService.getPaginatedWords.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/words/");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Internal Server Error");
    });
  });
});
