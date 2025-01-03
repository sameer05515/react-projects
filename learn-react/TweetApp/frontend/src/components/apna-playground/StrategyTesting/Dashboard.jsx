import React from "react";
import { FallbackStrategies, getTesterComponent, testerNames } from "./config";

const testTesterNames = [
  ...testerNames,
  { name: "non-existing-name", id: "non-existing-id" },
];

const validInvalidSeggregationForEachApproach = () => {
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

const componentsArrWithDefaultStrategy = testTesterNames.map(({ name, id }) => {
  const TesterComponent = getTesterComponent(name);
  return <TesterComponent key={id} />;
});

const StrategyTestingDashboard = () => {
  const { validComponents, invalidNames } =
    validInvalidSeggregationForEachApproach();
  return (
    <div>
      <h1>StrategyTestingDashboard</h1>
      <h2>With Default Strategy</h2>
      {componentsArrWithDefaultStrategy}
      <hr />
      <hr />
      <h2>With Return Null strategy</h2>
      <div>
        {validComponents}
        {invalidNames.count > 0 && (
          <p style={{ color: "red" }}>
            Total invalid names: {invalidNames.count} : [
            {invalidNames.names.map((n) => n)}]
          </p>
        )}
      </div>
    </div>
  );
};

export default StrategyTestingDashboard;
