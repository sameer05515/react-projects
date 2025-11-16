import React, { useState, useCallback, useMemo, useEffect } from "react";

type GenericNode = {
  [key: string]: any;
  name?: string;
  children?: GenericNode[];
};

type RenderNodeFn<T extends GenericNode> = (node: T) => React.ReactNode;

interface TreeNodeProps<T extends GenericNode> {
  node: T;
  renderNode?: RenderNodeFn<T>;
  uniqueIdFieldName: string;
  selectedNodeId?: string | number;
  expandAll?: boolean;
  isDraggable?: boolean;
  onDragStart?: (node: T) => void;
  onDrop?: (node: T) => void;
}

interface TreeProps<T extends GenericNode> {
  data: T[];
  renderNode?: RenderNodeFn<T>;
  uniqueIdFieldName?: string;
  selectedNodeId?: string | number;
  expandAll?: boolean;
  areNodesDraggable?: boolean;
  onDragStart?: (node: T) => void;
  onDrop?: (node: T) => void;
  errorMessageOnNoData?: string;
}

function TreeNode<T extends GenericNode>({
  node,
  renderNode,
  uniqueIdFieldName,
  selectedNodeId,
  expandAll = false,
  isDraggable = false,
  onDragStart,
  onDrop,
}: TreeNodeProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const checkIfIdOfNodeOrItsOneOfTheChildren = useCallback((id: any, currentNode: T): boolean => {
    if (!id) return false;
    if (id === currentNode[uniqueIdFieldName]) return true;
    if (currentNode.children && currentNode.children.length > 0) {
      return currentNode.children.some((child: any) =>
        checkIfIdOfNodeOrItsOneOfTheChildren(id, child)
      );
    }
    return false;
  }, [uniqueIdFieldName]);

  const shouldExpand = useMemo(() => {
    return (
      checkIfIdOfNodeOrItsOneOfTheChildren(selectedNodeId, node) || expandAll
    );
  }, [selectedNodeId, node, expandAll, checkIfIdOfNodeOrItsOneOfTheChildren]);

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
        onDrop && onDrop(node);
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
      {expanded && hasChildren && Array.isArray(node.children) && (
        <div>
          {node.children.map((child: any) => (
            <TreeNode
              key={child[uniqueIdFieldName]}
              node={child}
              renderNode={renderNode}
              uniqueIdFieldName={uniqueIdFieldName}
              selectedNodeId={selectedNodeId}
              expandAll={expandAll}
              isDraggable={isDraggable}
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const DefaultNodeComponent: React.FC<{ node: GenericNode; uniqueIdFieldName: string }> = ({ node, uniqueIdFieldName }) => (
  <span className="text-sm text-gray-800">
    {node.name || node[uniqueIdFieldName]}
  </span>
);

function Tree<T extends GenericNode>({
  data,
  renderNode,
  uniqueIdFieldName = "uniqueId",
  selectedNodeId = "",
  expandAll = false,
  areNodesDraggable = false,
  onDragStart,
  onDrop,
  errorMessageOnNoData,
}: TreeProps<T>) {
  return (
    <div>
      {data && isNonEmptyArray(data) ? (
        data.map((node: any) => (
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
}

const isNonEmptyArray = (input: unknown) => {
  return input !== null && Array.isArray(input) && input.length > 0;
};

export default Tree;
