import { describe, it, expect } from "vitest";
import validate from "../src/lib/text-indentation/validate";
import ErrorCodes from "../src/lib/text-indentation/error-code";
import parseLines from "../src/lib/text-indentation/parse-lines";

describe("parseLines", () => {
  it("should return isValid false, if empty string array passed", () => {
    const result = validate([]);
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.EMPTY_INPUT.code);
    expect(result.isValid).toBe(false);
  });

  it("should return isValid true, if non-empty string with correct indentation passed", () => {
    const result = validate(
      parseLines(`
              Root
               Child 1
                Grandchild 1
                 Grandchild 2
               Child 2
                Grandchild 3
          `).data
    );
    expect(result.isValid).toBe(true);
  });

  it("should return isValid false, if non-empty string with incorrect indentation passed", () => {
    const result = validate(
      parseLines(`
              Root
               Child 1
          Grandchild 1
                 Grandchild 2
                  Grandchild 3
          `).data
    );
    expect(result.isValid).toBe(false);
  });

  it("should return isValid true, if non-empty string with single line passed", () => {
    const result = validate(
      parseLines(`
                Root
            `).data
    );
    expect(result.isValid).toBe(true);
  });

  it("should return isValid true, if non-empty string with multiple lines, but same indentation passed", () => {
    const result = validate(
      parseLines(`
                Root
                Second Root
            `).data
    );
    expect(result.isValid).toBe(true);
  });
});
