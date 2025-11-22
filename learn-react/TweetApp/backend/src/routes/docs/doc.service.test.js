const {
  wrapHTMLContent,
  isResourceAvailable,
  getCSSStyle,
  getFileHtmlContent,
} = require("./doc.service");

describe("doc.service", () => {
  describe("wrapHTMLContent", () => {
    it("wraps html content with DOCTYPE and link to given style", () => {
      const result = wrapHTMLContent("https://style.css", "<p>Hi</p>");
      expect(result).toContain("<!DOCTYPE html>");
      expect(result).toContain('href="https://style.css"');
      expect(result).toContain("markdown-body");
      expect(result).toContain("<p>Hi</p>");
    });
  });

  describe("isResourceAvailable", () => {
    it("returns true for index and categories", () => {
      expect(isResourceAvailable("index")).toBe(true);
      expect(isResourceAvailable("categories")).toBe(true);
      expect(isResourceAvailable("INDEX")).toBe(true);
      expect(isResourceAvailable("CATEGORIES")).toBe(true);
    });

    it("returns false for unknown resource", () => {
      expect(isResourceAvailable("unknown")).toBe(false);
      expect(isResourceAvailable("")).toBe(false);
    });
  });

  describe("getCSSStyle", () => {
    it("returns dark URL for dark viewStyles", () => {
      const result = getCSSStyle("dark");
      expect(result).toContain("github-markdown");
      expect(result).toContain("min.css");
    });

    it("returns light URL for light viewStyles", () => {
      const result = getCSSStyle("light");
      expect(result).toContain("github-markdown");
      expect(result).toContain("light");
    });

    it("defaults to dark for invalid or empty viewStyles", () => {
      expect(getCSSStyle("")).toContain("github-markdown");
      expect(getCSSStyle(null)).toContain("github-markdown");
      expect(getCSSStyle("invalid")).toContain("github-markdown");
    });
  });

  describe("getFileHtmlContent", () => {
    it("returns null when file read fails", () => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      const result = getFileHtmlContent("nonexistent.md");
      expect(result).toBeNull();
      console.error.mockRestore();
    });
  });
});
