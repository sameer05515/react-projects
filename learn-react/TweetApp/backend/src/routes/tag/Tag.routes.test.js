const express = require("express");
const request = require("supertest");
const tagRouter = require("./Tag.routes");

jest.mock("./Tag.service", () => ({
  createTag: jest.fn(),
  getAllTags: jest.fn(),
  getAllTagsFlat: jest.fn(),
  getTagById: jest.fn(),
  updateTagById: jest.fn(),
  deleteTagById: jest.fn(),
  getTagsCountByDate: jest.fn(),
}));

const tagService = require("./Tag.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/tags", tagRouter);
  return app;
}

describe("Tag.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /tags", () => {
    it("calls createTag and returns 201", async () => {
      const body = { name: "T1", parentId: "" };
      const created = { uniqueId: "tag-1", ...body };
      tagService.createTag.mockResolvedValue(created);

      const res = await request(app).post("/tags").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(tagService.createTag).toHaveBeenCalledWith(body);
    });

    it("returns 400 when createTag throws", async () => {
      tagService.createTag.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/tags").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Validation failed");
    });
  });

  describe("GET /tags", () => {
    it("calls getAllTags and returns 200 with array", async () => {
      const tags = [{ uniqueId: "tag-1", name: "T1", children: [] }];
      tagService.getAllTags.mockResolvedValue(tags);

      const res = await request(app).get("/tags");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tags);
    });

    it("returns 500 when getAllTags throws", async () => {
      tagService.getAllTags.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tags");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("GET /tags/aggregation-results", () => {
    it("calls getTagsCountByDate when queryType is getTagsCountByDate", async () => {
      const result = [{ _id: "2024-01-01", count: 5 }];
      tagService.getTagsCountByDate.mockResolvedValue(result);

      const res = await request(app).get("/tags/aggregation-results?queryType=getTagsCountByDate");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(result);
      expect(tagService.getTagsCountByDate).toHaveBeenCalledWith();
    });

    it("returns 404 when queryType is missing or invalid", async () => {
      const res = await request(app).get("/tags/aggregation-results");

      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/Invalid queryType/);
    });

    it("returns 404 when queryType is not getTagsCountByDate", async () => {
      const res = await request(app).get("/tags/aggregation-results?queryType=other");

      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/Invalid queryType/);
    });

    it("returns 500 when getTagsCountByDate throws", async () => {
      tagService.getTagsCountByDate.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tags/aggregation-results?queryType=getTagsCountByDate");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("GET /tags/export/flat", () => {
    it("calls getAllTagsFlat and returns 200 with flat array", async () => {
      const flat = [
        { uniqueId: "tag-1", name: "T1", parentId: null, description: "", smartContent: null, ancestors: [] },
      ];
      tagService.getAllTagsFlat.mockResolvedValue(flat);

      const res = await request(app).get("/tags/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(tagService.getAllTagsFlat).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("tags-export-flat.json");
    });

    it("returns 500 when getAllTagsFlat throws", async () => {
      tagService.getAllTagsFlat.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tags/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /tags/:uniqueId", () => {
    it("calls getTagById and returns 200", async () => {
      const tag = { uniqueId: "tag-1", name: "T1", children: [], ancestors: [] };
      tagService.getTagById.mockResolvedValue(tag);

      const res = await request(app).get("/tags/tag-1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tag);
      expect(tagService.getTagById).toHaveBeenCalledWith("tag-1");
    });

    it("returns 404 when getTagById returns null", async () => {
      tagService.getTagById.mockResolvedValue(null);

      const res = await request(app).get("/tags/missing");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Tag not found");
    });

    it("returns 500 when getTagById throws", async () => {
      tagService.getTagById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tags/tag-1");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("PUT /tags/:uniqueId", () => {
    it("calls updateTagById and returns 200", async () => {
      const updated = { uniqueId: "tag-1", name: "Updated" };
      tagService.updateTagById.mockResolvedValue(updated);

      const res = await request(app).put("/tags/tag-1").send({ name: "Updated" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(tagService.updateTagById).toHaveBeenCalledWith("tag-1", { name: "Updated" });
    });

    it("returns 404 when updateTagById returns null", async () => {
      tagService.updateTagById.mockResolvedValue(null);

      const res = await request(app).put("/tags/missing").send({ name: "X" });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Tag not found");
    });

    it("returns 500 when updateTagById throws", async () => {
      tagService.updateTagById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).put("/tags/tag-1").send({});

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("DELETE /tags/:uniqueId", () => {
    it("calls deleteTagById and returns 200 with message", async () => {
      tagService.deleteTagById.mockResolvedValue({ uniqueId: "tag-1" });

      const res = await request(app).delete("/tags/tag-1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Tag deleted successfully" });
      expect(tagService.deleteTagById).toHaveBeenCalledWith("tag-1");
    });

    it("returns 404 when deleteTagById returns null", async () => {
      tagService.deleteTagById.mockResolvedValue(null);

      const res = await request(app).delete("/tags/missing");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Tag not found");
    });

    it("returns 500 when deleteTagById throws", async () => {
      tagService.deleteTagById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).delete("/tags/tag-1");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });
});
