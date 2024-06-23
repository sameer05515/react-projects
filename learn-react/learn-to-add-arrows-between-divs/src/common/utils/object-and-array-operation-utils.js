import { getStaticArrayForType, StaticArrayTypes } from './constants/static-arrays';
import { getIndentedStringArrayForType, IndentedStringArrayTypes } from './constants/static-indented-strings';

let currentId = 1;

/**
 * Adds unique IDs to a node and its children, optionally overriding existing IDs.
 * @param {Object} node - The node to process.
 * @param {boolean} overrideId - Whether to override existing IDs.
 * @returns {Object} - The node with unique IDs added.
 */
const addUniqueIds = (node, overrideId = false) => {
    const updatedNode = { ...node };

    if (overrideId || !updatedNode.uniqueId || updatedNode.uniqueId.trim() === "") {
        updatedNode.uniqueId = `NODE_ID_${currentId++}`;
    }

    if (updatedNode.children) {
        updatedNode.children = updatedNode.children.map((child) => addUniqueIds(child));
    }

    return updatedNode;
};

/**
 * Enum for array types.
 * @enum {string}
 */

const ArrayType = {    
    ...Object.keys(IndentedStringArrayTypes).reduce((acc, key) => {
        acc[`ISAT_${key}`] = {
            name: IndentedStringArrayTypes[key],
            type: "INDENTED_STRING_ARRAY"
        };
        return acc;
    }, {}),
    ...Object.keys(StaticArrayTypes).reduce((acc, key) => {
        acc[`SAT_${key}`] = {
            name: StaticArrayTypes[key],
            type: "STATIC_ARRAY"
        };
        return acc;
    }, {}),
};

/**
 * Returns an array with unique IDs added based on the provided array type.
 * @param {string} type - The type of array to process.
 * @returns {Array} - The array with unique IDs added.
 */
const getUpdatedArrayForType = (type = null) => {
    if (!type) return [];

    const selectedArrayType= ArrayType[type];
    console.log('type selected: ', type)
    console.log('selectedArrayType: ',JSON.stringify(selectedArrayType))

    let selectedArray=[];

    if(selectedArrayType.type=== "STATIC_ARRAY"){
        selectedArray= getStaticArrayForType(selectedArrayType.name);
    }else if(selectedArrayType.type=== "INDENTED_STRING_ARRAY"){
        selectedArray= getIndentedStringArrayForType(selectedArrayType.name);
    }
    return selectedArray.map((item) => addUniqueIds(item));
};

/**
 * Generates hierarchical tree data with a specified depth and number of items per level.
 * @param {number} depth - The depth of the tree.
 * @param {number} itemsPerLevel - The number of items per level.
 * @returns {Array} - The generated tree data with unique IDs.
 */
const generateTreeData = (depth = 1, itemsPerLevel = 1) => {
    let uniqueId = 1;

    const generateChildren = (parentId, currentDepth) => {
        if (currentDepth >= depth) return [];

        const children = [];
        for (let i = 0; i < itemsPerLevel; i++) {
            const id = uniqueId++;
            const node = {
                uniqueId: id,
                name: `Item ${id}`,
                children: generateChildren(id, currentDepth + 1),
                parentId: parentId,
                currentDepth,
            };
            children.push(node);
        }

        return children;
    };

    const rootNodes = generateChildren(0, 0);
    return rootNodes ? rootNodes.map((node) => addUniqueIds(node, true)) : [];
};

export {
    generateTreeData,
    ArrayType,
    getUpdatedArrayForType,
    addUniqueIds
};
