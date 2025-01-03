import React from "react";
import { FallbackStrategies, getTesterComponent, testerNames } from "./config";

const testTesterNames = [
  ...testerNames,
  { name: "non-existing-name", id: "non-existing-id" },
];

const withForEachApproach = () => {
  const validComponents = [];
  let invalidNames = {
    count: 0,
    names: [],
  };

  testTesterNames.forEach(({ name }) => {
    const TesterComponent = getTesterComponent(
      name,
      FallbackStrategies.RETURN_NULL
    );
    if (TesterComponent === null) {
      invalidNames.count += 1;
      invalidNames.names.push(name);
    } else {
      validComponents.push(<TesterComponent key={name} />);
    }
  });

  return { validComponents, invalidNames };
};

const withReduceApproach = () => {
  return testTesterNames.reduce(
    (acc, { name, id }) => {
      const TesterComponent = getTesterComponent(
        name,
        FallbackStrategies.RETURN_UNDEFINED
      );

      if (!TesterComponent) {
        acc.invalidNames.count += 1;
        acc.invalidNames.names.push(name);
      } else {
        acc.validComponents.push(<TesterComponent key={id} />);
      }
      return acc;
    },
    {
      validComponents: [],
      invalidNames: { count: 0, names: [] },
    }
  );
};

const withMapApproachForSanitizedRender = () => ({
  validComponents: testTesterNames.map(({ name, id }) => {
    const TesterComponent = getTesterComponent(name);
    return <TesterComponent key={id} />;
  }),
  invalidNames: { count: 0, names: [] },
});

export const VALID_INVALID_SEGGREGATION = {
  withDefaultStrategy: withMapApproachForSanitizedRender(),
  withReturnNullStrategy: withForEachApproach(),
  withReturnUndefinedStrategy: withReduceApproach(),
};

export const Separator = (
  <>
    <hr />
    <hr />
  </>
);
