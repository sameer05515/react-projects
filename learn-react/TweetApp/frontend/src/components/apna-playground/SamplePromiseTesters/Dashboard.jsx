import React from "react";
import { getTesterComponent, testerNames } from "./testersConfig";

const SamplePromiseTesterDashboard = () => {
  return (
    <div>
      <h1>SamplePromiseTesterDashboard</h1>
      {testerNames.map(({ name, id }) => {
        const TesterComponent = getTesterComponent(name);
        return (
          <div key={id}>
            {TesterComponent ? <TesterComponent /> : <p>No component found</p>}
          </div>
        );
      })}
    </div>
  );
};

export default SamplePromiseTesterDashboard;
