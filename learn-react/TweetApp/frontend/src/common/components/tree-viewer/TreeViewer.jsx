import React, { useState, useCallback, useMemo, useEffect } from "react";


const TreeNode = ({
  node,
  renderNode,
  uniqueIdFieldName,
  selectedNodeId,
  expandAll,
  isDraggable = false,
  onDragStart = () => {},
  onDrop = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const checkIfIdOfNodeOrItsOneOfTheChildren = (id, currentNode) => {
    if (!id) return false;
    if (id === currentNode[uniqueIdFieldName]) return true;
    if (currentNode.children && currentNode.children.length > 0) {
      return currentNode.children.some((child) =>
        checkIfIdOfNodeOrItsOneOfTheChildren(id, child)
      );
    }
    return false;
  };

  const shouldExpand = useMemo(() => {
    return (
      checkIfIdOfNodeOrItsOneOfTheChildren(selectedNodeId, node) || expandAll
    );
  }, [selectedNodeId, node, expandAll]);

  useEffect(() => {
    if (shouldExpand) {
      setExpanded(true);
    }
  }, [shouldExpand]);

  const toggleExpand = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => {
        e.stopPropagation();
        onDragStart && onDragStart(node);
      }}
      onDrop={(e) => {
        e.stopPropagation();
        onDrop(node);
      }}
      onDragOver={(e) => e.preventDefault()} // Needed to allow drop
      className="pl-5 my-1.5 border-l border-gray-300"
    >
      <div className="flex items-center mb-1.5">
        <span className="cursor-pointer mr-2.5 font-bold text-green-600" onClick={toggleExpand}>
          {hasChildren ? (expanded ? "v" : ">") : "*"}
        </span>
        {renderNode ? (
          renderNode(node)
        ) : (
          <DefaultNodeComponent
            node={node}
            uniqueIdFieldName={uniqueIdFieldName}
          />
        )}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child[uniqueIdFieldName]}
              node={child}
              renderNode={renderNode}
              uniqueIdFieldName={uniqueIdFieldName}
              selectedNodeId={selectedNodeId}
              isDraggable={isDraggable}
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DefaultNodeComponent = ({ node, uniqueIdFieldName }) => (
  <span className="text-sm text-gray-800">
    {node.name || node[uniqueIdFieldName]}
  </span>
);

const Tree = ({
  data,
  renderNode,
  uniqueIdFieldName = "uniqueId",
  selectedNodeId = "",
  expandAll = false,
  areNodesDraggable = false,
  onDragStart,
  onDrop,
  errorMessageOnNoData,
}) => {
  return (
    <div>
      {data && isNonEmptyArray(data) ? (
        data.map((node) => (
          <TreeNode
            key={node[uniqueIdFieldName]}
            node={node}
            renderNode={renderNode}
            uniqueIdFieldName={uniqueIdFieldName}
            selectedNodeId={selectedNodeId}
            expandAll={expandAll}
            isDraggable={areNodesDraggable}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))
      ) : (
        <span className="text-red-600">
          {errorMessageOnNoData || "No Data to render tree!!"}
        </span>
      )}
      {/* <JSONDataViewer metadata={{data}} title="Data"/> */}
    </div>
  );
};

const isNonEmptyArray = (input /**: unknown*/) => {
  return input !== null && Array.isArray(input) && input.length > 0;
};

export default Tree;
