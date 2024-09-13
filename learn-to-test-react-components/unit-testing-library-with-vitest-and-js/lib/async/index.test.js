import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"; // `vi` is used for mocking
import { fetchData, fetchDataWithAxios } from ".";
import axios from "axios";

let originalConsoleLog;

beforeEach(() => {
    // Backup the original console.log
    originalConsoleLog = console.log;
    // Mock console.log to silence it
    // console.log = vi.fn();
    console.log = vi.fn();
    console.warn = vi.fn();
    console.error = vi.fn();
});

// afterEach(() => {
//     // Restore the original console.log after each test
//     console.log = originalConsoleLog;
// });

describe("fetchData, the async operation", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Restore original fetch behavior after each test
    });

    it("should return incorrect todo, if treated as synchronous code", () => {
        const todo = fetchData(2); // fetchData returns a Promise
        expect(todo).not.toHaveProperty("id", 2); // Checking it doesn't have `id` since it's unresolved
    });

    it("should return correct todo id, if treated as asynchronous code, promise-then approach", async () => {
        await fetchData(2).then((todo) => {
            console.log(`todo : '${JSON.stringify(todo)}'`);
            expect(todo.id).toBe(2); // Correct property check
        });
    });

    it("should return correct todo id, if treated as asynchronous code, async-await approach", async () => {
        const todo = await fetchData(2); // Await the promise
        console.log("todo", todo);
        expect(todo.id).toBe(2); // Correct property check
    });

    it("should throw if response is not ok", async () => {
        // Mock `fetch` to return a response with `ok: false`
        vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
            json: async () => ({}),
        });

        await expect(fetchData(1)).rejects.toThrow("Error: 500 - Internal Server Error");
    });
});

describe("fetchDataWithAxios, the async operation", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Restore original fetch behavior after each test
    });

    it("should return incorrect todo, if treated as synchronous code", () => {
        const todo = fetchDataWithAxios(2); // fetchData returns a Promise
        expect(todo).not.toHaveProperty("id", 2); // Checking it doesn't have `id` since it's unresolved
    });

    it("should return correct todo id, if treated as asynchronous code, promise-then approach", async () => {
        await fetchDataWithAxios(2).then(({ data: todo }) => {
            console.log(`todo : '${JSON.stringify(todo)}'`);
            expect(todo.id).toBe(2); // Correct property check
        });
    });

    it("should return correct todo id, if treated as asynchronous code, async-await approach", async () => {
        const { data: todo } = await fetchDataWithAxios(2); // Await the promise
        console.log("todo", todo);
        expect(todo.id).toBe(2); // Correct property check
    });

    it("mock axios", async () => {
        vi.spyOn(axios, "get").mockReturnValueOnce({
            data: {
                id: 1,
                todo: "Create a typescript libray, for utility and react components and hooks, post doing junit testing"
            }
        });

        const { data: results } = await fetchDataWithAxios(1);
        const { data: results2 } = await fetchDataWithAxios(2);

        expect(results.id).toBe(1);
        expect(results2.id).toBe(2);
        console.log('results: ', results);
        console.log('results2: ', results2);

    })
});
