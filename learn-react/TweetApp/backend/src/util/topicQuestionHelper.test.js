
const { prepareQuestions } = require('./topicQuestionHelper');

describe("prepareQuestions", () => {
    it("should return an array of length 4 when called for 4 topics", () => {
        const topics = ["JavaScript","Java", "Spring", "Spring boot"];
        const tList = [];
        topics.forEach(t => {
            const gq = prepareQuestions(t);
            tList.push(gq);
        });
        expect(tList.length).not.toBe(1);
        expect(tList.length).toBe(4);
    });

    it("should throw an Error, if null topic passed", () => {
        expect(()=>prepareQuestions(null)).toThrow(Error);
    });

    it("should throw an Error, if undefined topic passed", () => {
        expect(()=>prepareQuestions(undefined)).toThrow(Error);
    });

    it("should throw an Error, if topic is not an string type", () => {
        expect(()=>prepareQuestions(123)).toThrow(Error);
    });

    it("should return an array of groups each with name and questions array", () => {
        const result = prepareQuestions("React");
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((group) => {
            expect(group).toHaveProperty("name");
            expect(group).toHaveProperty("questions");
            expect(Array.isArray(group.questions)).toBe(true);
            expect(typeof group.name).toBe("string");
        });
    });

    it("should replace #topic# with the given topic string where present; no question should contain #topic#", () => {
        const topic = "JavaScript";
        const result = prepareQuestions(topic);
        let atLeastOneContainsTopic = false;
        result.forEach((group) => {
            group.questions.forEach((q) => {
                expect(q).not.toMatch(/#topic#/);
                if (q.includes(topic)) atLeastOneContainsTopic = true;
            });
        });
        expect(atLeastOneContainsTopic).toBe(true);
    });

    it("should include What group with 4 questions", () => {
        const result = prepareQuestions("Java");
        const whatGroup = result.find((g) => g.name === "What");
        expect(whatGroup).toBeDefined();
        expect(whatGroup.questions).toHaveLength(4);
    });

    it("should return same number of groups for any non-empty topic", () => {
        const resultA = prepareQuestions("A");
        const resultB = prepareQuestions("Something Longer");
        expect(resultA.length).toBe(resultB.length);
    });
});