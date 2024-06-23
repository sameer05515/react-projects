/**
 * Simulates an asynchronous data processing step, with a possibility of error.
 * @param {string} stepName - The name of the processing step.
 * @param {Function} processingFunction - The function that performs the processing.
 * @param {Array} data - The data to process.
 * @returns {Promise<Object>} - A promise that resolves to an object containing step metadata.
 */
const simulateProcessingStep = (stepName, processingFunction, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isError = Math.random() < 0.2; // 20% chance of error

            if (isError) {
                return reject(new Error(`${stepName} failed due to an unexpected error.`));
            }

            try {
                const metadata = processingFunction(data);
                resolve({ title: stepName, metadata });
            } catch (error) {
                reject(new Error(`${stepName} encountered an error: ${error.message}`));
            }
        }, 1000); // Simulating delay
    });
};

/**
 * Processes tree data by adding level and parentId fields.
 * @param {Array} data - The tree data to process.
 * @returns {Array} - The processed tree data with additional fields.
 */
const addLevelAndParentIdFields = (data) => {
    const processTreeNodes = (nodes, currentLevel = 0, parentId = "") => {
        return nodes.map((node) => {
            const updatedNode = {
                ...node,
                level: currentLevel,
                parentId,
                showChildren: false,
                childCount: node.children?.length || 0,
                hasChildren: node.children?.length > 0,
            };

            if (updatedNode.children) {
                updatedNode.children = processTreeNodes(updatedNode.children, currentLevel + 1, updatedNode.uniqueId);
            }

            return updatedNode;
        });
    };

    return processTreeNodes(data);
};

/**
 * Flattens tree data into a single array.
 * @param {Array} data - The tree data to flatten.
 * @returns {Array} - The flattened tree data.
 */
const flattenTreeData = (data) => {
    const result = [];

    const flatten = (node) => {
        result.push({ ...node, children: undefined });
        if (node.children) {
            node.children.forEach(flatten);
        }
    };

    data.forEach(flatten);

    return result;
};

/**
 * Extracts distinct levels from flattened tree data.
 * @param {Array} data - The flattened tree data.
 * @returns {Array} - An array of distinct levels.
 */
const getDistinctLevels = (data) => {
    return [...new Set(data.map((item) => item.level))];
};

/**
 * Groups parent IDs by level in the tree data.
 * @param {Array} data - The flattened tree data.
 * @param {Array} levels - An array of distinct levels.
 * @returns {Array} - The grouped parent IDs by level.
 */
const groupParentIdsByLevel = (data, levels) => {
    return levels.map((level) => ({
        level,
        parentIds: [...new Set(data.filter((item) => item.level === level).map((item) => item.parentId))],
    }));
};

/**
 * Creates level and section data for the tree.
 * @param {Array} data - The flattened tree data.
 * @param {Array} parentIdsByLevel - The grouped parent IDs by level.
 * @returns {Array} - The level and section data.
 */
const createLevelSections = (data, parentIdsByLevel) => {
    return parentIdsByLevel.map(({ level, parentIds }) => ({
        level,
        sections: parentIds.map((parentId) => ({
            parentId,
            nodes: data.filter((item) => item.level === level && item.parentId === parentId),
        })),
    }));
};

/**
 * Processes tree data step by step with promises, handling errors.
 * @param {Array} data - The initial tree data to process.
 * @returns {Promise<Array>} - A promise that resolves to an array of step metadata.
 */
const processTreeDataWithPromises = (data) => {
    const steps = [];

    return simulateProcessingStep("Get Raw tree data", () => data, data)
        .then((step) => {
            steps.push(step);
            return simulateProcessingStep("Add level and parentId fields", addLevelAndParentIdFields, data);
        })
        .then((step) => {
            steps.push(step);
            return simulateProcessingStep("Get Flatten array", flattenTreeData, step.metadata);
        })
        .then((step) => {
            steps.push(step);
            return simulateProcessingStep("Get All distinct levels", getDistinctLevels, step.metadata);
        })
        .then((step) => {
            steps.push(step);
            return simulateProcessingStep("Get All distinct parent ids for each level", (flattenedData) =>
                groupParentIdsByLevel(flattenedData, step.metadata), steps[2].metadata);
        })
        .then((step) => {
            steps.push(step);
            return simulateProcessingStep("Create levelSection data", (flattenedData) =>
                createLevelSections(flattenedData, step.metadata), steps[2].metadata);
        })
        .then((step) => {
            steps.push(step);
            return steps;
        })
        .catch((error) => {
            steps.push({ title: "Error", error });
            return steps;
        });
};

export { processTreeDataWithPromises };
