const express = require("express");
const request = require("supertest");
const linkRouter = require("./Link.routes");

jest.mock("./Link.service", () => ({
  createLink: jest.fn(),
  getLinks: jest.fn(),
  getAllLinksFlat: jest.fn(),
  getLinkByUniqueId: jest.fn(),
  getLinkChildren: jest.fn(),
  getAllAncestors: jest.fn(),
  updateLinkByUniqueId: jest.fn(),
  deleteLinkByUniqueId: jest.fn(),
}));

const linkService = require("./Link.service");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/links", linkRouter);
  return app;
}

describe("Link.routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /links", () => {
    it("calls createLink with body and returns 201 with created link", async () => {
      const body = {
        name: "New Link",
        linkType: "EXTERNAL-WEB",
        linkUrl: "https://example.com",
      };
      const created = { ...body, uniqueId: "u1" };
      linkService.createLink.mockResolvedValue(created);

      const res = await request(app).post("/links").send(body);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(linkService.createLink).toHaveBeenCalledWith(body);
    });

    it("returns 400 with error message when createLink throws", async () => {
      linkService.createLink.mockRejectedValue(new Error("Validation failed"));

      const res = await request(app)
        .post("/links")
        .send({ name: "X", linkType: "X", linkUrl: "url" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Validation failed");
    });
  });

  describe("GET /links", () => {
    it("calls getLinks(null, selectFields) and returns 200 with array", async () => {
      const links = [{ uniqueId: "u1", name: "Link1", parentId: null }];
      linkService.getLinks.mockResolvedValue(links);

      const res = await request(app).get("/links");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(links);
      expect(linkService.getLinks).toHaveBeenCalledWith(null, {
        uniqueId: 1,
        name: 1,
        parentId: 1,
      });
    });

    it("returns 500 when getLinks throws", async () => {
      linkService.getLinks.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/links");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB error");
    });
  });

  describe("GET /links/export/flat", () => {
    it("calls getAllLinksFlat and returns 200 with flat array", async () => {
      const flat = [
        { uniqueId: "u1", name: "Link1", parentId: null, linkType: "EXTERNAL", linkUrl: "https://x.com", description: "", descriptions: [], ancestors: [] },
      ];
      linkService.getAllLinksFlat.mockResolvedValue(flat);

      const res = await request(app).get("/links/export/flat");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(flat);
      expect(linkService.getAllLinksFlat).toHaveBeenCalledWith();
      expect(res.headers["content-disposition"]).toContain("links-export-flat.json");
    });

    it("returns 500 when getAllLinksFlat throws", async () => {
      linkService.getAllLinksFlat.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/links/export/flat");

      expect(res.status).toBe(500);
    });
  });

  describe("GET /links/:uniqueId", () => {
    it("calls getLinkByUniqueId, getLinkChildren, getAllAncestors and returns linkResponseDTO", async () => {
      const link = {
        uniqueId: "u1",
        name: "Link",
        parentId: "p1",
        toObject: () => ({ uniqueId: "u1", name: "Link", parentId: "p1" }),
      };
      const children = [{ uniqueId: "c1", name: "Child" }];
      const ancestors = [{ uniqueId: "p1", name: "Parent" }];
      linkService.getLinkByUniqueId.mockResolvedValue(link);
      linkService.getLinkChildren.mockResolvedValue(children);
      linkService.getAllAncestors.mockResolvedValue(ancestors);

      const res = await request(app).get("/links/u1");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("uniqueId", "u1");
      expect(res.body).toHaveProperty("name", "Link");
      expect(res.body.children).toHaveLength(1);
      expect(res.body.children[0]).toMatchObject({ uniqueId: "c1", name: "Child" });
      expect(res.body.ancestors).toEqual(ancestors);
      expect(linkService.getLinkByUniqueId).toHaveBeenCalledWith("u1");
      expect(linkService.getLinkChildren).toHaveBeenCalledWith("u1");
      expect(linkService.getAllAncestors).toHaveBeenCalledWith("p1");
    });

    it("returns 500 when getLinkByUniqueId throws", async () => {
      linkService.getLinkByUniqueId.mockRejectedValue(new Error("Link not found"));

      const res = await request(app).get("/links/missing");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Link not found");
    });
  });

  describe("PUT /links/:uniqueId", () => {
    it("calls updateLinkByUniqueId with params and body, returns 200 with link", async () => {
      const body = { name: "Updated Name" };
      const updated = { uniqueId: "u1", name: "Updated Name" };
      linkService.updateLinkByUniqueId.mockResolvedValue(updated);

      const res = await request(app).put("/links/u1").send(body);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(linkService.updateLinkByUniqueId).toHaveBeenCalledWith("u1", body);
    });

    it("returns 500 when updateLinkByUniqueId throws", async () => {
      linkService.updateLinkByUniqueId.mockRejectedValue(
        new Error("Link not found")
      );

      const res = await request(app).put("/links/missing").send({ name: "X" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Link not found");
    });
  });

  describe("DELETE /links/:uniqueId", () => {
    it("calls deleteLinkByUniqueId and returns 200 with success message", async () => {
      linkService.deleteLinkByUniqueId.mockResolvedValue({
        uniqueId: "u1",
        name: "Deleted",
      });

      const res = await request(app).delete("/links/u1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Link deleted successfully" });
      expect(linkService.deleteLinkByUniqueId).toHaveBeenCalledWith("u1");
    });

    it("returns 500 when deleteLinkByUniqueId throws", async () => {
      linkService.deleteLinkByUniqueId.mockRejectedValue(
        new Error("Link not found")
      );

      const res = await request(app).delete("/links/missing");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Link not found");
    });
  });
});
