import { getDateAsMillisecondsString } from "../service/commonService";

const defaultPrefix = 'NODE_ID_';

/**
 * Adds unique IDs to a given list to its all node and its children, optionally overriding existing IDs.
 * @param {Object} nodes - The nodes to process.
 * @param {boolean} overrideId - Whether to override existing IDs.
 * @returns {Object} - The node with unique IDs added.
 */
export const addUniqueIdsToTree = (nodes = [], prefix, overrideId = true) => {

    if(!nodes || !Array.isArray(nodes) || nodes.length<1) return [];

    const prefixTobeUsed = prefix || defaultPrefix+getDateAsMillisecondsString();
    let currentId = 1;
    const add = (node, parentId="") => {
        const updatedNode = { ...node };

        if (overrideId || !updatedNode.uniqueId || updatedNode.uniqueId.trim() === "") {
            updatedNode.uniqueId = `${prefixTobeUsed}_${currentId++}`;
            updatedNode.parentId=parentId||"";
        }

        if (updatedNode.children) {
            updatedNode.children = updatedNode.children.map((child) => add(child, updatedNode.uniqueId));
        }

        return updatedNode;
    }

    return nodes.map(node => add(node));
};


/**
 * Checks if a node has children.
 * @param {Object} node - The node to check.
 * @returns {boolean} - True if the node has children, false otherwise.
 */
const hasChildren = (node) => node.children && node.children.length > 0;

/**
 * Recursively processes tree nodes with a callback function.
 * @param {Array} nodes - The nodes to process.
 * @param {Function} callback - The callback function to apply to each node.
 * @param {number} currentLevel - The current level in the tree.
 * @param {string} parentId - The parent ID for the current nodes.
 * @returns {Array} - The processed nodes.
 */
export const processTreeNodes = (nodes = [], callback) => {
    return nodes.map(node => {
        const updatedNode = callback(node);
        if (hasChildren(updatedNode)) {
            updatedNode.children = processTreeNodes(updatedNode.children, callback);
        }
        return updatedNode;
    });
};