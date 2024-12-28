import React, { useState } from "react";
import TopicCardViewDashboard from "./sub-components/card-view/TopicCardViewDashboard";
import HoverActions from "../../common/components/hover-actions/HoverActions";
import TopicTreeViewDashboard from "./sub-components/tree-view/TopicTreeViewDashboard";

const TopicBase = () => {
  const [selectedView, setSelectedView] = useState("tree");
  return (
    <div>
      <HoverActions
        title={
          selectedView
            ? `Selected Topic View: ${selectedView}`
            : "Select Topic View"
        }
        actions={[
          <span onClick={() => setSelectedView(() => "tree")}>
            "List View"
          </span>,
          <span onClick={() => setSelectedView(() => "card")}>
            "Card View"
          </span>,
        ]}
      />
      <div>
        {selectedView === "tree" && <TopicTreeViewDashboard />}
        {selectedView === "card" && <TopicCardViewDashboard />}
      </div>
    </div>
  );
};

export default TopicBase;
