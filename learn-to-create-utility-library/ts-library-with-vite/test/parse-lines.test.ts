import { describe, it, expect } from "vitest";
import parseLines from "../src/lib/text-indentation/parse-lines";
import ErrorCodes from "../src/lib/text-indentation/error-code";

describe("parseLines", () => {
  it("should return isValid false, if empty string passed", () => {
    const result = parseLines("");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.EMPTY_INPUT.code);
    expect(result.isValid).toBe(false);
  });

  it("should return isValid true, if non-empty string with correct indentation passed", () => {
    const result = parseLines(`
            Root
             Child 1
              Grandchild 1
               Grandchild 2
             Child 2
              Grandchild 3
        `);
    expect(result.isValid).toBe(true);
  });

  it("should return isValid false, if non-empty string with incorrect indentation passed", () => {
    const result = parseLines(`
            Root
             Child 1
        Grandchild 1
               Grandchild 2
                Grandchild 3
        `);
    expect(result.isValid).toBe(false);
  });
});
