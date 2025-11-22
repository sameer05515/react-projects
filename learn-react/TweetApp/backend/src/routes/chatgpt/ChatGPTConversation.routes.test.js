const express = require("express");
const request = require("supertest");
const chatGPTRouter = require("./ChatGPTConversation.routes");

jest.mock("./ChatGPTConversation.service", () => ({
  getAllCategories: jest.fn(),
  getCategoryForUniqueId: jest.fn(),
  getCGPTFileForUIDAndConvUID: jest.fn(),
  getCGPTFileForUIDAndConvUIDAndMsgUID: jest.fn(),
  getConversationsForConvUID: jest.fn(),
  getMessagesForMsgUID: jest.fn(),
}));

const chatGPTConversation = require("./ChatGPTConversation.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/cgpt", chatGPTRouter);
  return app;
}

describe("ChatGPTConversation.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /cgpt/f", () => {
    it("returns 200 and json from getAllCategories", async () => {
      const data = [{ uniqueId: "f1", name: "File1" }];
      chatGPTConversation.getAllCategories.mockResolvedValue(data);

      const res = await request(app).get("/cgpt/f");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(data);
      expect(chatGPTConversation.getAllCategories).toHaveBeenCalledTimes(1);
    });

    it("returns 500 and error message when service throws", async () => {
      chatGPTConversation.getAllCategories.mockRejectedValue(
        new Error("DB error")
      );

      const res = await request(app).get("/cgpt/f");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });

  describe("GET /cgpt/f/:uniqueId", () => {
    it("calls getCategoryForUniqueId with param and returns 200", async () => {
      const data = { uniqueId: "f1", conversations: [] };
      chatGPTConversation.getCategoryForUniqueId.mockResolvedValue(data);

      const res = await request(app).get("/cgpt/f/my-file-id");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(data);
      expect(chatGPTConversation.getCategoryForUniqueId).toHaveBeenCalledWith(
        "my-file-id"
      );
    });

    it("returns 500 when service throws", async () => {
      chatGPTConversation.getCategoryForUniqueId.mockRejectedValue(
        new Error("File not found")
      );

      const res = await request(app).get("/cgpt/f/missing");

      expect(res.status).toBe(500);
      expect(res.body.error).toContain("File not found");
    });
  });

  describe("GET /cgpt/f/:uniqueId/c/:convUID", () => {
    it("calls getCGPTFileForUIDAndConvUID and returns 200", async () => {
      const data = { uniqueId: "f1", conversations: [], messages: [] };
      chatGPTConversation.getCGPTFileForUIDAndConvUID.mockResolvedValue(data);

      const res = await request(app).get("/cgpt/f/f1/c/c1");

      expect(res.status).toBe(200);
      expect(chatGPTConversation.getCGPTFileForUIDAndConvUID).toHaveBeenCalledWith(
        "f1",
        "c1"
      );
    });
  });

  describe("GET /cgpt/f/:uniqueId/c/:convUID/m/:msgUID", () => {
    it("calls getCGPTFileForUIDAndConvUIDAndMsgUID and returns 200", async () => {
      const data = { uniqueId: "f1", conversations: [], messages: [] };
      chatGPTConversation.getCGPTFileForUIDAndConvUIDAndMsgUID.mockResolvedValue(
        data
      );

      const res = await request(app).get("/cgpt/f/f1/c/c1/m/m1");

      expect(res.status).toBe(200);
      expect(
        chatGPTConversation.getCGPTFileForUIDAndConvUIDAndMsgUID
      ).toHaveBeenCalledWith("f1", "c1", "m1");
    });
  });

  describe("GET /cgpt/c/:convUID", () => {
    it("calls getConversationsForConvUID and returns 200", async () => {
      const data = { conversations: [{ uniqueId: "c1" }] };
      chatGPTConversation.getConversationsForConvUID.mockResolvedValue(data);

      const res = await request(app).get("/cgpt/c/conv-1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(data);
      expect(
        chatGPTConversation.getConversationsForConvUID
      ).toHaveBeenCalledWith("conv-1");
    });
  });

  describe("GET /cgpt/m/:msgUID", () => {
    it("calls getMessagesForMsgUID and returns 200", async () => {
      const data = { messages: [{ uniqueId: "m1" }] };
      chatGPTConversation.getMessagesForMsgUID.mockResolvedValue(data);

      const res = await request(app).get("/cgpt/m/msg-1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(data);
      expect(chatGPTConversation.getMessagesForMsgUID).toHaveBeenCalledWith(
        "msg-1"
      );
    });
  });
});
