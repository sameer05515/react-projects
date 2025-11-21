import React, { useState } from "react";
import { TopicMgmtStyles as styles } from "../styles";
import Tree from "../../../../common/components/tree-viewer/TreeViewer";

// const Breadcrumbs = ({
//     parentId = "",
//     topic = null,
//     ancestors: providedAncestors = [],
//     onAncestorClick = () => { },
// }) => {
//     const [ancestors, setAncestors] = useState([]);

//     useEffect(() => {
//         setAncestors((prev) => [...providedAncestors]);
//     }, [providedAncestors]);

//     return (
//         <div>
//             <div style={breadcrumbStyle.breadcrumbsContainer}>
//                 <HoverableSpan
//                     style={breadcrumbStyle.breadcrumbItem}
//                     isHoverable={false}
//                 >
//                     <i>Home / </i>
//                 </HoverableSpan>
//                 {ancestors.map((ancestor, index) => (
//                     <HoverableSpan
//                         style={{ ...breadcrumbStyle.breadcrumbItem, cursor: "pointer" }}
//                         key={index}
//                         onClick={() => onAncestorClick(ancestor)}
//                     >
//                         <i>{ancestor.name} / </i>
//                     </HoverableSpan>
//                 ))}
//                 <HoverableSpan
//                     style={breadcrumbStyle.breadcrumbItem}
//                     isSelected
//                     isHoverable={false}
//                 >
//                     <>{topic?.name}</>
//                 </HoverableSpan>
//             </div>
//         </div>
//     );
// };

// const breadcrumbStyle = {
//     breadcrumbsContainer: {
//         marginBottom: "20px",
//         padding: "0 .5rem",
//     },
//     breadcrumbList: {
//         listStyleType: "none",
//         padding: "0",
//         margin: "0",
//     },
//     breadcrumbItem: {
//         display: "inline-block",
//         marginRight: "5px",
//     },
//     breadcrumbLink: {
//         color: "#007bff",
//         textDecoration: "none",
//     },
//     breadcrumbLinkHover: {
//         textDecoration: "underline",
//     },
// };

const CustomTreeComponent = () => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const treeData = [
    {
      uniqueId: "1",
      name: "Node 1",
      children: [
        {
          uniqueId: "1-1",
          name: "Node 1-1",
          children: [
            {
              uniqueId: "1-1-1",
              name: "Node 1-1-1",
            },
          ],
        },
        {
          uniqueId: "1-2",
          name: "Node 1-2",
        },
      ],
    },
    {
      uniqueId: "2",
      name: "Node 2",
      children: [
        {
          uniqueId: "2-1",
          name: "Node 2-1",
        },
      ],
    },
  ];

  const flattenTree = (nodes, list = []) => {
    nodes.forEach((node) => {
      list.push(node);
      if (node.children) {
        flattenTree(node.children, list);
      }
    });
    return list;
  };

  const allNodes = flattenTree(treeData);

  const handleExpand = (direction) => {
    let newIndex = currentNodeIndex;
    if (direction === "next" && currentNodeIndex < allNodes.length - 1) {
      newIndex++;
    } else if (direction === "prev" && currentNodeIndex > 0) {
      newIndex--;
    }
    setCurrentNodeIndex(newIndex);
    setExpandedNodes((prevExpandedNodes) => {
      const updatedExpandedNodes = new Set(prevExpandedNodes);
      updatedExpandedNodes.add(allNodes[newIndex].uniqueId);
      return updatedExpandedNodes;
    });
  };

  const isNodeExpanded = (nodeId) => {
    return expandedNodes.has(nodeId);
  };

  const renderNode = (node) => (
    <span className={`${isNodeExpanded(node.uniqueId) ? "text-blue-600" : "text-black"}`}>
      {node.name}
    </span>
  );

  return (
    <div className="flex">
      <div className="flex-1">
        <Tree
          data={treeData}
          renderNode={(node) => (
            <TreeNodeWithExpand
              node={node}
              isExpanded={isNodeExpanded(node.uniqueId)}
              renderNode={renderNode}
            />
          )}
        />
      </div>
      <div className="ml-5 flex flex-col">
        <button
          onClick={() => handleExpand("prev")}
          disabled={currentNodeIndex === 0}
          className="mb-2 rounded border border-gray-300 bg-white px-3 py-1 text-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => handleExpand("next")}
          disabled={currentNodeIndex === allNodes.length - 1}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const TreeNodeWithExpand = ({ node, isExpanded, renderNode }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  React.useEffect(() => {
    if (isExpanded) {
      setExpanded(true);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mb-1">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-gray-300 text-xs" onClick={toggleExpand}>
          {hasChildren ? (expanded ? "-" : "+") : null}
        </span>
        {renderNode ? renderNode(node) : <DefaultNodeComponent node={node} />}
      </div>
      {expanded && hasChildren && (
        <div className="ml-5">
          {node.children.map((child) => (
            <TreeNodeWithExpand
              key={child.uniqueId}
              node={child}
              isExpanded={isExpanded}
              renderNode={renderNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DefaultNodeComponent = ({ node }) => (
  <>
    {/* <div>
              {node.name} (ID: {node.uniqueId})
          </div> */}
    <span className="text-sm">
      <b>{node.name ? node.name : node.uniqueId}</b>
    </span>
  </>
);

export default CustomTreeComponent;
