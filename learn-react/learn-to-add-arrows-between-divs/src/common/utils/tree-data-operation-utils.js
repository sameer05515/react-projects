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
const processTreeNodes = (nodes = [], callback, currentLevel = 0, parentId = "") => {
    return nodes.map(node => {
        const updatedNode = callback(node, currentLevel, parentId);
        if (hasChildren(updatedNode)) {
            updatedNode.children = processTreeNodes(updatedNode.children, callback, currentLevel + 1, updatedNode.uniqueId);
        }
        return updatedNode;
    });
};

/**
 * Adds level and parentId fields to tree nodes, with additional fields from a callback.
 * @param {Array} nodes - The nodes to process.
 * @param {Function} addExtraFieldsCallback - A callback to add extra fields to each node.
 * @returns {Array} - The nodes with added level, parentId, and extra fields.
 */
const addLevelAndParentIdFields = (nodes = [], addExtraFieldsCallback = () => ({})) => {
    const callback = (node, currentLevel, parentId) => ({
        ...node,
        level: currentLevel,
        parentId,
        ...addExtraFieldsCallback(node),
    });
    return processTreeNodes(nodes, callback);
};

/**
 * Flattens tree data into a single array, optionally filtering nodes.
 * @param {Array} nodes - The nodes to flatten.
 * @param {Function} filterCondition - A function to filter nodes.
 * @returns {Array} - The flattened tree data.
 */
const flattenTreeData = (nodes, filterCondition = () => true) => {
    const result = [];
    const flatten = (node) => {
        result.push({ ...node });
        if (hasChildren(node) && filterCondition(node)) {
            node.children.forEach(flatten);
        }
    };
    nodes.forEach(flatten);
    return result;
};

/**
 * Filters nodes by a specific field value.
 * @param {Array} data - The nodes to filter.
 * @param {*} value - The value to filter by.
 * @param {string} [fieldName="level"] - The field to filter by.
 * @returns {Array} - The filtered nodes.
 */
const filterNodesByFieldValue = (data, value, fieldName = "level") =>
    data.filter(node => node[fieldName] === value);

/**
 * Gets distinct values for a specific field from the nodes.
 * @param {Array} data - The nodes to process.
 * @param {string} [fieldName='parentId'] - The field to get distinct values for.
 * @returns {Array} - The distinct values for the specified field.
 */
const getDistinctValuesForField = (data, fieldName = 'parentId') => {
    const values = new Set(data.map(node => node[fieldName]));
    return [...values].sort();
};

/**
 * Toggles the showChildren field for a node by uniqueId.
 * @param {Array} nodes - The nodes to update.
 * @param {string} uniqueId - The uniqueId of the node to toggle.
 * @returns {Array} - The nodes with the updated showChildren field.
 */
const toggleShowChildrenById = (nodes, uniqueId) =>
    processTreeNodes(nodes, (node) => ({
        ...node,
        showChildren: node.uniqueId === uniqueId ? !node.showChildren : node.showChildren,
    }));

const toggleShowChildrenForAll = (nodes) =>
    processTreeNodes(nodes, (node) => ({
        ...node,
        showChildren: !node.showChildren,
    }));


export {
    flattenTreeData,
    addLevelAndParentIdFields,
    filterNodesByFieldValue,
    getDistinctValuesForField,
    toggleShowChildrenById,
    toggleShowChildrenForAll
};
