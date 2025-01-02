import React from "react";
import UsingCustomBackdropV3 from "./testers/UsingCustomBackdropV3";
import UsingEarlierVersionsOfBackdrops from "./testers/UsingEarlierVersionsOfBackdrops";

const SamplePromiseTesterDashboard = () => {
  return (
    <div>
      <h1>SamplePromiseTesterDashboard</h1>

      <UsingEarlierVersionsOfBackdrops />
      <UsingCustomBackdropV3 />
    </div>
  );
};

export default SamplePromiseTesterDashboard;
