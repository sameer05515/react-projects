const express = require("express");
const request = require("supertest");
const orderInfoRouter = require("./OrderInfo.routes");

jest.mock("./OrderInfo.service", () => ({
  upsertOrderInfo: jest.fn(),
  findByReferenceId: jest.fn(),
}));

const orderInfoService = require("./OrderInfo.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/order-info", orderInfoRouter);
  return app;
}

describe("OrderInfo.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /order-info/upsert", () => {
    it("calls upsertOrderInfo with body params and returns 200 with result", async () => {
      const body = {
        referenceId: "ref1",
        itemType: "Category",
        orderedItemIds: ["id1", "id2"],
      };
      const saved = { ...body, _id: "doc1" };
      orderInfoService.upsertOrderInfo.mockResolvedValue(saved);

      const res = await request(app)
        .post("/order-info/upsert")
        .send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(saved);
      expect(orderInfoService.upsertOrderInfo).toHaveBeenCalledWith(
        "ref1",
        "Category",
        ["id1", "id2"]
      );
    });

    it("returns 500 with message when service throws", async () => {
      orderInfoService.upsertOrderInfo.mockRejectedValue(new Error("DB error"));

      const res = await request(app)
        .post("/order-info/upsert")
        .send({
          referenceId: "r",
          itemType: "Question",
          orderedItemIds: [],
        });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Error upserting order information");
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /order-info/find/:referenceId", () => {
    it("calls findByReferenceId and returns 200 with result", async () => {
      const docs = [
        { referenceId: "ref1", itemType: "Category", orderedItemIds: ["a", "b"] },
      ];
      orderInfoService.findByReferenceId.mockResolvedValue(docs);

      const res = await request(app).get("/order-info/find/ref1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(docs);
      expect(orderInfoService.findByReferenceId).toHaveBeenCalledWith("ref1");
    });

    it("returns 500 when service throws", async () => {
      orderInfoService.findByReferenceId.mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).get("/order-info/find/ref1");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Error finding order information");
    });
  });
});
