import React from "react";
import { Node } from "./types";

// interface Node {
//   uniqueId: string;
//   metadata: Record<string, string>;
// }

interface NodeCardProps {
  node: Node;
}

const NodeCard: React.FC<NodeCardProps> = ({ node }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px 0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>Node Details</h3>
      <p>
        <strong>Unique ID:</strong> {node.uniqueId}
      </p>
      <div>
        <strong>Metadata:</strong>
        {Object.keys(node.metadata).length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {Object.entries(node.metadata).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No metadata available</p>
        )}
      </div>
    </div>
  );
};

export default NodeCard;
