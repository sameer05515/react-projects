const express = require("express");
const request = require("supertest");
const tweetV1Router = require("./Tweet.v1.routes");

jest.mock("./Tweet.v1.service", () => ({
  getAllTweets: jest.fn(),
  getTweetById: jest.fn(),
  createTweet: jest.fn(),
  updateTweetById: jest.fn(),
  addCommentToTweet: jest.fn(),
  updateCommentInTweet: jest.fn(),
  addNestedCommentToTweet: jest.fn(),
  updateNestedCommentInTweet: jest.fn(),
}));

const tweetService = require("./Tweet.v1.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/tweets/v1", tweetV1Router);
  return app;
}

describe("Tweet.v1.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /tweets/v1/", () => {
    it("calls getAllTweets and returns 200 with array", async () => {
      const tweets = [{ _id: "1", content: "hi" }];
      tweetService.getAllTweets.mockResolvedValue(tweets);

      const res = await request(app).get("/tweets/v1/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tweets);
    });

    it("returns 500 when getAllTweets throws", async () => {
      tweetService.getAllTweets.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tweets/v1/");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Error fetching tweets");
    });
  });

  describe("GET /tweets/v1/:id", () => {
    it("calls getTweetById and returns 200 with tweet", async () => {
      const tweet = { _id: "1", content: "hi" };
      tweetService.getTweetById.mockResolvedValue(tweet);

      const res = await request(app).get("/tweets/v1/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tweet);
    });

    it("returns 500 when getTweetById throws", async () => {
      tweetService.getTweetById.mockRejectedValue(new Error("Tweet not found"));

      const res = await request(app).get("/tweets/v1/missing");

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("Error fetching tweet");
    });
  });

  describe("POST /tweets/v1/", () => {
    it("calls createTweet and returns 201", async () => {
      const body = { content: "new", author: "u" };
      const created = { _id: "1", ...body };
      tweetService.createTweet.mockResolvedValue(created);

      const res = await request(app).post("/tweets/v1/").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
    });

    it("returns 400 when createTweet throws", async () => {
      tweetService.createTweet.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app).post("/tweets/v1/").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Error creating tweet");
    });
  });

  describe("PUT /tweets/v1/:id", () => {
    it("calls updateTweetById and returns 200", async () => {
      const updated = { _id: "1", content: "updated" };
      tweetService.updateTweetById.mockResolvedValue(updated);

      const res = await request(app).put("/tweets/v1/1").send({ content: "updated" });

      expect(res.status).toBe(200);
      expect(tweetService.updateTweetById).toHaveBeenCalledWith("1", {
        content: "updated",
      });
    });
  });

  describe("POST /tweets/v1/:tweetId/comments", () => {
    it("calls addCommentToTweet and returns 201", async () => {
      const tweet = { _id: "t1", comments: [{ text: "c1" }] };
      tweetService.addCommentToTweet.mockResolvedValue(tweet);

      const res = await request(app)
        .post("/tweets/v1/t1/comments")
        .send({ text: "c1" });

      expect(res.status).toBe(201);
      expect(tweetService.addCommentToTweet).toHaveBeenCalledWith("t1", {
        text: "c1",
      });
    });
  });

  describe("PUT /tweets/v1/:tweetId/comments/:commentId", () => {
    it("calls updateCommentInTweet and returns 200", async () => {
      tweetService.updateCommentInTweet.mockResolvedValue({});

      const res = await request(app)
        .put("/tweets/v1/t1/comments/c1")
        .send({ text: "updated" });

      expect(res.status).toBe(200);
      expect(tweetService.updateCommentInTweet).toHaveBeenCalledWith(
        "t1",
        "c1",
        { text: "updated" }
      );
    });
  });

  describe("POST /tweets/v1/:tweetId/comments/:commentId/nested", () => {
    it("calls addNestedCommentToTweet and returns 201", async () => {
      tweetService.addNestedCommentToTweet.mockResolvedValue({});

      const res = await request(app)
        .post("/tweets/v1/t1/comments/c1/nested")
        .send({ text: "nested" });

      expect(res.status).toBe(201);
      expect(tweetService.addNestedCommentToTweet).toHaveBeenCalledWith(
        "t1",
        "c1",
        { text: "nested" }
      );
    });
  });

  describe("PUT /tweets/v1/:tweetId/comments/:commentId/nested/:nestedCommentId", () => {
    it("calls updateNestedCommentInTweet and returns 200", async () => {
      tweetService.updateNestedCommentInTweet.mockResolvedValue({});

      const res = await request(app)
        .put("/tweets/v1/t1/comments/c1/nested/n1")
        .send({ text: "updated" });

      expect(res.status).toBe(200);
      expect(tweetService.updateNestedCommentInTweet).toHaveBeenCalledWith(
        "t1",
        "c1",
        "n1",
        { text: "updated" }
      );
    });
  });
});
