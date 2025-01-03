import React from "react";
import { getTesterComponent, testerNames } from "./config";

const testTesterNames = [
  ...testerNames,
  { name: "non-existing-name", id: "non-existing-id" },
];

const StrategyTestingDashboard = () => {
  return (
    <div>
      <h1>StrategyTestingDashboard</h1>
      {testTesterNames.map(({ name, id }) => {
        const TesterComponent = getTesterComponent(name);
        return <TesterComponent key={id} />;
      })}
    </div>
  );
};

export default StrategyTestingDashboard;
