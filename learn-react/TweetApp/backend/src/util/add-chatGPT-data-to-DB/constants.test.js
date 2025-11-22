const {
  CGPTFileNames,
  parseDateFromString,
  LATEST_CONVERSATION_FILE,
} = require("./constants");

describe("add-chatGPT-data-to-DB constants", () => {
  describe("parseDateFromString", () => {
    it("parses DD-MM-YYYY string to Date", () => {
      const d = parseDateFromString("09-05-2024");
      expect(d.getFullYear()).toBe(2024);
      expect(d.getMonth()).toBe(4);
      expect(d.getDate()).toBe(9);
    });

    it("parses 01-01-2024 correctly", () => {
      const d = parseDateFromString("01-01-2024");
      expect(d.getFullYear()).toBe(2024);
      expect(d.getMonth()).toBe(0);
      expect(d.getDate()).toBe(1);
    });
  });

  describe("CGPTFileNames", () => {
    it("is a non-empty array", () => {
      expect(Array.isArray(CGPTFileNames)).toBe(true);
      expect(CGPTFileNames.length).toBeGreaterThan(0);
    });

    it("each entry has name, location, createdDate, isLatest", () => {
      CGPTFileNames.forEach((entry) => {
        expect(entry).toHaveProperty("name");
        expect(entry).toHaveProperty("location");
        expect(entry).toHaveProperty("createdDate");
        expect(entry).toHaveProperty("isLatest");
        expect(entry.createdDate).toBeInstanceOf(Date);
        expect(typeof entry.isLatest).toBe("boolean");
      });
    });

    it("exactly one entry has isLatest true", () => {
      const latest = CGPTFileNames.filter((e) => e.isLatest);
      expect(latest.length).toBe(1);
    });
  });

  describe("LATEST_CONVERSATION_FILE", () => {
    it("is a string path", () => {
      expect(typeof LATEST_CONVERSATION_FILE).toBe("string");
      expect(LATEST_CONVERSATION_FILE).toMatch(/\.json$/);
    });
  });
});
