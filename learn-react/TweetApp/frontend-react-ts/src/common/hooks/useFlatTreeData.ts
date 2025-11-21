import { useMemo } from "react";

interface TreeNode {
  [key: string]: any;
  name?: string;
  ancestors?: any[];
  children?: TreeNode[];
  _id?: any;
}

// Utility function to generate a flat array from tree data
const flattenTreeData = (nodes: TreeNode[] | undefined, accumulatedQueue: any[] = [], idField: string): any[] => {
  let queue: any[] = [...accumulatedQueue];
  if (nodes && nodes.length > 0) {
    nodes.forEach((node: TreeNode) => {
      queue = [
        ...queue,
        {
          ...node,
          [idField]: node[idField],
          name: node.name,
          title: buildTitleWithAncestors(node, idField),
          ancestors: node.ancestors,
          children: node.children,
          _id: node._id,
        },
      ];
      const childQueue = flattenTreeData(node.children, [], idField);
      queue = [...queue, ...childQueue];
    });
  }
  return queue;
};

// Utility function to build a title string with ancestors
const buildTitleWithAncestors = (node: TreeNode | null, idField: string): string => {
  if (!node) {
    return "";
  }
  const ancestorNames: string[] = [];
  let currentAncestor: any =
    node.ancestors?.find((ancestor: any) => !ancestor.parentId) || null;
  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    const currentId = currentAncestor[idField];
    currentAncestor =
      node.ancestors?.find((ancestor: any) => ancestor.parentId === currentId) ||
      null;
  }
  ancestorNames.push(node.name || "");
  return ancestorNames.join(" / ");
};

const useFlatTreeData = (treeData: TreeNode[] | undefined, selectedUniqueId?: string, uniqueIdFieldName = 'uniqueId') => {
  // Generate flat data from tree data
  const flatData = useMemo(() => flattenTreeData(treeData, [], uniqueIdFieldName), [treeData, uniqueIdFieldName]);

  // Get previous and next item 
  const prevItem = useMemo(() => {
    const dataLength = flatData?.length || 0;
    const selectedIndex = flatData.findIndex(
      (item) => item[uniqueIdFieldName] === selectedUniqueId
    );
    if (selectedIndex < 0) {
      return null;
    }
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatData[prevIndex] || null;
  }, [flatData, selectedUniqueId, uniqueIdFieldName]);

  const nextItem = useMemo(() => {
    const dataLength = flatData?.length || 0;
    const selectedIndex = flatData.findIndex(
      (item) => item[uniqueIdFieldName] === selectedUniqueId
    );
    if (selectedIndex < 0) {
      return null;
    }
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatData[nextIndex] || null;
  }, [flatData, selectedUniqueId, uniqueIdFieldName]);

  return {
    flatData,
    prevItem,
    nextItem,
  };
};

export default useFlatTreeData;
