const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockSave = jest.fn();

const ThinkTankItemType = {
  ToDo: "to-do",
  RawQuestion: "raw-question",
  YetToBeDecided: "yet-to-be-decided",
};

const Status = {
  OPEN: "Open",
  CLOSED: "Closed",
  UNKNOWN: "Unknown",
};

jest.mock("./ThinkTank.v1.model", () => {
  function MockThinkTankItemModel(data) {
    this._data = data;
    this.save = mockSave;
    this.uniqueId = data?.uniqueId || "gen-uuid";
    this.itemType = data?.itemType;
    this.smartContent = data?.smartContent;
    this.status = data?.status;
    this.closedOn = data?.closedOn;
    this.isUrgent = data?.isUrgent;
    this.isImportant = data?.isImportant;
    this.hasGroomed = data?.hasGroomed;
    this.createdDate = data?.createdDate;
    this.updatedAt = data?.updatedAt;
    return this;
  }
  MockThinkTankItemModel.find = mockFind;
  MockThinkTankItemModel.findOne = mockFindOne;
  return {
    ThinkTankItemModel: MockThinkTankItemModel,
    ThinkTankItemType,
    Status,
  };
});

const express = require("express");
const request = require("supertest");
const router = require("./ThinkTank.v1.routes");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/think-tank/v1", router);
  return app;
}

describe("ThinkTank.v1.routes", () => {
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

  describe("GET /think-tank/v1/", () => {
    it("calls ThinkTankItemModel.find and returns 200 with array", async () => {
      const items = [{ uniqueId: "u1", itemType: "to-do", smartContent: { content: "x" } }];
      mockFind.mockResolvedValue(items);

      const res = await request(app).get("/think-tank/v1/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(items);
      expect(mockFind).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when find fails", async () => {
      mockFind.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/think-tank/v1/");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Error fetching ThinkTankItems");
    });
  });

  describe("POST /think-tank/v1/", () => {
    it("validates smartContent and returns 201 with saved item", async () => {
      const body = {
        itemType: "to-do",
        smartContent: { content: "Do something" },
      };
      const saved = { uniqueId: "u1", ...body };
      mockSave.mockResolvedValue(saved);

      const res = await request(app).post("/think-tank/v1/").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(body);
      expect(mockSave).toHaveBeenCalled();
    });

    it("returns 400 when smartContent.content is missing or empty", async () => {
      const res1 = await request(app).post("/think-tank/v1/").send({});
      expect(res1.status).toBe(400);
      expect(res1.body.error).toContain("content");

      const res2 = await request(app)
        .post("/think-tank/v1/")
        .send({ smartContent: { content: "   " } });
      expect(res2.status).toBe(400);
    });

    it("returns 500 when save fails", async () => {
      mockSave.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app)
        .post("/think-tank/v1/")
        .send({ itemType: "to-do", smartContent: { content: "x" } });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Internal Server Error");
    });
  });

  describe("PATCH /think-tank/v1/:uniqueId", () => {
    it("calls findOne and save, returns 200 with updated item", async () => {
      const existing = {
        uniqueId: "u1",
        smartContent: { content: "Old" },
        save: jest.fn().mockResolvedValue({
          uniqueId: "u1",
          smartContent: { content: "New" },
        }),
      };
      mockFindOne.mockResolvedValue(existing);

      const res = await request(app)
        .patch("/think-tank/v1/u1")
        .send({ smartContent: { content: "New" } });

      expect(res.status).toBe(200);
      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(existing.save).toHaveBeenCalled();
    });

    it("returns 400 when ThinkTankItem not found", async () => {
      mockFindOne.mockResolvedValue(null);

      const res = await request(app)
        .patch("/think-tank/v1/missing")
        .send({ smartContent: { content: "x" } });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("ThinkTankItem not found");
    });

    it("returns 400 when smartContent is invalid", async () => {
      const existing = {
        uniqueId: "u1",
        save: jest.fn(),
      };
      mockFindOne.mockResolvedValue(existing);

      const res = await request(app)
        .patch("/think-tank/v1/u1")
        .send({ smartContent: { content: "   " } });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("content");
    });
  });
});
