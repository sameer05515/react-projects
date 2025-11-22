const express = require("express");
const request = require("supertest");
const docRouter = require("./doc.routes");

jest.mock("./doc.service", () => ({
  getFileHtmlContent: jest.fn(),
  wrapHTMLContent: jest.fn((style, html) => `<!DOCTYPE html><body>${html}</body>`),
  isResourceAvailable: jest.fn(),
  getCSSStyle: jest.fn().mockReturnValue("https://dark.css"),
}));

const docService = require("./doc.service");

function createApp() {
  const app = express();
  app.use("", docRouter);
  return app;
}

describe("doc.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    docService.getCSSStyle.mockReturnValue("https://dark.css");
    docService.wrapHTMLContent.mockImplementation((style, html) =>
      `<!DOCTYPE html><body>${html}</body>`
    );
  });

  describe("GET /help", () => {
    it("uses default resource index when resource not provided", async () => {
      docService.isResourceAvailable.mockReturnValue(true);
      docService.getFileHtmlContent.mockReturnValue("<p>Index</p>");

      const res = await request(app).get("/help");

      expect(docService.isResourceAvailable).toHaveBeenCalledWith("index");
      expect(docService.getFileHtmlContent).toHaveBeenCalledWith("index.md");
      expect(res.status).toBe(200);
      expect(res.text).toContain("Index");
    });

    it("uses query resource and viewStyles when provided", async () => {
      docService.isResourceAvailable.mockReturnValue(true);
      docService.getCSSStyle.mockReturnValue("https://light.css");
      docService.getFileHtmlContent.mockReturnValue("<p>Categories</p>");

      const res = await request(app).get("/help?resource=categories&viewStyles=light");

      expect(docService.getCSSStyle).toHaveBeenCalledWith("light");
      expect(docService.isResourceAvailable).toHaveBeenCalledWith("categories");
      expect(docService.getFileHtmlContent).toHaveBeenCalledWith("categories.md");
      expect(res.status).toBe(200);
    });

    it("sends wrapped HTML when resource is available", async () => {
      docService.isResourceAvailable.mockReturnValue(true);
      docService.getFileHtmlContent.mockReturnValue("<h1>Doc</h1>");

      const res = await request(app).get("/help?resource=index");

      expect(docService.wrapHTMLContent).toHaveBeenCalled();
      expect(res.text).toContain("<h1>Doc</h1>");
    });

    it("sends not-available message when resource is not available", async () => {
      docService.isResourceAvailable.mockReturnValue(false);

      const res = await request(app).get("/help?resource=unknown");

      expect(docService.getFileHtmlContent).not.toHaveBeenCalled();
      expect(res.text).toContain("not available");
      expect(res.text).toContain("unknown");
    });
  });
});
