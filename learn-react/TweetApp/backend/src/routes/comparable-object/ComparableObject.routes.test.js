const express = require("express");
const request = require("supertest");
const comparableObjectRouter = require("./ComparableObject.routes");

jest.mock("./ComparableObject.service", () => ({
  createItem: jest.fn(),
  getAllItems: jest.fn(),
  getItemByUniqueId: jest.fn(),
  updateItemByUniqueId: jest.fn(),
  deleteItemById: jest.fn(),
}));

const comparableObjectService = require("./ComparableObject.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/c-objects", comparableObjectRouter);
  return app;
}

describe("ComparableObject.routes", () => {
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

  describe("POST /c-objects/", () => {
    it("calls createItem and returns 201 with created item", async () => {
      const body = { uniqueId: "u1", name: "Item" };
      const created = { _id: "id1", ...body };
      comparableObjectService.createItem.mockResolvedValue(created);

      const res = await request(app).post("/c-objects/").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
    });

    it("returns 500 when createItem throws", async () => {
      comparableObjectService.createItem.mockRejectedValue(new Error("DB error"));

      const res = await request(app).post("/c-objects/").send({});

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Internal Server Error");
    });
  });

  describe("GET /c-objects/", () => {
    it("calls getAllItems and returns 200 with array", async () => {
      const items = [{ uniqueId: "u1" }];
      comparableObjectService.getAllItems.mockResolvedValue(items);

      const res = await request(app).get("/c-objects/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(items);
    });
  });

  describe("GET /c-objects/:uniqueId", () => {
    it("calls getItemByUniqueId and returns 200 with item", async () => {
      const item = { uniqueId: "u1", name: "Item" };
      comparableObjectService.getItemByUniqueId.mockResolvedValue(item);

      const res = await request(app).get("/c-objects/u1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(item);
    });

    it("returns 404 when getItemByUniqueId returns null", async () => {
      comparableObjectService.getItemByUniqueId.mockResolvedValue(null);

      const res = await request(app).get("/c-objects/missing");

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Item not found");
    });
  });

  describe("PUT /c-objects/:uniqueId", () => {
    it("calls updateItemByUniqueId and returns 200 with updated item", async () => {
      const updated = { uniqueId: "u1", name: "Updated" };
      comparableObjectService.updateItemByUniqueId.mockResolvedValue(updated);

      const res = await request(app).put("/c-objects/u1").send({ name: "Updated" });

      expect(res.status).toBe(200);
      expect(comparableObjectService.updateItemByUniqueId).toHaveBeenCalledWith(
        "u1",
        { name: "Updated" }
      );
    });

    it("returns 404 when updateItemByUniqueId returns null", async () => {
      comparableObjectService.updateItemByUniqueId.mockResolvedValue(null);

      const res = await request(app).put("/c-objects/missing").send({});

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /c-objects/:id", () => {
    it("calls deleteItemById and returns 200 with message", async () => {
      comparableObjectService.deleteItemById.mockResolvedValue({
        _id: "id1",
        uniqueId: "u1",
      });

      const res = await request(app).delete("/c-objects/id1");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Item deleted successfully");
    });

    it("returns 404 when deleteItemById returns null", async () => {
      comparableObjectService.deleteItemById.mockResolvedValue(null);

      const res = await request(app).delete("/c-objects/missing");

      expect(res.status).toBe(404);
    });
  });
});
