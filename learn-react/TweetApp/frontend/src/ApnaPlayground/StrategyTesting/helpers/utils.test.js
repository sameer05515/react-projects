import React from "react";

import { FallbackStrategies } from "../../../common/best-practices/FallbackStrategies";
import { getTesterComponent, testerNames } from "./config";
import { VALID_INVALID_SEGGREGATION } from "./utils";

describe("StrategyTesting/helpers", () => {
  describe("config helpers", () => {
    it("exports testerNames for known tester components", () => {
      expect(Array.isArray(testerNames)).toBe(true);
      expect(testerNames.length).toBe(2);
      expect(testerNames.map((t) => t.name).sort()).toEqual(["CompA", "CompB"].sort());
    });

    it("getTesterComponent returns null when strategy is RETURN_NULL", () => {
      const Component = getTesterComponent(
        "non-existing-name",
        FallbackStrategies.RETURN_NULL
      );
      expect(Component).toBe(null);
    });

    it("getTesterComponent returns undefined when strategy is RETURN_UNDEFINED", () => {
      const Component = getTesterComponent(
        "non-existing-name",
        FallbackStrategies.RETURN_UNDEFINED
      );
      expect(Component).toBe(undefined);
    });

    it("getTesterComponent returns a component when using RETURN_DEFAULT_COMPONENT", () => {
      const Component = getTesterComponent(
        "non-existing-name",
        FallbackStrategies.RETURN_DEFAULT_COMPONENT
      );
      // Should be a React component (function).
      expect(typeof Component).toBe("function");
    });
  });

  describe("segregation outputs", () => {
    it("counts exactly one invalid tester under RETURN_NULL and RETURN_UNDEFINED", () => {
      expect(
        VALID_INVALID_SEGGREGATION.returnNullStrategy.invalidComponents.count
      ).toBe(1);
      expect(
        VALID_INVALID_SEGGREGATION.returnNullStrategy.invalidComponents.names
      ).toEqual(["non-existing-name"]);

      expect(
        VALID_INVALID_SEGGREGATION.returnUndefinedStrategy.invalidComponents.count
      ).toBe(1);
      expect(
        VALID_INVALID_SEGGREGATION.returnUndefinedStrategy.invalidComponents.names
      ).toEqual(["non-existing-name"]);
    });

    it("defaultStrategy returns valid components for all testData entries", () => {
      // defaultStrategy uses RETURN_DEFAULT_COMPONENT fallback -> still treated as valid.
      expect(VALID_INVALID_SEGGREGATION.defaultStrategy.validComponents).toHaveLength(3);
    });

    it("defaultStrategy includes a React element per entry", () => {
      const { defaultStrategy } = VALID_INVALID_SEGGREGATION;
      expect(defaultStrategy.validComponents.every(React.isValidElement)).toBe(true);
    });
  });
});

