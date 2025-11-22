const itemTypes = require("./itemTypes");

describe("itemTypes", () => {
  it("is an array of three strings", () => {
    expect(Array.isArray(itemTypes)).toBe(true);
    expect(itemTypes).toHaveLength(3);
    itemTypes.forEach((t) => expect(typeof t).toBe("string"));
  });

  it("contains Category, Question, Answer in order", () => {
    expect(itemTypes).toEqual(["Category", "Question", "Answer"]);
  });

  it("each value is non-empty", () => {
    itemTypes.forEach((t) => expect(t.length).toBeGreaterThan(0));
  });
});
