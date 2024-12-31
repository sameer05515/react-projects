import React from "react";

import * as ReactIconsFA from "react-icons/fa";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
// Safely fetch icon components by name
const getIcon = (name = "FaQuestionCircle") =>
  ReactIconsFA[name] || ReactIconsFA.FaQuestionCircle;

const iconFamily = Object.keys(ReactIconsFA).map((n, idx) => ({
  uniqueId: `ReactIconsFA_${idx + 1}_${n}`,
  name: n,
}));

const ReactIconsDemonstrateDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <h1>Dashboard</h1>
      <div style={{flex:1}}>
        <Tree data={iconFamily} />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default ReactIconsDemonstrateDashboard;
