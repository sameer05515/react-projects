import React from "react";
import { lazyNamed } from "./lazyPages";

describe("lazyPages", () => {
  describe("lazyNamed", () => {
    it("returns a React.lazy component for a named export", () => {
      const LazyComp = lazyNamed(
        () =>
          Promise.resolve({
            default: () => null,
            NamedExport: () => React.createElement("div", null, "x"),
          }),
        "NamedExport"
      );
      expect(LazyComp.$$typeof).toBe(Symbol.for("react.lazy"));
    });
  });
});
