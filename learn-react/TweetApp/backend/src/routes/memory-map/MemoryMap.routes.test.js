const express = require("express");
const request = require("supertest");
const memoryMapRouter = require("./MemoryMap.routes");

jest.mock("./MemoryMap.service", () => ({
  saveMemoryMap: jest.fn(),
  updateMemoryMap: jest.fn(),
  updateMemoryMapForGivenSkeleton: jest.fn(),
  fetchAllMemoryMaps: jest.fn(),
  getAllMemoryMapsFlat: jest.fn(),
  fetchMemoryMapByUniqueId: jest.fn(),
}));

const memoryMapService = require("./MemoryMap.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/memory-maps", memoryMapRouter);
  return app;
}

describe("MemoryMap.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /memory-maps/", () => {
    it("calls saveMemoryMap with body and returns 201 with created map", async () => {
      const body = { name: "New Map", parentId: "", details: [], references: [] };
      const created = { ...body, uniqueId: "u1" };
      memoryMapService.saveMemoryMap.mockResolvedValue(created);

      const res = await request(app).post("/memory-maps/").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(memoryMapService.saveMemoryMap).toHaveBeenCalledWith(body);
    });

    it("returns 400 with error when saveMemoryMap throws", async () => {
      memoryMapService.saveMemoryMap.mockRejectedValue(
        new Error("Validation failed")
      );

      const res = await request(app)
        .post("/memory-maps/")
        .send({ name: "X" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Validation failed");
    });
  });

  describe("PUT /memory-maps/:uniqueId", () => {
    it("calls updateMemoryMap with params and body, returns 200", async () => {
      const body = { name: "Updated Map" };
      const updated = { uniqueId: "u1", name: "Updated Map" };
      memoryMapService.updateMemoryMap.mockResolvedValue(updated);

      const res = await request(app).put("/memory-maps/u1").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(memoryMapService.updateMemoryMap).toHaveBeenCalledWith("u1", body);
    });

    it("returns 400 when updateMemoryMap throws", async () => {
      memoryMapService.updateMemoryMap.mockRejectedValue(
        new Error("MemoryMap not found")
      );

      const res = await request(app)
        .put("/memory-maps/missing")
        .send({ name: "X" });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("MemoryMap not found");
    });
  });

  describe("PUT /memory-maps/:uniqueId/append-skeleton", () => {
    it("calls updateMemoryMapForGivenSkeleton and returns 200", async () => {
      const body = { skeleton: "{ \"nodes\": [] }" };
      const updated = { uniqueId: "u1", skeleton: body.skeleton };
      memoryMapService.updateMemoryMapForGivenSkeleton.mockResolvedValue(
        updated
      );

      const res = await request(app)
        .put("/memory-maps/u1/append-skeleton")
        .send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(
        memoryMapService.updateMemoryMapForGivenSkeleton
      ).toHaveBeenCalledWith("u1", body);
    });

    it("returns 400 when updateMemoryMapForGivenSkeleton throws", async () => {
      memoryMapService.updateMemoryMapForGivenSkeleton.mockRejectedValue(
        new Error("MemoryMap not found")
      );

      const res = await request(app)
        .put("/memory-maps/missing/append-skeleton")
        .send({ skeleton: "x" });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /memory-maps/", () => {
    it("calls fetchAllMemoryMaps and returns 200 with array", async () => {
      const maps = [{ uniqueId: "u1", name: "Map1", children: [], ancestors: [] }];
      memoryMapService.fetchAllMemoryMaps.mockResolvedValue(maps);

      const res = await request(app).get("/memory-maps/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(maps);
      expect(memoryMapService.fetchAllMemoryMaps).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when fetchAllMemoryMaps throws", async () => {
      memoryMapService.fetchAllMemoryMaps.mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).get("/memory-maps/");

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("DB error");
    });
  });

  describe("GET /memory-maps/export/flat", () => {
    it("calls getAllMemoryMapsFlat and returns 200 with flat array", async () => {
      const flat = [
        { uniqueId: "u1", name: "Map1", parentId: null, skeleton: "", details: [], references: [], ancestors: [] },
      ];
      memoryMapService.getAllMemoryMapsFlat.mockResolvedValue(flat);

      const res = await request(app).get("/memory-maps/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(memoryMapService.getAllMemoryMapsFlat).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("memory-maps-export-flat.json");
    });

    it("returns 500 when getAllMemoryMapsFlat throws", async () => {
      memoryMapService.getAllMemoryMapsFlat.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/memory-maps/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /memory-maps/:uniqueId", () => {
    it("calls fetchMemoryMapByUniqueId and returns 200 with map", async () => {
      const map = { uniqueId: "u1", name: "My Map" };
      memoryMapService.fetchMemoryMapByUniqueId.mockResolvedValue(map);

      const res = await request(app).get("/memory-maps/u1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(map);
      expect(memoryMapService.fetchMemoryMapByUniqueId).toHaveBeenCalledWith(
        "u1"
      );
    });

    it("returns 404 when fetchMemoryMapByUniqueId throws", async () => {
      memoryMapService.fetchMemoryMapByUniqueId.mockRejectedValue(
        new Error("MemoryMap not found")
      );

      const res = await request(app).get("/memory-maps/missing");

      expect(res.status).toBe(404);
      expect(res.body.error).toContain("MemoryMap not found");
    });
  });
});
