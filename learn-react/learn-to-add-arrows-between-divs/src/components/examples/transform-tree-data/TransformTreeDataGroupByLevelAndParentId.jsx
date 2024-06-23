import React, { useEffect, useState, useCallback } from "react";
import JSONDataViewer from "../../../common/components/JSONDataViewer"; 
// Utility functions
const addLevelAndParentIdField = (nodes, currentLevel = 0, parentId = "") => 
    nodes.map(node => {
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

const groupParentIdsByLevel = (data, levels) => 
    levels.map(level => ({
        level,
        parentIds: [...new Set(data.filter(item => item.level === level).map(item => item.parentId))],
    }));

const createLevelSections = (data, parentIdsByLevel) => 
    parentIdsByLevel.map(({ level, parentIds }) => ({
        level,
        sections: parentIds.map(parentId => ({
            parentId,
            nodes: data.filter(item => item.level === level && item.parentId === parentId),
        })),
    }));

const TransformTreeDataGroupByLevelAndParentId = ({ data = [] }) => {
    const [newTreeData, setNewTreeData] = useState([]);
    const [stepDataArr, setStepDataArr] = useState([]);

    const processTreeData = useCallback((data) => {
        const steps = [];

        steps.push({ title: "Get Raw tree data", metadata: data });

        const withExtraRequiredFields = addLevelAndParentIdField(data);
        steps.push({ title: "Add level and parentId fields", metadata: withExtraRequiredFields });

        const flattenedData = flattenTreeData(withExtraRequiredFields);
        steps.push({ title: "Get Flatten array", metadata: flattenedData });

        const levels = [...new Set(flattenedData.map(item => item.level))];
        steps.push({ title: "Get All distinct levels", metadata: levels });

        const parentIdsByLevel = groupParentIdsByLevel(flattenedData, levels);
        steps.push({ title: "Get All distinct parent ids for each level", metadata: parentIdsByLevel });

        const levelSections = createLevelSections(flattenedData, parentIdsByLevel);
        steps.push({ title: "Create levelSection data", metadata: levelSections });

        setNewTreeData(levelSections);
        steps.push({ title: "Finally processed data", metadata: levelSections });

        setStepDataArr(steps);
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            processTreeData(data);
        }
    }, [data, processTreeData]);

    return (
        <>
            <h1>
                Transform given tree data into a new array, containing objects of level.
                Each level object will contain sections. Each section will contain nodes.
            </h1>

            <h2>Step Details:-</h2>
            {stepDataArr.map(({ title, metadata }) => (
                <JSONDataViewer key={title} title={title} metadata={metadata} />
            ))}

            <h2>Final Outcome:-</h2>
            <JSONDataViewer
                title="Final Data"
                metadata={newTreeData}
                initialValueToShowMetadata={true}
            />
        </>
    );
};

export default TransformTreeDataGroupByLevelAndParentId;
