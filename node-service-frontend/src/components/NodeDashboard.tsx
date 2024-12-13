import React from "react";
import Tree from "../common/components/tree/TreeV2";
import NodeCard from "./NodeCard";
import { Node } from "./types";
import NodeForm from "./NodeForm";
import axios from "axios";
import { BASE_URL } from "../common/constants/Global";
import withModal from "../common/components/hoc/modal/withModal";

const NodeFormModal = withModal(NodeForm);

const NodeDashboard = () => {
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  const [formVisible, setFormVisible] = React.useState(false);
  const [allNodes, setAllNodes] = React.useState<Node[]>([]);

  const fetchData = async () => {
    setAllNodes([]);
    try {
      const response = await axios.get(BASE_URL);
      const data = response.data as Node[];
      setAllNodes(() => data || []);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const openForm = () => {
    setFormVisible(true);
  };
  return (
    <div style={{ display: "block" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <button onClick={openForm}>Create</button>
      </div>

      <div style={{ display: "flex", flex: 10 }}>
        <div style={{ flex: 1 }}>
          <Tree
            // data={[{ uniqueId: "12345", name: "Name", metadata: {} }]}
            data={allNodes.map((n) => ({
              ...n,
              name: n.uniqueId,
            }))}
            selectedNodeId={selectedNode?.uniqueId}
            renderNode={(node) => (
              <div>
                <span onClick={() => setSelectedNode(node || null)}>
                  {node.name}
                </span>
              </div>
            )}
          />
        </div>
        <div style={{ flex: 3 }}>
          {selectedNode && !formVisible && <NodeCard node={selectedNode} />}
          {formVisible && (
            <NodeFormModal
              isOpen={formVisible}
              onClose={() => {
                setFormVisible(false);
                fetchData();
              }}
            />
          )}
          <pre>{JSON.stringify(allNodes)}</pre>
        </div>
      </div>
    </div>
  );
};

export default NodeDashboard;
