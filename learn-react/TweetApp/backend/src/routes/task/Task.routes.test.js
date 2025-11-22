const express = require("express");
const request = require("supertest");
const taskRouter = require("./Task.routes");

jest.mock("./Task.service", () => ({
  getAllTasks: jest.fn(),
  getAllTasksFlat: jest.fn(),
  getTaskById: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

const taskService = require("./Task.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/tasks", taskRouter);
  return app;
}

describe("Task.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /tasks/", () => {
    it("calls getAllTasks and returns 200 with array", async () => {
      const tasks = [
        { uniqueId: "u1", name: "T1", children: [], taskStatus: "In Progress" },
      ];
      taskService.getAllTasks.mockResolvedValue(tasks);

      const res = await request(app).get("/tasks/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tasks);
      expect(taskService.getAllTasks).toHaveBeenCalledTimes(1);
    });

    it("returns 500 with message when getAllTasks throws", async () => {
      taskService.getAllTasks.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tasks/");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "DB error");
    });
  });

  describe("GET /tasks/export/flat", () => {
    it("calls getAllTasksFlat and returns 200 with flat array", async () => {
      const flat = [
        { uniqueId: "u1", name: "T1", parentId: null, taskStatus: "In Progress", descriptions: [], tags: [], ancestors: [] },
      ];
      taskService.getAllTasksFlat.mockResolvedValue(flat);

      const res = await request(app).get("/tasks/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(taskService.getAllTasksFlat).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("tasks-export-flat.json");
    });

    it("returns 500 when getAllTasksFlat throws", async () => {
      taskService.getAllTasksFlat.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tasks/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /tasks/:id", () => {
    it("calls getTaskById and returns 200 with task", async () => {
      const task = { uniqueId: "u1", name: "T1", children: [], ancestors: [] };
      taskService.getTaskById.mockResolvedValue(task);

      const res = await request(app).get("/tasks/u1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(task);
      expect(taskService.getTaskById).toHaveBeenCalledWith("u1");
    });

    it("returns 500 when getTaskById throws", async () => {
      taskService.getTaskById.mockRejectedValue(new Error("Task not found"));

      const res = await request(app).get("/tasks/missing");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Task not found");
    });
  });

  describe("POST /tasks/", () => {
    it("calls createTask with body and returns 201 with created task", async () => {
      const body = { name: "New Task", parentId: "", tags: [] };
      const created = { uniqueId: "u1", ...body };
      taskService.createTask.mockResolvedValue(created);

      const res = await request(app).post("/tasks/").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(taskService.createTask).toHaveBeenCalledWith(body);
    });

    it("returns 400 with message when createTask throws", async () => {
      taskService.createTask.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/tasks/").send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Validation failed");
    });
  });

  describe("PUT /tasks/:id", () => {
    it("calls updateTask with params and body, returns 200 with task", async () => {
      const body = { name: "Updated" };
      const updated = { uniqueId: "u1", name: "Updated" };
      taskService.updateTask.mockResolvedValue(updated);

      const res = await request(app).put("/tasks/id123").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(taskService.updateTask).toHaveBeenCalledWith("id123", body);
    });

    it("returns 400 when updateTask throws", async () => {
      taskService.updateTask.mockRejectedValue(new Error("Task not found"));

      const res = await request(app).put("/tasks/missing").send({ name: "X" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Task not found");
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("calls deleteTask and returns 404 when deleteTask resolves (service returns undefined)", async () => {
      taskService.deleteTask.mockResolvedValue(undefined);

      const res = await request(app).delete("/tasks/id123");

      expect(taskService.deleteTask).toHaveBeenCalledWith("id123");
      expect(res.status).toBe(404);
    });

    it("returns 500 when deleteTask throws", async () => {
      taskService.deleteTask.mockRejectedValue(new Error("Task not found"));

      const res = await request(app).delete("/tasks/missing");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Task not found");
    });
  });
});
