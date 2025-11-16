import React from "react";
import UseConsolidatedTesterV1 from "./UseConsolidatedTesterV1";
import UseConsolidatedTesterV2 from "./UseConsolidatedTesterV2";
import UseConsolidatedTesterV3 from "./UseConsolidatedTesterV3";
import UseConsolidatedTesterV4 from "./UseConsolidatedTesterV4";

const UseConsolidatedTesterDashboard = () => {
  return (
    <div>
      <UseConsolidatedTesterV4 />
      <hr />
      <UseConsolidatedTesterV3 />
      <hr />
      <UseConsolidatedTesterV2 />
      <hr />
      <UseConsolidatedTesterV1 />
    </div>
  );
};

export default UseConsolidatedTesterDashboard;
