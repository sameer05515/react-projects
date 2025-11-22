const express = require("express");
const request = require("supertest");
const userRouter = require("./User.routes");

jest.mock("./User.service", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  getAllUsers: jest.fn(),
  updateUserRole: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
}));

const userService = require("./User.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", userRouter);
  return app;
}

describe("User.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /users/register", () => {
    it("calls registerUser with body and returns 201 with message and token", async () => {
      const body = { username: "u", password: "p", email: "e@e.com" };
      userService.registerUser.mockResolvedValue({
        message: "User registered successfully",
        token: "jwt",
      });

      const res = await request(app).post("/users/register").send(body);

      expect(res.status).toBe(201);
      expect(res.body.token).toBe("jwt");
      expect(userService.registerUser).toHaveBeenCalledWith(body);
    });

    it("returns 500 when registerUser throws", async () => {
      userService.registerUser.mockRejectedValue(new Error("Username taken"));

      const res = await request(app)
        .post("/users/register")
        .send({ username: "u", password: "p", email: "e" });

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("Username taken");
    });
  });

  describe("POST /users/login", () => {
    it("calls loginUser and returns 200 with token", async () => {
      userService.loginUser.mockResolvedValue("jwt-token");

      const res = await request(app)
        .post("/users/login")
        .send({ username: "u", password: "p" });

      expect(res.status).toBe(200);
      expect(res.body.token).toBe("jwt-token");
      expect(userService.loginUser).toHaveBeenCalledWith("u", "p");
    });

    it("returns 401 when loginUser throws", async () => {
      userService.loginUser.mockRejectedValue(new Error("Invalid credentials"));

      const res = await request(app)
        .post("/users/login")
        .send({ username: "u", password: "p" });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /users/", () => {
    it("calls getAllUsers and returns 200 with array", async () => {
      const users = [{ _id: "1", username: "u1" }];
      userService.getAllUsers.mockResolvedValue(users);

      const res = await request(app).get("/users/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(users);
    });

    it("returns 500 when getAllUsers throws", async () => {
      userService.getAllUsers.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/users/");

      expect(res.status).toBe(500);
    });
  });

  describe("PUT /users/:userId/admin", () => {
    it("calls updateUserRole and returns 200", async () => {
      const user = { _id: "1", role: "admin" };
      userService.updateUserRole.mockResolvedValue(user);

      const res = await request(app).put("/users/id1/admin");

      expect(res.status).toBe(200);
      expect(res.body.role).toBe("admin");
      expect(userService.updateUserRole).toHaveBeenCalledWith("id1");
    });

    it("returns 500 when updateUserRole throws", async () => {
      userService.updateUserRole.mockRejectedValue(new Error("User not found"));

      const res = await request(app).put("/users/missing/admin");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /users/:userId", () => {
    it("calls getUserById and returns 200 with user", async () => {
      const user = { _id: "1", username: "u1" };
      userService.getUserById.mockResolvedValue(user);

      const res = await request(app).get("/users/id1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(user);
    });

    it("returns 500 when getUserById throws", async () => {
      userService.getUserById.mockRejectedValue(new Error("User not found"));

      const res = await request(app).get("/users/missing");

      expect(res.status).toBe(500);
    });
  });

  describe("PUT /users/:userId", () => {
    it("calls updateUserById with params and body, returns 200", async () => {
      const user = { _id: "1", username: "updated" };
      userService.updateUserById.mockResolvedValue(user);

      const res = await request(app).put("/users/id1").send({ username: "updated" });

      expect(res.status).toBe(200);
      expect(userService.updateUserById).toHaveBeenCalledWith("id1", {
        username: "updated",
      });
    });

    it("returns 500 when updateUserById throws", async () => {
      userService.updateUserById.mockRejectedValue(new Error("User not found"));

      const res = await request(app).put("/users/missing").send({});

      expect(res.status).toBe(500);
    });
  });
});
