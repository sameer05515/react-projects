import { useMemo } from "react";

// Utility function to generate a flat array from tree data
const flattenTreeData = (nodes, accumulatedQueue = [], idField) => {
  let queue = [...accumulatedQueue];
  if (nodes && nodes.length > 0) {
    nodes.forEach((node) => {
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
const buildTitleWithAncestors = (node, idField) => {
  if (!node) {
    return "";
  }
  let ancestorNames = [];
  let currentAncestor =
    node.ancestors?.find((ancestor) => !ancestor.parentId) || null;
  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    currentAncestor = node.ancestors.find(
      (ancestor) => ancestor.parentId === currentAncestor[idField]
    );
  }
  ancestorNames.push(node.name);
  return ancestorNames.join(" / ");
};

const useFlatTreeData = (treeData, selectedUniqueId, uniqueIdFieldName = 'uniqueId') => {
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
