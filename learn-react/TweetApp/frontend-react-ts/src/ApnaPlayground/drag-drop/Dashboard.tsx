import React from "react";
import DraggableAreaV1 from "./samples/v1";
import DraggableAreaV2 from "./samples/v2";

const DraggableAreaDashboard = () => {
  return (
    <div>
      <h1>DraggableAreaDashboard</h1>
      <hr />
      <h2>DraggableAreaV1</h2>
      <DraggableAreaV1 />
      <hr />
      <h2>DraggableAreaV2</h2>
      <DraggableAreaV2 />
    </div>
  );
};

export default DraggableAreaDashboard;
