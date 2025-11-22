/**
 * util module tests.
 * topicQuestionHelper has its own topicQuestionHelper.test.js.
 * This file provides a module-level entry and any shared util tests.
 */
const { prepareQuestions } = require("./topicQuestionHelper");

describe("util module", () => {
  describe("topicQuestionHelper", () => {
    it("prepareQuestions returns array of groups with name and questions", () => {
      const result = prepareQuestions("React");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((group) => {
        expect(group).toHaveProperty("name");
        expect(group).toHaveProperty("questions");
        expect(Array.isArray(group.questions)).toBe(true);
      });
    });

    it("prepareQuestions throws for null topic", () => {
      expect(() => prepareQuestions(null)).toThrow(Error);
    });

    it("prepareQuestions throws for non-string topic", () => {
      expect(() => prepareQuestions(123)).toThrow(Error);
    });
  });
});
