const express = require("express");
const request = require("supertest");
const pinnedItemRouter = require("./PinnedItem.routes");

jest.mock("./PinnedItem.service", () => ({
  upsertPinnedItem: jest.fn(),
  getAllPinnedItemsByType: jest.fn(),
  getAllPinnedItems: jest.fn(),
  getAllPinnedItemsFlat: jest.fn(),
}));

const pinnedItemService = require("./PinnedItem.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/pinned-items", pinnedItemRouter);
  return app;
}

describe("PinnedItem.routes", () => {
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

  describe("POST /pinned-items", () => {
    it("calls upsertPinnedItem and returns 201", async () => {
      const body = { linkedUniqueId: "t1", linkedItemType: "topic" };
      const created = { uniqueId: "pi-1", ...body };
      pinnedItemService.upsertPinnedItem.mockResolvedValue(created);

      const res = await request(app).post("/pinned-items").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(pinnedItemService.upsertPinnedItem).toHaveBeenCalledWith(body);
    });

    it("returns 400 when upsertPinnedItem throws", async () => {
      pinnedItemService.upsertPinnedItem.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/pinned-items").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Validation failed");
    });
  });

  describe("GET /pinned-items", () => {
    it("calls getAllPinnedItems and returns 200 with array", async () => {
      const items = [{ uniqueId: "pi-1", linkedItemType: "topic" }];
      pinnedItemService.getAllPinnedItems.mockResolvedValue(items);

      const res = await request(app).get("/pinned-items");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(items);
    });

    it("returns 404 when getAllPinnedItems returns null", async () => {
      pinnedItemService.getAllPinnedItems.mockResolvedValue(null);

      const res = await request(app).get("/pinned-items");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Topic not found");
    });

    it("returns 500 when getAllPinnedItems throws", async () => {
      pinnedItemService.getAllPinnedItems.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/pinned-items");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("GET /pinned-items/export/flat", () => {
    it("calls getAllPinnedItemsFlat and returns 200 with flat array", async () => {
      const flat = [{ uniqueId: "pi-1", linkedUniqueId: "t1", linkedItemType: "topic", softDelete: false }];
      pinnedItemService.getAllPinnedItemsFlat.mockResolvedValue(flat);

      const res = await request(app).get("/pinned-items/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(pinnedItemService.getAllPinnedItemsFlat).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("pinned-items-export-flat.json");
    });

    it("returns 500 when getAllPinnedItemsFlat throws", async () => {
      pinnedItemService.getAllPinnedItemsFlat.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/pinned-items/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /pinned-items/:itemType", () => {
    it("calls getAllPinnedItemsByType and returns 200 with array", async () => {
      const items = [{ uniqueId: "pi-1", linkedItemType: "topic" }];
      pinnedItemService.getAllPinnedItemsByType.mockResolvedValue(items);

      const res = await request(app).get("/pinned-items/topic");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(items);
      expect(pinnedItemService.getAllPinnedItemsByType).toHaveBeenCalledWith("topic");
    });

    it("returns 404 when getAllPinnedItemsByType returns null", async () => {
      pinnedItemService.getAllPinnedItemsByType.mockResolvedValue(null);

      const res = await request(app).get("/pinned-items/topic");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Topic not found");
    });

    it("returns 500 when getAllPinnedItemsByType throws", async () => {
      pinnedItemService.getAllPinnedItemsByType.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/pinned-items/topic");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });
});
