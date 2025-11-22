import {
  defaultMessages,
  prepareMessage,
  prepareErrorMessage,
} from "./message-preparation-utils";

describe("common/hooks/useConsolidated/message-preparation-utils", () => {
  it("prepareMessage returns default when message is empty/falsy", () => {
    expect(prepareMessage("", defaultMessages.loadingMessage)).toBe(
      defaultMessages.loadingMessage
    );
    expect(prepareMessage("   ", defaultMessages.loadingMessage)).toBe(
      defaultMessages.loadingMessage
    );
  });

  it("prepareMessage returns non-empty trimmed message as-is", () => {
    expect(prepareMessage("  hello  ", "d")).toBe("  hello  ");
  });

  it("prepareErrorMessage handles string, Error, and generic objects", () => {
    expect(prepareErrorMessage(null, "fallback")).toBe("fallback");
    expect(prepareErrorMessage("", "fallback")).toBe("fallback");
    expect(prepareErrorMessage("boom", "fallback")).toBe("boom");

    const err = new Error("e1");
    expect(prepareErrorMessage(err, "fallback")).toBe("e1");

    expect(prepareErrorMessage({ code: 1 }, "fallback")).toBe(
      JSON.stringify({ code: 1 })
    );
  });
});

