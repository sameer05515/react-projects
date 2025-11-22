const mockCountDocuments = jest.fn();

jest.mock("./ThinkTank.v1.model", () => ({
  ThinkTankItemModel: {
    countDocuments: mockCountDocuments,
  },
  Status: {
    OPEN: "Open",
    CLOSED: "Closed",
    UNKNOWN: "Unknown",
  },
}));

jest.mock("date-fns", () => ({
  startOfDay: jest.fn((d) => d),
  endOfDay: jest.fn((d) => d),
}));

const express = require("express");
const request = require("supertest");
const statsRouter = require("./ThinkTank.v1.stats.routes");

function createApp() {
  const app = express();
  app.use("/think-tank/v1/stats", statsRouter);
  return app;
}

describe("ThinkTank.v1.stats.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockCountDocuments.mockResolvedValue(0);
  });

  afterEach(() => {
    console.error.mockRestore?.();
  });

  describe("GET /think-tank/v1/stats/stats/itr1", () => {
    it("calls countDocuments and returns 200 with statistics", async () => {
      mockCountDocuments
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(3)
        .mockResolvedValueOnce(1);

      const res = await request(app).get("/think-tank/v1/stats/stats/itr1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        totalCount: 10,
        createdToday: 2,
        closedToday: 1,
        groomedToday: 0,
        currentlyWorkingOn: 3,
        onHold: 1,
      });
      expect(mockCountDocuments).toHaveBeenCalledTimes(6);
    });

    it("returns 500 when countDocuments fails", async () => {
      mockCountDocuments.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/think-tank/v1/stats/stats/itr1");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Internal server error");
    });
  });
});
