import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./Tree.module.css"; // Import CSS module

export type TreeNodeType<T> = {  
  name:string;
  uniqueId:string;
  children?: T[] | null; // Allow children to be null
  [key: string]: any;
};

export type TreeProps<T> = {
  data: T[];
  renderNode?: (node: T) => React.ReactNode;
  uniqueIdFieldName?: keyof T;
  selectedNodeId?: string;
  expandAll?: boolean;
  areNodesDraggable?: boolean;
  onDragStart?: (node: T) => void;
  onDrop?: (node: T) => void;
};

export type TreeNodeProps<T> = {
  node: T;
  renderNode?: (node: T) => React.ReactNode;
  uniqueIdFieldName: keyof T;
  selectedNodeId: string;
  expandAll: boolean;
  isDraggable?: boolean;
  onDragStart?: (node: T) => void;
  onDrop?: (node: T) => void;
};

const TreeNode = <T extends TreeNodeType<T>>({
  node,
  renderNode,
  uniqueIdFieldName,
  selectedNodeId,
  expandAll,
  isDraggable = false,
  onDragStart = () => {},
  onDrop = () => {},
}: TreeNodeProps<T>) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  const checkIfIdOfNodeOrItsOneOfTheChildren = (
    id: string | undefined,
    currentNode: T
  ): boolean => {
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
      className={styles.container}
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
    >
      <div className={styles.node}>
        <span className={styles.toggleButton} onClick={toggleExpand}>
          {hasChildren ? (expanded ? "v" : ">") : "*"}
        </span>
        {renderNode ? renderNode(node) : <DefaultNodeComponent node={node} />}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children?.map((child) => (
            <TreeNode
              key={child[uniqueIdFieldName] as string}
              node={child}
              renderNode={renderNode}
              uniqueIdFieldName={uniqueIdFieldName}
              selectedNodeId={selectedNodeId}
              isDraggable={isDraggable}
              onDragStart={onDragStart}
              onDrop={onDrop}
              expandAll={expandAll}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DefaultNodeComponent = <T extends TreeNodeType<T>>({
  node,
}: {
  node: T;
}) => {
  return <span className={styles.nodeName}>{node.name || node.id}</span>;
};

const Tree = <T extends TreeNodeType<T>>({
  data,
  renderNode,
  uniqueIdFieldName = "uniqueId",
  selectedNodeId = "",
  expandAll = false,
  areNodesDraggable = false,
  onDragStart,
  onDrop,
}: TreeProps<T>) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode
          key={node[uniqueIdFieldName] as string}
          node={node}
          renderNode={renderNode}
          uniqueIdFieldName={uniqueIdFieldName}
          selectedNodeId={selectedNodeId}
          expandAll={expandAll}
          isDraggable={areNodesDraggable}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default Tree;
