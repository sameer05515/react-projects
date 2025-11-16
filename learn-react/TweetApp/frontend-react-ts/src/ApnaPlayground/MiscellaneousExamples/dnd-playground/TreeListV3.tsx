import React, { useState } from "react";

// Function to recursively add uniqueId and parentId to each node
type RawNode = { name: string; children?: RawNode[]; uniqueId?: string; parentId?: string | null };

const addUniqueAndParentIds = (nodes: RawNode[], parentId: string | null = null): RawNode[] => {
  return nodes.map((node: RawNode, index: number) => {
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

const TreeNode = ({ node, onDragStart, onDrop, renderChildren }: { node: RawNode; onDragStart: (e: React.DragEvent, node: RawNode) => void; onDrop: (e: React.DragEvent, node: RawNode) => void; renderChildren: (nodes: RawNode[]) => React.ReactNode }) => (
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
  const [treeData, setTreeData] = useState<RawNode[]>(() =>
    addUniqueAndParentIds(initialTreeData)
  );
  const [draggedNode, setDraggedNode] = useState<RawNode | null>(null);

  // Remove a node by uniqueId
  const removeNodeById = (nodes: RawNode[], id: string): RawNode[] => {
    return nodes.filter((node: RawNode) => {
      if (node.uniqueId === id) return false;
      if (node.children) {
        node.children = removeNodeById(node.children, id);
      }
      return true;
    });
  };

  // Add node to target's children
  const addNodeToParent = (nodes: RawNode[], parentId: string, newNode: RawNode): RawNode[] => {
    return nodes.map((node: RawNode) => {
      if (node.uniqueId === parentId) {
        node.children = [...(node.children || []), newNode];
      } else if (node.children) {
        node.children = addNodeToParent(node.children, parentId, newNode);
      }
      return node;
    });
  };

  const handleDragStart = (e: React.DragEvent, node: RawNode) => {
    e.stopPropagation();
    setDraggedNode(node);
  };

  const handleDrop = (e: React.DragEvent, targetNode: RawNode) => {
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

  const renderTree = (nodes: RawNode[]) => {
    return nodes.map((node: RawNode) => (
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
