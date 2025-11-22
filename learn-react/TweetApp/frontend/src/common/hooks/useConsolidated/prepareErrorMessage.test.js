import prepareErrorMessage from "./prepareErrorMessage";

describe("common/hooks/useConsolidated/prepareErrorMessage", () => {
  it("returns defaultMessage when error is falsy", () => {
    expect(prepareErrorMessage(null, "fallback")).toBe("fallback");
    expect(prepareErrorMessage(undefined, "fallback")).toBe("fallback");
  });

  it("returns string error as-is", () => {
    expect(prepareErrorMessage("boom", "fallback")).toBe("boom");
    expect(prepareErrorMessage("   boom  ", "fallback")).toBe("   boom  ");
  });

  it("returns error.message when present and non-empty", () => {
    expect(
      prepareErrorMessage({ message: "msg" }, "fallback")
    ).toBe("msg");
    expect(
      prepareErrorMessage({ message: "  msg  " }, "fallback")
    ).toBe("  msg  ");
  });

  it("JSON-stringifies unknown objects", () => {
    expect(prepareErrorMessage({ code: 1 }, "fallback")).toBe(
      JSON.stringify({ code: 1 })
    );
  });
});

