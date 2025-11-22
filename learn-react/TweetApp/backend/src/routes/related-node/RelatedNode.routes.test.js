const express = require("express");
const request = require("supertest");
const relatedNodeRouter = require("./RelatedNode.routes");

jest.mock("./RelatedNode.service", () => ({
  saveRelatedNode: jest.fn(),
  updateRelatedNode: jest.fn(),
  fetchAllRelatedNodes: jest.fn(),
  fetchRelatedNodeByUniqueId: jest.fn(),
  updateRelationInConnectedNodes: jest.fn(),
}));

const relatedNodeService = require("./RelatedNode.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/node-story", relatedNodeRouter);
  return app;
}

describe("RelatedNode.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore?.();
    console.log.mockRestore?.();
  });

  describe("POST /node-story", () => {
    it("calls saveRelatedNode and returns 201", async () => {
      const body = { name: "N1", itemType: "topic" };
      const created = { uniqueId: "rn-1", ...body };
      relatedNodeService.saveRelatedNode.mockResolvedValue(created);

      const res = await request(app).post("/node-story").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(relatedNodeService.saveRelatedNode).toHaveBeenCalledWith(body);
    });

    it("returns 400 when saveRelatedNode throws", async () => {
      relatedNodeService.saveRelatedNode.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/node-story").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Validation failed");
    });
  });

  describe("PUT /node-story/upsert-relation", () => {
    it("calls updateRelationInConnectedNodes and returns 200", async () => {
      const body = { hasId: "h1", withId: "w1", name: "rel", type: "next" };
      relatedNodeService.updateRelationInConnectedNodes.mockResolvedValue({
        message: "Successfully updated relations",
      });

      const res = await request(app).put("/node-story/upsert-relation").send(body);

      expect(res.status).toBe(200);
      expect(relatedNodeService.updateRelationInConnectedNodes).toHaveBeenCalledWith(body);
    });

    it("returns 400 when updateRelationInConnectedNodes throws", async () => {
      relatedNodeService.updateRelationInConnectedNodes.mockRejectedValue(
        new Error("Node not found")
      );

      const res = await request(app).put("/node-story/upsert-relation").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Node not found");
    });
  });

  describe("PUT /node-story/:uniqueId", () => {
    it("calls updateRelatedNode and returns 200", async () => {
      const body = { name: "Updated" };
      const updated = { uniqueId: "rn-1", name: "Updated" };
      relatedNodeService.updateRelatedNode.mockResolvedValue(updated);

      const res = await request(app).put("/node-story/rn-1").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(relatedNodeService.updateRelatedNode).toHaveBeenCalledWith("rn-1", body);
    });

    it("returns 400 when updateRelatedNode throws", async () => {
      relatedNodeService.updateRelatedNode.mockRejectedValue(new Error("Not found"));

      const res = await request(app).put("/node-story/missing").send({ name: "X" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Not found");
    });
  });

  describe("GET /node-story", () => {
    it("calls fetchAllRelatedNodes and returns 200 with array", async () => {
      const nodes = [{ uniqueId: "rn-1", name: "N1" }];
      relatedNodeService.fetchAllRelatedNodes.mockResolvedValue(nodes);

      const res = await request(app).get("/node-story");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(nodes);
      expect(relatedNodeService.fetchAllRelatedNodes).toHaveBeenCalledWith();
    });

    it("returns 500 when fetchAllRelatedNodes throws", async () => {
      relatedNodeService.fetchAllRelatedNodes.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/node-story");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("GET /node-story/:uniqueId", () => {
    it("calls fetchRelatedNodeByUniqueId and returns 200", async () => {
      const node = { uniqueId: "rn-1", name: "N1" };
      relatedNodeService.fetchRelatedNodeByUniqueId.mockResolvedValue(node);

      const res = await request(app).get("/node-story/rn-1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(node);
      expect(relatedNodeService.fetchRelatedNodeByUniqueId).toHaveBeenCalledWith("rn-1");
    });

    it("returns 404 when fetchRelatedNodeByUniqueId throws", async () => {
      relatedNodeService.fetchRelatedNodeByUniqueId.mockRejectedValue(
        new Error("RelatedNode not found")
      );

      const res = await request(app).get("/node-story/missing");

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("RelatedNode not found");
    });
  });
});
