import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../custom-button/CustomButton";
import TooltipSpan from "./TooltipSpan";

// Sample treeList data
const treeList = [
    {
        id: "root",
        name: "Root",
        type: "category",
        children: [
            {
                id: "1",
                name: "Parent 1",
                type: "category",
                children: [
                    {
                        id: "1-1",
                        name: "Child 1-1",
                        type: "question",
                        children: [],
                    },
                    {
                        id: "1-2",
                        name: "Child 1-2",
                        type: "question",
                        children: [
                            {
                                id: "1-2-1",
                                name: "Grandchild 1-2-1",
                                type: "question",
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: "2",
                name: "Parent 2",
                type: "category",
                children: [
                    {
                        id: "2-1",
                        name: "Child 2-1",
                        type: "category",
                        children: [],
                    },
                ],
            },
            {
                id: "3",
                name: "Parent 3",
                type: "category",
                children: [],
            },
        ],
    },
];

// TreeNode component to render individual nodes
const TreeNode = ({ node, selectedNodeId, onNodeSelection = () => {} }) => {
    const nodeRef = useRef(null);
    useEffect(() => {
        if (selectedNodeId === node.id && nodeRef.current) {
            nodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedNodeId, node.id]);

    const handleNodeSelection = (node) => {
        // console.log(`[TreeNode]: this node has been clicked : ${JSON.stringify(node)}`);

        if (onNodeSelection && selectedNodeId !== node.id) {
            onNodeSelection({ id: node.id, name: node.name, type: node.type });
        }
        // else{
        //     console.log(`Already selected!!`);
        // }
    };
  return (
    <li className="ml-4 border-l border-gray-200 pl-4">
      <span
        ref={nodeRef}
        className={`block cursor-pointer rounded px-1.5 py-0.5 text-xs transition hover:bg-emerald-50 ${
          selectedNodeId === node.id ? "text-emerald-600 font-semibold text-sm" : "text-gray-800"
        }`}
        onClick={() => handleNodeSelection(node)}
      >
        <TooltipSpan maxCharLength={25} text={node.name} />
      </span>
      {node.children && node.children.length > 0 && (
        <ul className="mt-1 space-y-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedNodeId={selectedNodeId}
              onNodeSelection={onNodeSelection}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// TreeList component to render the entire tree
const TreeList = ({
  treeList = [],
  selectedNodeId,
  className = "",
  customStyle = {},
  onNodeSelection = () => {},
}) => {
    const handleNodeSelection = (node) => {
        // console.log(`[TreeList]: Mr node : ${JSON.stringify(node, null, 2)}. Please wait. TreenList is working you to get selected`);
        onNodeSelection(node);
    };
    return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm ${className}`} style={customStyle}>
      {treeList && treeList.length > 0 && (
        <ul className="space-y-1">
          {treeList.map((link) => (
            <TreeNode
              key={link.id}
              node={link}
              selectedNodeId={selectedNodeId}
              onNodeSelection={handleNodeSelection}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

// Function to flatten the tree structure into an array
const flattenTree = (list, prevQueue = []) => {
    let queue = [...prevQueue];
    if (list && list.length > 0) {
        list.forEach((t) => {
            queue = [...queue, { ...{ id: t.id, name: t.name, type: t.type } }];
            const childQ = flattenTree(t.children, []);
            queue = [...queue, ...childQ];
        });
    }
    return queue;
};

// TreeBase Example component to render the TreeList component and handle selection
const TreeBase = ({
  treeList = [],
  selectedTreeNodeUID = null,
  customStyle = {},
  className = "",
  onNodeSelection = () => {},
}) => {
    const [flattenedTree, setFlattenedTree] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setFlattenedTree(flattenTree(treeList));
    }, [treeList]);

    useEffect(() => {
        const selectedNode = flattenedTree[selectedIndex];
        if (selectedNode && onNodeSelection) {
            onNodeSelection(selectedNode);
        }
    }, [selectedIndex, flattenedTree, onNodeSelection]);

    useEffect(() => {
        if (selectedTreeNodeUID && flattenedTree && flattenedTree.length > 0) {
            setSelectedIndex((prev) => {
                const calculatedIndex =
                    flattenedTree?.findIndex((td) => td.id === selectedTreeNodeUID) || 0;
                return calculatedIndex;
            });
        }
    }, [selectedTreeNodeUID, flattenedTree]);

    const handleNextClick = () => {
        setSelectedIndex(
            (prevIndex) =>
                (prevIndex + 1 + flattenedTree.length) % flattenedTree.length
        );
    };

    const handlePrevClick = () => {
        setSelectedIndex(
            (prevIndex) =>
                (prevIndex - 1 + flattenedTree.length) % flattenedTree.length
        );
    };

    const handleNodeSelection = (node) => {
        if (node) {
            const index = flattenedTree.findIndex((t) => t.id === node.id);
            if (index >= 0) {
                setSelectedIndex(index);
            }
        }
    };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        <CustomButton className="bg-gray-200 text-gray-800" onClick={handlePrevClick}>
          Previous
        </CustomButton>
        <CustomButton className="bg-gray-200 text-gray-800" onClick={handleNextClick}>
          Next
        </CustomButton>
      </div>
      <TreeList
        treeList={treeList}
        selectedNodeId={flattenedTree[selectedIndex]?.id || 0}
        customStyle={customStyle}
        onNodeSelection={handleNodeSelection}
      />
    </div>
  );
};

export default TreeBase;
export { treeList };
