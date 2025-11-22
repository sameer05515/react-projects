const express = require("express");
const request = require("supertest");
const topicRouter = require("./Topic.routes");

jest.mock("./Topic.service", () => ({
  createTopic: jest.fn(),
  createTopicsBulk: jest.fn(),
  updateTopicByUniqueId: jest.fn(),
  publishTopicByUniqueId: jest.fn(),
  getAllTopics: jest.fn(),
  getPublishedTopics: jest.fn(),
  getAllTopicsFlat: jest.fn(),
  getAllTopicsForExport: jest.fn(),
  getAllTopicsFlatForExport: jest.fn(),
  getTopicByUniqueId: jest.fn(),
  searchTopics: jest.fn(),
  createTopicSection: jest.fn(),
  getAllTopicSectionsById: jest.fn(),
  getTopicSectionsById: jest.fn(),
  updateTopicSectionsById: jest.fn(),
}));

const topicService = require("./Topic.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/topics", topicRouter);
  return app;
}

describe("Topic.routes", () => {
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

  describe("POST /topics/", () => {
    it("calls createTopic with body and returns 201 with created topic", async () => {
      const body = { name: "T1", parentId: "", tags: [] };
      const created = { uniqueId: "u1", ...body };
      topicService.createTopic.mockResolvedValue(created);

      const res = await request(app).post("/topics/").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(topicService.createTopic).toHaveBeenCalledWith(body);
    });

    it("returns 400 with error when createTopic throws", async () => {
      topicService.createTopic.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/topics/").send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Validation failed");
    });
  });

  describe("POST /topics/bulk", () => {
    it("calls createTopicsBulk with topics array and returns 201", async () => {
      const body = { topics: [{ name: "T1" }, { name: "T2", parentId: "" }] };
      const result = { created: [{ uniqueId: "u1", name: "T1" }, { uniqueId: "u2", name: "T2" }], errors: [] };
      topicService.createTopicsBulk.mockResolvedValue(result);

      const res = await request(app).post("/topics/bulk").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(result);
      expect(topicService.createTopicsBulk).toHaveBeenCalledWith(body.topics);
    });

    it("returns 400 when createTopicsBulk throws", async () => {
      topicService.createTopicsBulk.mockRejectedValue(new Error("DB error"));

      const res = await request(app).post("/topics/bulk").send({ topics: [{ name: "T1" }] });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });

  describe("PUT /topics/:uniqueId", () => {
    it("calls updateTopicByUniqueId with params and body, returns 200", async () => {
      const body = { name: "Updated" };
      const updated = { uniqueId: "u1", name: "Updated" };
      topicService.updateTopicByUniqueId.mockResolvedValue(updated);

      const res = await request(app).put("/topics/u1").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(topicService.updateTopicByUniqueId).toHaveBeenCalledWith("u1", body);
    });

    it("returns 400 when updateTopicByUniqueId throws", async () => {
      topicService.updateTopicByUniqueId.mockRejectedValue(
        new Error("Task not found")
      );

      const res = await request(app).put("/topics/missing").send({ name: "X" });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("Task not found");
    });

    it("returns 404 when updateTopicByUniqueId resolves null", async () => {
      topicService.updateTopicByUniqueId.mockResolvedValue(null);

      const res = await request(app).put("/topics/u1").send({ name: "X" });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Topic not found" });
    });
  });

  describe("PUT /topics/:uniqueId/publish", () => {
    it("calls publishTopicByUniqueId and returns 200 with topic", async () => {
      const topic = { uniqueId: "u1", name: "T1", published: true };
      topicService.publishTopicByUniqueId.mockResolvedValue(topic);

      const res = await request(app).put("/topics/u1/publish");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(topic);
      expect(topicService.publishTopicByUniqueId).toHaveBeenCalledWith("u1");
    });

    it("returns 400 when parent or ancestor is not published", async () => {
      topicService.publishTopicByUniqueId.mockRejectedValue(
        new Error("Cannot publish: parent or an ancestor topic is not published")
      );

      const res = await request(app).put("/topics/u1/publish");

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("Cannot publish");
    });

    it("returns 404 when topic not found", async () => {
      topicService.publishTopicByUniqueId.mockRejectedValue(
        new Error("Topic not found, uniqueId: missing")
      );

      const res = await request(app).put("/topics/missing/publish");

      expect(res.status).toBe(404);
    });

    it("returns 500 for unexpected publish errors", async () => {
      topicService.publishTopicByUniqueId.mockRejectedValue(
        new Error("Database connection lost")
      );

      const res = await request(app).put("/topics/u1/publish");

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("Database connection lost");
    });
  });

  describe("GET /topics/", () => {
    it("calls getAllTopics and returns 200 with array", async () => {
      const topics = [
        { uniqueId: "u1", name: "T1", children: [], ancestors: [] },
      ];
      topicService.getAllTopics.mockResolvedValue(topics);

      const res = await request(app).get("/topics/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(topics);
      expect(topicService.getAllTopics).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when getAllTopics throws", async () => {
      topicService.getAllTopics.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/topics/");

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("DB error");
    });
  });

  describe("GET /topics/export", () => {
    it("calls getAllTopicsForExport and returns 200 with tree including sections", async () => {
      const tree = [
        { uniqueId: "u1", name: "T1", children: [], ancestors: [], sections: [{ uniqueId: "s1", name: "Sec1", linkedTopicUniqueId: "u1" }] },
      ];
      topicService.getAllTopicsForExport.mockResolvedValue(tree);

      const res = await request(app).get("/topics/export");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tree);
      expect(topicService.getAllTopicsForExport).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("topics-export.json");
    });

    it("returns 500 when getAllTopicsForExport throws", async () => {
      topicService.getAllTopicsForExport.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/topics/export");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /topics/export/flat", () => {
    it("calls getAllTopicsFlatForExport and returns 200 with flat array including sections", async () => {
      const flat = [
        { uniqueId: "u1", name: "T1", parentId: null, description: "Topic desc", smartContent: null, tags: [], published: false, ancestors: [], sections: [] },
      ];
      topicService.getAllTopicsFlatForExport.mockResolvedValue(flat);

      const res = await request(app).get("/topics/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(topicService.getAllTopicsFlatForExport).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("topics-export-flat.json");
    });

    it("returns 500 when getAllTopicsFlatForExport throws", async () => {
      topicService.getAllTopicsFlatForExport.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/topics/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /topics/published", () => {
    it("calls getPublishedTopics and returns 200 with tree", async () => {
      const tree = [{ uniqueId: "u1", name: "Published Topic", published: true, children: [] }];
      topicService.getPublishedTopics.mockResolvedValue(tree);

      const res = await request(app).get("/topics/published");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tree);
      expect(topicService.getPublishedTopics).toHaveBeenCalledWith();
    });

    it("returns 500 when getPublishedTopics throws", async () => {
      topicService.getPublishedTopics.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/topics/published");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /topics/:uniqueId", () => {
    it("calls getTopicByUniqueId and returns 200 with topic", async () => {
      const topic = { uniqueId: "u1", name: "T1", children: [], sections: [] };
      topicService.getTopicByUniqueId.mockResolvedValue(topic);

      const res = await request(app).get("/topics/u1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(topic);
      expect(topicService.getTopicByUniqueId).toHaveBeenCalledWith("u1");
    });

    it("returns 404 when getTopicByUniqueId resolves null", async () => {
      topicService.getTopicByUniqueId.mockResolvedValue(null);

      const res = await request(app).get("/topics/missing");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Topic not found" });
    });

    it("returns 500 when getTopicByUniqueId throws", async () => {
      topicService.getTopicByUniqueId.mockRejectedValue(
        new Error("Topic not found")
      );

      const res = await request(app).get("/topics/missing");

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("Topic not found");
    });
  });

  describe("POST /topics/search", () => {
    it("calls searchTopics with searchString and searchOptions, returns 200", async () => {
      const results = [{ uniqueId: "u1", name: "Match" }];
      topicService.searchTopics.mockResolvedValue(results);

      const res = await request(app)
        .post("/topics/search")
        .send({ searchString: "test", searchOptions: {} });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(results);
      expect(topicService.searchTopics).toHaveBeenCalledWith("test", {});
    });

    it("returns 400 when searchString is missing", async () => {
      const res = await request(app).post("/topics/search").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("searchString is required");
    });

    it("returns 500 when searchTopics throws", async () => {
      topicService.searchTopics.mockRejectedValue(new Error("Search failed"));

      const res = await request(app)
        .post("/topics/search")
        .send({ searchString: "x" });

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("An error occurred while searching");
    });
  });

  describe("POST /topics/section", () => {
    it("calls createTopicSection with body and returns 201", async () => {
      const body = {
        linkedTopicUniqueId: "t1",
        name: "Section",
        smartContent: {},
        order: 1,
      };
      const created = { uniqueId: "s1", ...body };
      topicService.createTopicSection.mockResolvedValue(created);

      const res = await request(app).post("/topics/section").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(topicService.createTopicSection).toHaveBeenCalledWith(body);
    });

    it("returns 400 when createTopicSection throws", async () => {
      topicService.createTopicSection.mockRejectedValue(
        new Error("Validation failed")
      );

      const res = await request(app)
        .post("/topics/section")
        .send({ linkedTopicUniqueId: "t1" });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /topics/:uniqueId/sections", () => {
    it("calls getAllTopicSectionsById and returns 201 with sections", async () => {
      const sections = [{ uniqueId: "s1", name: "S1" }];
      topicService.getAllTopicSectionsById.mockResolvedValue(sections);

      const res = await request(app).get("/topics/t1/sections");

      expect(res.status).toBe(201);
      expect(res.body).toEqual(sections);
      expect(topicService.getAllTopicSectionsById).toHaveBeenCalledWith("t1");
    });

    it("returns 400 when getAllTopicSectionsById throws", async () => {
      topicService.getAllTopicSectionsById.mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).get("/topics/t1/sections");

      expect(res.status).toBe(400);
    });
  });

  describe("GET /topics/:uniqueId/sections/:sectionUniqueId", () => {
    it("calls getTopicSectionsById and returns 201 with section", async () => {
      const section = { uniqueId: "s1", name: "S1", linkedTopicUniqueId: "t1" };
      topicService.getTopicSectionsById.mockResolvedValue(section);

      const res = await request(app).get("/topics/t1/sections/s1");

      expect(res.status).toBe(201);
      expect(res.body).toEqual(section);
      expect(topicService.getTopicSectionsById).toHaveBeenCalledWith(
        "t1",
        "s1"
      );
    });

    it("returns 400 when getTopicSectionsById throws", async () => {
      topicService.getTopicSectionsById.mockRejectedValue(
        new Error("TopicSection not found")
      );

      const res = await request(app).get("/topics/t1/sections/missing");

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /topics/:uniqueId/sections/:sectionUniqueId", () => {
    it("calls updateTopicSectionsById and returns 201 with updated section", async () => {
      const body = { name: "Updated Section" };
      const updated = { uniqueId: "s1", name: "Updated Section" };
      topicService.updateTopicSectionsById.mockResolvedValue(updated);

      const res = await request(app)
        .put("/topics/t1/sections/s1")
        .send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(updated);
      expect(topicService.updateTopicSectionsById).toHaveBeenCalledWith(
        "t1",
        "s1",
        body
      );
    });

    it("returns 400 when updateTopicSectionsById throws", async () => {
      topicService.updateTopicSectionsById.mockRejectedValue(
        new Error("TopicSection not found")
      );

      const res = await request(app)
        .put("/topics/t1/sections/missing")
        .send({ name: "X" });

      expect(res.status).toBe(400);
    });
  });
});
