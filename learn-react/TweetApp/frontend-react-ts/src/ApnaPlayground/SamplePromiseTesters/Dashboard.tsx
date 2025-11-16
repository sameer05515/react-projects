import React from "react";
import { getTesterComponent, testerNames } from "./testersConfig";

const testTesterNames = [
  ...testerNames,
  { name: "non-existing-name", id: "non-existing-id" },
];

const SamplePromiseTesterDashboard = () => {
  return (
    <div>
      <h1>SamplePromiseTesterDashboard</h1>
      {testTesterNames.map(({ name, id }) => {
        const TesterComponent = getTesterComponent(name);
        return <TesterComponent key={id} />;
      })}
    </div>
  );
};

export default SamplePromiseTesterDashboard;
