const fetchData = require("../../src/02-async/async");

describe("fetchData, the async operation", () => {
    it("should return incorrect todo, if treated as a synchronous code", () => {
        const todo = fetchData(2);
        expect(todo.id).not.toBe(2);
    });

    it("should return correct todo id, if treated as an asynchronous code, promise-then approach", () => {
        fetchData(2).then(({ data: todo }) => {
            expect(todo.id).toBe(2);
        });
    });

    it("should return correct todo id, if treated as an asynchronous code, async-await approach", async () => {
        const { data: todo } = await fetchData(2);
        expect(todo.id).toBe(2);
    });
});
