import React from "react";
import { FallbackStrategies } from "../../../common/best-practices/FallbackStrategies";
import { getTesterComponent, testerNames } from "./config";

// Test data including a non-existing name
const testData = [
  ...testerNames,
  { name: "non-existing-name", id: "non-existing-id" },
];

// Approach 1: Using forEach for segregation
const segregateComponentsWithForEach = () => {
  const validComponents = [];
  const invalidComponents = {
    count: 0,
    names: [],
  };

  testData.forEach(({ name, id }) => {
    const Component = getTesterComponent(name, FallbackStrategies.RETURN_NULL);
    if (Component === null) {
      invalidComponents.count += 1;
      invalidComponents.names.push(name);
    } else {
      validComponents.push(<Component key={id} />);
    }
  });

  return { validComponents, invalidComponents };
};

// Approach 2: Using reduce for segregation
const segregateComponentsWithReduce = () =>
  testData.reduce(
    (result, { name, id }) => {
      const Component = getTesterComponent(name, FallbackStrategies.RETURN_UNDEFINED);
      if (!Component) {
        result.invalidComponents.count += 1;
        result.invalidComponents.names.push(name);
      } else {
        result.validComponents.push(<Component key={id} />);
      }
      return result;
    },
    {
      validComponents: [],
      invalidComponents: { count: 0, names: [] },
    }
  );

// Approach 3: Using map for sanitized render (does not count invalid names)
const sanitizedRenderWithMap = () => ({
  validComponents: testData.map(({ name, id }) => {
    const Component = getTesterComponent(name);
    return <Component key={id} />;
  }),
  invalidComponents: { count: 0, names: [] }, // Not tracked here
});

// Exported utility object for strategy-based results
export const VALID_INVALID_SEGGREGATION = {
  defaultStrategy: sanitizedRenderWithMap(),
  returnNullStrategy: segregateComponentsWithForEach(),
  returnUndefinedStrategy: segregateComponentsWithReduce(),
};


