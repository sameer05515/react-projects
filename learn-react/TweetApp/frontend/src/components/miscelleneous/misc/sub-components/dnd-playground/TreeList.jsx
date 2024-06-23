import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "NODE";

// Sample tree data
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

// Helper function to move nodes in the tree
const moveNodeInTree = (tree, fromIndex, toIndex) => {
  const updatedTree = [...tree];
  const [movedNode] = updatedTree.splice(fromIndex, 1);
  updatedTree.splice(toIndex, 0, movedNode);
  return updatedTree;
};

const NodeItem = ({ node, index, moveNode, path }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { path, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.path !== path) {
        moveNode(draggedItem.path, path);
        draggedItem.path = path; // Update path to new position
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: isDragging ? "#f0f0f0" : "#fff",
        border: "1px solid #ccc",
        cursor: "move",
        marginLeft: `${path.length * 20}px`, // Indent based on tree depth
      }}
    >
      {node.name}
    </div>
  );
};

const TreeNode = ({ treeData, path, moveNode }) => {
  return (
    <>
      {treeData.map((node, index) => {
        const nodePath = [...path, index]; // Track node's position in tree
        return (
          <div key={nodePath.join("-")}>
            <NodeItem
              node={node}
              index={index}
              path={nodePath}
              moveNode={moveNode}
            />
            {node.children.length > 0 && (
              <TreeNode
                treeData={node.children}
                path={nodePath}
                moveNode={moveNode}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const TreeList = () => {
  const [treeData, setTreeData] = useState(initialTreeData);

  const moveNode = (fromPath, toPath) => {
    // Traverse and move node in tree data
    const updatedTree = [...treeData];
    const fromParent = getParentNode(updatedTree, fromPath.slice(0, -1));
    const toParent = getParentNode(updatedTree, toPath.slice(0, -1));

    const [movedNode] = fromParent.splice(fromPath.slice(-1)[0], 1); // Remove node from old position
    toParent.splice(toPath.slice(-1)[0], 0, movedNode); // Insert node to new position

    setTreeData(updatedTree);
  };

  const getParentNode = (tree, path) => {
    return path.reduce((parent, index) => parent[index].children, tree);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ width: "400px", margin: "0 auto" }}>
        <TreeNode treeData={treeData} path={[]} moveNode={moveNode} />
      </div>
    </DndProvider>
  );
};

export default TreeList;
