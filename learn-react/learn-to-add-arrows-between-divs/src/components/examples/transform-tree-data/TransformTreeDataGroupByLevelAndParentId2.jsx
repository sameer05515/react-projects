// TransformTreeDataGroupByLevelAndParentId.js
import React, { useEffect, useState, useCallback } from 'react';
// import TreeDataProcessor from './TreeDataProcessor';

// TreeDataProcessor.js

// Helper functions for tree data processing
const addLevelAndParentIdField = (nodes = [], currentLevel = 0, parentId = "") =>
    nodes.map((node) => {
        const updatedNode = {
            ...node,
            level: currentLevel,
            parentId,
            showChildren: false,
            childCount: node.children?.length || 0,
            hasChildren: node.children?.length > 0,
        };

        if (updatedNode.children) {
            updatedNode.children = addLevelAndParentIdField(updatedNode.children, currentLevel + 1, updatedNode.uniqueId);
        }

        return updatedNode;
    });

const flattenTreeData = (nodes) => {
    const result = [];

    const flatten = (node) => {
        result.push({ ...node, children: undefined });
        if (node.children) {
            node.children.forEach(flatten);
        }
    };

    nodes.forEach(flatten);

    return result;
};

const groupParentIdsByLevel = (data, levels) => {
    return levels.map((level) => ({
        level,
        parentIds: [...new Set(data.filter((item) => item.level === level).map((item) => item.parentId))],
    }));
};

const createLevelSections = (data, parentIdsByLevel) => {
    return parentIdsByLevel.map(({ level, parentIds }) => ({
        level,
        sections: parentIds.map((parentId) => ({
            parentId,
            nodes: data.filter((item) => item.level === level && item.parentId === parentId),
        })),
    }));
};

// TreeDataProcessor Component
const TreeDataProcessor = ({ data, onProcess }) => {
    const [stepDataArr, setStepDataArr] = useState([]);

    const processTreeData = useCallback((data) => {
        const steps = [];

        steps.push({ title: "Get Raw tree data", metadata: data });

        const withExtraRequiredFields = addLevelAndParentIdField(data);
        steps.push({ title: "Add level and parentId fields", metadata: withExtraRequiredFields });

        const flattenedData = flattenTreeData(withExtraRequiredFields);
        steps.push({ title: "Get Flatten array", metadata: flattenedData });

        const levels = [...new Set(flattenedData.map((item) => item.level))];
        steps.push({ title: "Get All distinct levels", metadata: levels });

        const parentIdsByLevel = groupParentIdsByLevel(flattenedData, levels);
        steps.push({ title: "Get All distinct parent ids for each level", metadata: parentIdsByLevel });

        const levelSections = createLevelSections(flattenedData, parentIdsByLevel);
        steps.push({ title: "Create levelSection data", metadata: levelSections });

        steps.push({ title: "Finally processed data", metadata: levelSections });

        setStepDataArr(steps);
        onProcess(levelSections);
    }, [onProcess]);

    useEffect(() => {
        if (data && data.length > 0) {
            processTreeData(data);
        }
    }, [data, processTreeData]);

    return (
        <>
            {stepDataArr.map(({ title, metadata }, index) => (
                <div key={index}>
                    <h3>{title}</h3>
                    <pre>{JSON.stringify(metadata, null, 2)}</pre>
                </div>
            ))}
        </>
    );
};

// export default TreeDataProcessor;


const TransformTreeDataGroupByLevelAndParentId2 = ({ data = [] }) => {
    const [newTreeData, setNewTreeData] = useState([]);

    return (
        <>
            <h1>
                Transform given tree data into a new array, containing objects of level.
                Each level object will contain sections. Each section will contain nodes.
            </h1>

            <TreeDataProcessor data={data} onProcess={setNewTreeData} />

            <h2>Final Outcome:</h2>
            <div
                style={{
                    maxHeight: "200px",
                    maxWidth: "90vw",
                    overflow: "auto",
                    padding: "10px",
                    gap: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    margin: "20px 5px",
                }}
            >
                <pre>{JSON.stringify(newTreeData, null, 2)}</pre>
            </div>
        </>
    );
};

export default TransformTreeDataGroupByLevelAndParentId2;
