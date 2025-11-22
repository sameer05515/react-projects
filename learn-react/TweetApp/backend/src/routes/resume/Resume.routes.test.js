// Resume.routes.test.js
const express = require("express");
const request = require("supertest");
const resumeRouter = require("./Resume.routes");

jest.mock("./Resume.service", () => ({
  createResume: jest.fn(),
  updateResumeById: jest.fn(),
  getAllResumes: jest.fn(),
  getResumeById: jest.fn(),
  updateProjectById: jest.fn(),
}));

const resumeService = require("./Resume.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/resumes", resumeRouter);
  return app;
}

describe("Resume.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /resumes", () => {
    it("calls createResume and returns 201", async () => {
      const body = { title: "My Resume" };
      const created = { _id: "id1", ...body };
      resumeService.createResume.mockResolvedValue(created);

      const res = await request(app).post("/resumes").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(resumeService.createResume).toHaveBeenCalledWith(body);
    });

    it("returns 400 when createResume throws", async () => {
      resumeService.createResume.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/resumes").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Error creating resume");
    });
  });

  describe("PUT /resumes/:id", () => {
    it("calls updateResumeById and returns 200", async () => {
      const updated = { _id: "id1", title: "Updated" };
      resumeService.updateResumeById.mockResolvedValue(updated);

      const res = await request(app).put("/resumes/id1").send({ title: "Updated" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(resumeService.updateResumeById).toHaveBeenCalledWith("id1", {
        title: "Updated",
      });
    });

    it("returns 404 when updateResumeById returns null", async () => {
      resumeService.updateResumeById.mockResolvedValue(null);

      const res = await request(app).put("/resumes/missing").send({});

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Resume not found");
    });

    it("returns 400 when updateResumeById throws", async () => {
      resumeService.updateResumeById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).put("/resumes/id1").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Error updating resume");
    });
  });

  describe("GET /resumes", () => {
    it("calls getAllResumes and returns 200 with array", async () => {
      const list = [{ _id: "id1", title: "R1" }];
      resumeService.getAllResumes.mockResolvedValue(list);

      const res = await request(app).get("/resumes");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(list);
    });

    it("returns 500 when getAllResumes throws", async () => {
      resumeService.getAllResumes.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/resumes");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Error fetching resumes");
    });
  });

  describe("GET /resumes/:id", () => {
    it("calls getResumeById and returns 200", async () => {
      const doc = { _id: "id1", title: "R1" };
      resumeService.getResumeById.mockResolvedValue(doc);

      const res = await request(app).get("/resumes/id1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(doc);
      expect(resumeService.getResumeById).toHaveBeenCalledWith("id1");
    });

    it("returns 404 when getResumeById returns null", async () => {
      resumeService.getResumeById.mockResolvedValue(null);

      const res = await request(app).get("/resumes/missing");

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Resume not found");
    });

    it("returns 500 when getResumeById throws", async () => {
      resumeService.getResumeById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/resumes/id1");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Error fetching resume");
    });
  });

  describe("PUT /resumes/:resumeId/projects/:projectId", () => {
    it("calls updateProjectById and returns 200", async () => {
      const project = { _id: "p1", name: "P1" };
      resumeService.updateProjectById.mockResolvedValue(project);

      const res = await request(app)
        .put("/resumes/rid/projects/pid")
        .send({ name: "P1" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(project);
      expect(resumeService.updateProjectById).toHaveBeenCalledWith(
        "rid",
        "pid",
        { name: "P1" }
      );
    });

    it("returns 404 when updateProjectById returns null", async () => {
      resumeService.updateProjectById.mockResolvedValue(null);

      const res = await request(app).put("/resumes/rid/projects/pid").send({});

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Project not found");
    });

    it("returns 400 when updateProjectById throws", async () => {
      resumeService.updateProjectById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).put("/resumes/rid/projects/pid").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Error updating project");
    });
  });
});
