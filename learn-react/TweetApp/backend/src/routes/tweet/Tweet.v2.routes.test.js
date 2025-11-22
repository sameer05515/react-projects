const express = require("express");
const request = require("supertest");
const tweetV2Router = require("./Tweet.v2.routes");

jest.mock("./Tweet.v2.service", () => ({
  getAllTweets: jest.fn(),
  getTweetById: jest.fn(),
  createTweet: jest.fn(),
  updateTweetById: jest.fn(),
  addCommentToTweet: jest.fn(),
  updateCommentInTweet: jest.fn(),
  addNestedCommentToTweet: jest.fn(),
  updateNestedCommentInTweet: jest.fn(),
}));

const tweetService = require("./Tweet.v2.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/tweets/v2", tweetV2Router);
  return app;
}

describe("Tweet.v2.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /tweets/v2/", () => {
    it("calls getAllTweets and returns 200 with standard response", async () => {
      const tweets = [{ _id: "1", content: "hi" }];
      tweetService.getAllTweets.mockResolvedValue(tweets);

      const res = await request(app).get("/tweets/v2/");

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(tweets);
      expect(res.body.status).toBe("SUCCESS");
    });

    it("returns error response when getAllTweets throws", async () => {
      tweetService.getAllTweets.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tweets/v2/");

      expect(res.status).toBe(500);
      expect(res.body.status).toBe("ERROR");
    });
  });

  describe("GET /tweets/v2/export/flat", () => {
    it("calls getAllTweets and returns 200 with flat array and attachment header", async () => {
      const tweets = [{ _id: "1", content: "hi", author: "u" }];
      tweetService.getAllTweets.mockResolvedValue(tweets);

      const res = await request(app).get("/tweets/v2/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tweets);
      expect(res.headers["content-disposition"]).toContain("tweets-export-flat.json");
      expect(tweetService.getAllTweets).toHaveBeenCalledWith();
    });

    it("returns 500 when getAllTweets throws", async () => {
      tweetService.getAllTweets.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/tweets/v2/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /tweets/v2/:id", () => {
    it("calls getTweetById and returns 200 with data", async () => {
      const tweet = { _id: "1", content: "hi" };
      tweetService.getTweetById.mockResolvedValue(tweet);

      const res = await request(app).get("/tweets/v2/1");

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(tweet);
    });
  });

  describe("POST /tweets/v2/", () => {
    it("calls createTweet and returns 201 with data", async () => {
      const body = { content: "new", author: "u" };
      const created = { _id: "1", ...body };
      tweetService.createTweet.mockResolvedValue(created);

      const res = await request(app).post("/tweets/v2/").send(body);

      expect(res.status).toBe(201);
      expect(res.body.data).toEqual(created);
    });
  });

  describe("PUT /tweets/v2/:id", () => {
    it("calls updateTweetById and returns 200", async () => {
      const updated = { _id: "1", content: "updated" };
      tweetService.updateTweetById.mockResolvedValue(updated);

      const res = await request(app).put("/tweets/v2/1").send({ content: "updated" });

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(updated);
    });
  });

  describe("POST /tweets/v2/:tweetId/comments", () => {
    it("calls addCommentToTweet and returns 201", async () => {
      const tweet = { _id: "t1", comments: [] };
      tweetService.addCommentToTweet.mockResolvedValue(tweet);

      const res = await request(app)
        .post("/tweets/v2/t1/comments")
        .send({ text: "c1" });

      expect(res.status).toBe(201);
      expect(tweetService.addCommentToTweet).toHaveBeenCalledWith("t1", {
        text: "c1",
      });
    });
  });

  describe("PUT /tweets/v2/:tweetId/comments/:commentId", () => {
    it("calls updateCommentInTweet and returns 200", async () => {
      tweetService.updateCommentInTweet.mockResolvedValue({});

      const res = await request(app)
        .put("/tweets/v2/t1/comments/c1")
        .send({ text: "updated" });

      expect(res.status).toBe(200);
    });
  });

  describe("POST /tweets/v2/:tweetId/comments/:commentId/nested", () => {
    it("calls addNestedCommentToTweet and returns 201", async () => {
      tweetService.addNestedCommentToTweet.mockResolvedValue({});

      const res = await request(app)
        .post("/tweets/v2/t1/comments/c1/nested")
        .send({ text: "nested" });

      expect(res.status).toBe(201);
    });
  });

  describe("PUT /tweets/v2/:tweetId/comments/:commentId/nested/:nestedCommentId", () => {
    it("calls updateNestedCommentInTweet and returns 200", async () => {
      tweetService.updateNestedCommentInTweet.mockResolvedValue({});

      const res = await request(app)
        .put("/tweets/v2/t1/comments/c1/nested/n1")
        .send({ text: "updated" });

      expect(res.status).toBe(200);
    });
  });
});
