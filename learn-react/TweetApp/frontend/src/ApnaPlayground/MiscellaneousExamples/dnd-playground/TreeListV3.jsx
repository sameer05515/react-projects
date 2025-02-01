import React, { useState } from "react";

// Function to recursively add uniqueId and parentId to each node
const addUniqueAndParentIds = (nodes, parentId = null) => {
  return nodes.map((node, index) => {
    const uniqueId = parentId ? `${parentId}-${index}` : `${index}`;
    node.uniqueId = uniqueId;
    node.parentId = parentId;
    if (node.children && node.children.length > 0) {
      node.children = addUniqueAndParentIds(node.children, uniqueId);
    }
    return node;
  });
};

const initialTreeData = [
  {
    name: "Root Node",
    children: [
      {
        name: "Child Node 1",
        children: [
          {
            name: "Grandchild Node 1.1",
            children: [],
          },
          {
            name: "Grandchild Node 1.2",
            children: [
              {
                name: "Great Grandchild Node 1.2.1",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "Child Node 2",
        children: [
          {
            name: "Grandchild Node 2.1",
            children: [],
          },
        ],
      },
      {
        name: "Child Node 3",
        children: [],
      },
    ],
  },
];

const TreeNode = ({ node, onDragStart, onDrop, renderChildren }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, node)}
    onDrop={(e) => onDrop(e, node)}
    onDragOver={(e) => e.preventDefault()} // Needed to allow drop
    style={{
      padding: "5px",
      margin: "5px",
      border: "1px solid black",
      cursor: "move",
    }}
  >
    {node.name}
    {node.children && node.children.length > 0 && (
      <div style={{ marginLeft: "20px" }}>{renderChildren(node.children)}</div>
    )}
  </div>
);

const TreeListV3 = () => {
  const [treeData, setTreeData] = useState(() =>
    addUniqueAndParentIds(initialTreeData)
  );
  const [draggedNode, setDraggedNode] = useState(null);

  // Find a node by uniqueId
  const findNodeById = (nodes, id) => {
    for (const node of nodes) {
      if (node.uniqueId === id) {
        return node;
      }
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Remove a node by uniqueId
  const removeNodeById = (nodes, id) => {
    return nodes.filter((node) => {
      if (node.uniqueId === id) return false;
      if (node.children) {
        node.children = removeNodeById(node.children, id);
      }
      return true;
    });
  };

  // Add node to target's children
  const addNodeToParent = (nodes, parentId, newNode) => {
    return nodes.map((node) => {
      if (node.uniqueId === parentId) {
        node.children = [...(node.children || []), newNode];
      } else if (node.children) {
        node.children = addNodeToParent(node.children, parentId, newNode);
      }
      return node;
    });
  };

  const handleDragStart = (e, node) => {
    e.stopPropagation();
    setDraggedNode(node);
  };

  const handleDrop = (e, targetNode) => {
    e.stopPropagation();
    if (!draggedNode || draggedNode.uniqueId === targetNode.uniqueId) {
      return;
    }

    // Remove dragged node from its current parent
    const updatedTreeWithoutDraggedNode = removeNodeById(
      treeData,
      draggedNode.uniqueId
    );

    // Add dragged node to the target node's children
    const updatedTreeWithDraggedNode = addNodeToParent(
      updatedTreeWithoutDraggedNode,
      targetNode.uniqueId,
      draggedNode
    );

    // Update treeData with new structure
    setTreeData(() => addUniqueAndParentIds(updatedTreeWithDraggedNode));
  };

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <TreeNode
        key={node.uniqueId}
        node={node}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        renderChildren={renderTree}
      />
    ));
  };

  return <div>{renderTree(treeData)}</div>;
};

export default TreeListV3;
