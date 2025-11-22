const express = require("express");
const request = require("supertest");
const exportRouter = require("./Export.routes");

jest.mock("../topic/Topic.service", () => ({ getAllTopicsFlatForExport: jest.fn() }));
jest.mock("../task/Task.service", () => ({ getAllTasksFlat: jest.fn() }));
jest.mock("../tag/Tag.service", () => ({ getAllTagsFlat: jest.fn() }));
jest.mock("../tweet/Tweet.v2.service", () => ({ getAllTweets: jest.fn() }));
jest.mock("../memory-map/MemoryMap.service", () => ({ getAllMemoryMapsFlat: jest.fn() }));
jest.mock("../interview-mgmt/InterviewMgmt.v2.service", () => ({ getAllQuestionsFlat: jest.fn() }));
jest.mock("../pinned-item/PinnedItem.service", () => ({ getAllPinnedItemsFlat: jest.fn() }));
jest.mock("../link/Link.service", () => ({ getAllLinksFlat: jest.fn() }));

const topicService = require("../topic/Topic.service");
const taskService = require("../task/Task.service");
const tagService = require("../tag/Tag.service");
const tweetService = require("../tweet/Tweet.v2.service");
const memoryMapService = require("../memory-map/MemoryMap.service");
const interviewMgmtService = require("../interview-mgmt/InterviewMgmt.v2.service");
const pinnedItemService = require("../pinned-item/PinnedItem.service");
const linkService = require("../link/Link.service");

function createApp() {
  const app = express();
  app.use("/export", exportRouter);
  return app;
}

describe("Export.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    topicService.getAllTopicsFlatForExport.mockResolvedValue([]);
    taskService.getAllTasksFlat.mockResolvedValue([]);
    tagService.getAllTagsFlat.mockResolvedValue([]);
    tweetService.getAllTweets.mockResolvedValue([]);
    memoryMapService.getAllMemoryMapsFlat.mockResolvedValue([]);
    interviewMgmtService.getAllQuestionsFlat.mockResolvedValue([]);
    pinnedItemService.getAllPinnedItemsFlat.mockResolvedValue([]);
    linkService.getAllLinksFlat.mockResolvedValue([]);
  });

  describe("GET /export/all-zip", () => {
    it("calls all eight export services and returns 200 with zip content-type", async () => {
      const res = await request(app).get("/export/all-zip");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/application\/zip/);
      expect(res.headers["content-disposition"]).toMatch(/attachment.*export-all-\d{4}-\d{2}-\d{2}\.zip/);
      expect(topicService.getAllTopicsFlatForExport).toHaveBeenCalledWith();
      expect(taskService.getAllTasksFlat).toHaveBeenCalledWith();
      expect(tagService.getAllTagsFlat).toHaveBeenCalledWith();
      expect(tweetService.getAllTweets).toHaveBeenCalledWith();
      expect(memoryMapService.getAllMemoryMapsFlat).toHaveBeenCalledWith();
      expect(interviewMgmtService.getAllQuestionsFlat).toHaveBeenCalledWith();
      expect(pinnedItemService.getAllPinnedItemsFlat).toHaveBeenCalledWith();
      expect(linkService.getAllLinksFlat).toHaveBeenCalledWith();
    });

    it("returns 500 when a service throws", async () => {
      topicService.getAllTopicsFlatForExport.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/export/all-zip");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "DB error");
    });
  });
});
