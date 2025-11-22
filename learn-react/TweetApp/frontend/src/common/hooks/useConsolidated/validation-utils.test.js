import {
  validateFunction,
  validatePromise,
  validateBoolean,
  validatePromiseResult,
} from "./validation-utils";

describe("common/hooks/useConsolidated/validation-utils", () => {
  it("validateFunction throws when provided arg is not a function", () => {
    expect(() => validateFunction(null, "fn")).toThrow(/not a function/i);
    expect(() => validateFunction(1, "fn")).toThrow(/not a function/i);
  });

  it("validatePromise throws when provided arg is not a Promise", () => {
    expect(() => validatePromise({ then: () => {} }, "p")).toThrow(
      /must return a Promise/i
    );
    expect(() => validatePromise(Promise.resolve(1), "p")).not.toThrow();
  });

  it("validateBoolean throws when provided arg is not boolean", () => {
    expect(() => validateBoolean("true")).toThrow(/must return a boolean/i);
    expect(() => validateBoolean(false)).not.toThrow();
  });

  it("validatePromiseResult throws when result is missing required fields", () => {
    expect(() => validatePromiseResult(null)).toThrow(/expected structure/i);
    expect(() =>
      validatePromiseResult({ data: 1, isError: false })
    ).toThrow(/expected structure/i);
    expect(() =>
      validatePromiseResult({ data: 1, message: "m" })
    ).toThrow(/expected structure/i);

    expect(() =>
      validatePromiseResult({ data: 1, isError: false, message: "m" })
    ).not.toThrow();
  });
});

