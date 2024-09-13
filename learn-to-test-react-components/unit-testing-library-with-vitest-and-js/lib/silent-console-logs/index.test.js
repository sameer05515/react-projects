import { describe, it, vi, afterEach, beforeEach, expect } from "vitest";

describe("Silence console.log example, after taking backup", () => {
    let originalConsoleLog;

    beforeEach(() => {
        // Backup the original console.log
        originalConsoleLog = console.log;
        // Mock console.log to silence it
        console.log = vi.fn();
    });

    afterEach(() => {
        // Restore the original console.log after each test
        console.log = originalConsoleLog;
    });

    it("should not display console.log output", () => {
        console.log("This will not be displayed");
        expect(console.log).toHaveBeenCalledWith("This will not be displayed");
    });
});


describe("Silence console.log example, without taking backup", () => {
    // let originalConsoleLog;

    beforeEach(() => {
        // Backup the original console.log
        // originalConsoleLog = console.log;
        // Mock console.log to silence it
        // console.log = vi.fn();

        console.log('[beforeEach]: console.log restored after the test');

        // Silence all console methods globally
        console.log = vi.fn();
        console.warn = vi.fn();
        console.error = vi.fn();
    });

    afterEach(() => {
        // Restore the original console.log after each test
        // console.log = originalConsoleLog;
        vi.restoreAllMocks();
        console.log('[afterEach]: console.log restored after the test');
    });

    it.only("should not display console.log output", () => {
        console.log("This will not be displayed");
        expect(console.log).toHaveBeenCalledWith("This will not be displayed");
    });
});


describe("Silence console.log example, without taking backup. Cleaner approach suggested by ChatGPT", () => {
    beforeEach(() => {
        // Mock console.log to silence it
        console.log = vi.fn();
    });

    afterEach(() => {
        // Restore mocked functions
        vi.restoreAllMocks();
    });

    it("should not display console.log output", () => {
        console.log("This will not be displayed");
        expect(console.log).toHaveBeenCalledWith("This will not be displayed");
    });

    it("should handle multiple console.log calls", () => {
        console.log("Log 1");
        console.log("Log 2");
        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenCalledWith("Log 1");
        expect(console.log).toHaveBeenCalledWith("Log 2");
    });
});
