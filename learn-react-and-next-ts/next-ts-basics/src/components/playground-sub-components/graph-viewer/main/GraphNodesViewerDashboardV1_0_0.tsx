import JSONDataViewer from "@/components/common/JSONDataViewer";
import { GraphNode, topicsAsGraphNode } from "@/lib/topics";
import React, { useEffect, useState } from "react";
import GraphNodeContainer from "../sub-components/GraphNodeContainer";

const GraphNodesViewerDashboardV1_0_0 = () => {
  const [gNodes, setGNodes] = useState<GraphNode[]>([]);
  useEffect(() => {
    topicsAsGraphNode().then((hh) => setGNodes(() => [...hh]));
  }, []);
  return (
    <div>
      <JSONDataViewer
        metadata={{ gNodes }}
        title="GraphNodesViewerDashboardV1_0_0"
      />
      <GraphNodeContainer nodes={gNodes}/>
    </div>
  );
};

export default GraphNodesViewerDashboardV1_0_0;
