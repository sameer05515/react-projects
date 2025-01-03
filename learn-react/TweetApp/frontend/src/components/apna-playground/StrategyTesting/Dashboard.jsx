import React from "react";
import { getTesterComponent, testerNames } from "./config";

const testTesterNames = [
  ...testerNames,
  { name: "non-existing-name", id: "non-existing-id" },
];

const StrategyTestingDashboard = () => {
  const validComponents = [];
  let invalidNamesCount = 0;

  testerNames.forEach(({ name }) => {
    const TesterComponent = getTesterComponent(name);
    if (TesterComponent === null) {
      invalidNamesCount += 1;
    } else {
      validComponents.push(<TesterComponent key={name} />);
    }
  });
  return (
    <div>
      <h1>StrategyTestingDashboard</h1>
      <h2>With Default Strategy</h2>
      {testTesterNames.map(({ name, id }) => {
        const TesterComponent = getTesterComponent(name);
        return <TesterComponent key={id} />;
      })}
    </div>
  );
};

export default StrategyTestingDashboard;
