const express = require("express");
const request = require("supertest");
const activityRouter = require("./Activity.routes");

jest.mock("./Activity.service", () => ({
  createActivity: jest.fn(),
  getAllActivities: jest.fn(),
  getActivityById: jest.fn(),
  updateActivityById: jest.fn(),
  deleteActivityById: jest.fn(),
}));

const activityService = require("./Activity.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/activities", activityRouter);
  return app;
}

describe("Activity.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /activities/", () => {
    it("calls createActivity with body and returns 200 with created activity", async () => {
      const body = {
        activityName: "Run",
        activityDescription: "Daily run",
        recurrence: "daily",
      };
      const created = { id: "a1", ...body };
      activityService.createActivity.mockResolvedValue(created);

      const res = await request(app).post("/activities/").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(created);
      expect(activityService.createActivity).toHaveBeenCalledWith(body);
    });

    it("returns 400 when createActivity throws", async () => {
      activityService.createActivity.mockRejectedValue(
        new Error("Validation failed")
      );

      const res = await request(app).post("/activities/").send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Validation failed");
    });
  });

  describe("GET /activities/", () => {
    it("calls getAllActivities and returns 200 with array", async () => {
      const activities = [
        { id: "a1", activityName: "A1" },
        { id: "a2", activityName: "A2" },
      ];
      activityService.getAllActivities.mockResolvedValue(activities);

      const res = await request(app).get("/activities/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(activities);
      expect(activityService.getAllActivities).toHaveBeenCalledTimes(1);
    });

    it("returns 500 when getAllActivities throws", async () => {
      activityService.getAllActivities.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/activities/");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });

  describe("GET /activities/:id", () => {
    it("calls getActivityById and returns 200 with activity", async () => {
      const activity = { id: "a1", activityName: "Run" };
      activityService.getActivityById.mockResolvedValue(activity);

      const res = await request(app).get("/activities/a1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(activity);
      expect(activityService.getActivityById).toHaveBeenCalledWith("a1");
    });

    it("returns 404 when getActivityById returns null", async () => {
      activityService.getActivityById.mockResolvedValue(null);

      const res = await request(app).get("/activities/missing");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Activity not found");
    });

    it("returns 500 when getActivityById throws", async () => {
      activityService.getActivityById.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/activities/a1");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });

  describe("PUT /activities/:id", () => {
    it("calls updateActivityById with params and body, returns 200", async () => {
      const body = { activityName: "Updated" };
      const updated = { id: "a1", activityName: "Updated" };
      activityService.updateActivityById.mockResolvedValue(updated);

      const res = await request(app).put("/activities/a1").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(activityService.updateActivityById).toHaveBeenCalledWith(
        "a1",
        body
      );
    });

    it("returns 404 when updateActivityById returns null", async () => {
      activityService.updateActivityById.mockResolvedValue(null);

      const res = await request(app).put("/activities/missing").send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Activity not found");
    });

    it("returns 400 when updateActivityById throws", async () => {
      activityService.updateActivityById.mockRejectedValue(
        new Error("Validation failed")
      );

      const res = await request(app).put("/activities/a1").send({});

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /activities/:id", () => {
    it("calls deleteActivityById and returns 200 with success message", async () => {
      activityService.deleteActivityById.mockResolvedValue({
        id: "a1",
        activityName: "Deleted",
      });

      const res = await request(app).delete("/activities/a1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Activity deleted successfully" });
      expect(activityService.deleteActivityById).toHaveBeenCalledWith("a1");
    });

    it("returns 404 when deleteActivityById returns null", async () => {
      activityService.deleteActivityById.mockResolvedValue(null);

      const res = await request(app).delete("/activities/missing");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Activity not found");
    });

    it("returns 500 when deleteActivityById throws", async () => {
      activityService.deleteActivityById.mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).delete("/activities/a1");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });
});
