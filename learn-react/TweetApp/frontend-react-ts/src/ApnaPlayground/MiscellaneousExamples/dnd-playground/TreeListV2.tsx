import React, { useState } from "react";

// Helper function to generate unique IDs and parent IDs
type RawNode = { name: string; children: RawNode[] };
type NodeWithIds = { name: string; children: NodeWithIds[]; uniqueId: string; parentId: string | null };

const generateUniqueIds = (node: RawNode, parentId: string | null = null): NodeWithIds => {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  return {
    ...node,
    uniqueId,
    parentId,
    children: node.children.map((child) => generateUniqueIds(child, uniqueId)),
  };
};

// Sample treeData with uniqueId and parentId
const initialTreeData: NodeWithIds[] = [
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
].map((n) => generateUniqueIds(n));

const TreeNode = ({ node, handleDragStart, handleDrop }: { node: NodeWithIds; handleDragStart: (e: React.DragEvent, node: NodeWithIds) => void; handleDrop: (e: React.DragEvent, node: NodeWithIds) => void }) => {
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
          {node.children.map((child: NodeWithIds) => (
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
  const [treeData, setTreeData] = useState<NodeWithIds[]>(initialTreeData);
  const [draggedNode, setDraggedNode] = useState<NodeWithIds | null>(null);

  const handleDragStart = (e: React.DragEvent, node: NodeWithIds) => {
    setDraggedNode(node);
  };

  const handleDrop = (e: React.DragEvent, targetNode: NodeWithIds) => {
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
  const isDescendant = (node: NodeWithIds, targetNode: NodeWithIds): boolean => {
    if (!node.children || node.children.length === 0) return false;
    return node.children.some(
      (child) =>
        child.uniqueId === targetNode.uniqueId ||
        isDescendant(child, targetNode)
    );
  };

  // Remove the dragged node from its current parent
  const removeNode = (nodes: NodeWithIds[], nodeId: string): NodeWithIds[] => {
    return nodes
      .map((node: NodeWithIds) => {
        if (node.uniqueId === nodeId) {
          return null; // Remove the node
        }

        return {
          ...node,
          children: removeNode(node.children || [], nodeId),
        };
      })
      .filter(Boolean) as NodeWithIds[]; // Remove null entries
  };

  // Add the dragged node to the new parent
  const addNodeToParent = (nodes: NodeWithIds[], targetNode: NodeWithIds, draggedNode: NodeWithIds): NodeWithIds[] => {
    return nodes.map((node: NodeWithIds) => {
      if (node.uniqueId === targetNode.uniqueId) {
        return {
          ...node,
          children: [...node.children, { ...draggedNode, parentId: node.uniqueId }],
        };
      }

      return {
        ...node,
        children: addNodeToParent(node.children || [], targetNode, draggedNode),
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
