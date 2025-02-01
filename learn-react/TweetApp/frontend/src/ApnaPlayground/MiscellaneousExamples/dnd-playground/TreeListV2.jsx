import React, { useState } from "react";

// Helper function to generate unique IDs and parent IDs
const generateUniqueIds = (node, parentId = null) => {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  return {
    ...node,
    uniqueId,
    parentId,
    children: node.children.map((child) =>
      generateUniqueIds(child, uniqueId)
    ),
  };
};

// Sample treeData with uniqueId and parentId
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
].map(generateUniqueIds);

const TreeNode = ({ node, handleDragStart, handleDrop }) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, node)}
      onDragOver={(e) => e.preventDefault()} // Prevent default to allow dropping
      onDrop={(e) => handleDrop(e, node)}
      style={{
        paddingLeft: "20px",
        border: "1px solid gray",
        margin: "5px 0",
      }}
    >
      {node.name}
      {node.children && node.children.length > 0 && (
        <div style={{ paddingLeft: "10px" }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.uniqueId}
              node={child}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeListV2 = () => {
  const [treeData, setTreeData] = useState(initialTreeData);
  const [draggedNode, setDraggedNode] = useState(null);

  const handleDragStart = (e, node) => {
    setDraggedNode(node);
  };

  const handleDrop = (e, targetNode) => {
    e.preventDefault();

    if (draggedNode && draggedNode.uniqueId !== targetNode.uniqueId) {
      // Avoid dropping on the dragged node or its children
      if (!isDescendant(draggedNode, targetNode)) {
        setTreeData((prevTreeData) => {
          let updatedTreeData = removeNode(prevTreeData, draggedNode.uniqueId);
          updatedTreeData = addNodeToParent(updatedTreeData, targetNode, draggedNode);
          return updatedTreeData;
        });
      }
    }
  };

  // Helper function to check if a node is a descendant of another
  const isDescendant = (node, targetNode) => {
    if (!node.children || node.children.length === 0) return false;
    return node.children.some(
      (child) =>
        child.uniqueId === targetNode.uniqueId ||
        isDescendant(child, targetNode)
    );
  };

  // Remove the dragged node from its current parent
  const removeNode = (nodes, nodeId) => {
    return nodes
      .map((node) => {
        if (node.uniqueId === nodeId) {
          return null; // Remove the node
        }

        return {
          ...node,
          children: removeNode(node.children, nodeId),
        };
      })
      .filter(Boolean); // Remove null entries
  };

  // Add the dragged node to the new parent
  const addNodeToParent = (nodes, targetNode, draggedNode) => {
    return nodes.map((node) => {
      if (node.uniqueId === targetNode.uniqueId) {
        return {
          ...node,
          children: [...node.children, { ...draggedNode, parentId: node.uniqueId }],
        };
      }

      return {
        ...node,
        children: addNodeToParent(node.children, targetNode, draggedNode),
      };
    });
  };

  return (
    <div>
      {treeData.map((node) => (
        <TreeNode
          key={node.uniqueId}
          node={node}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default TreeListV2;
