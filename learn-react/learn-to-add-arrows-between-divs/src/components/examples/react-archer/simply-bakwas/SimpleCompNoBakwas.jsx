import React, { useMemo, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { ArrayType, getUpdatedArrayForType } from "../../../../common/utils/object-and-array-operation-utils";
import {
    addLevelAndParentIdFields,
    filterNodesByFieldValue,
    flattenTreeData,
    getDistinctValuesForField,
} from "../../../../common/utils/tree-data-operation-utils";

const SHOW_METADATA = false;

const itemStyle = {
    padding: "10px",
    border: "1px solid black",
    fontSize: "10px",
};

const rowStyle = {
    margin: "50px 0",
    display: "flex",
    justifyContent: "space-between",
};

const ToggleButton = ({ showJson, toggleShowJson }) => (
    <button onClick={toggleShowJson}>{showJson ? "Hide" : "Show"}</button>
);

const NodeComponent = ({ node, onNodeComponentClick = () => { } }) => {
    const [showChildren, setShowChildren] = useState(true);

    return (
        <ArcherElement
            key={node.uniqueId}
            id={node.uniqueId}
            relations={
                showChildren && node.children?.length
                    ? node.children.map((child) => ({
                        targetId: child.uniqueId,
                        targetAnchor: "top",
                        sourceAnchor: "bottom",
                        style: { strokeColor: "blue", strokeWidth: 2 }, // Adjust stroke style
                        label: child.relation || "",
                    }))
                    : []
            }
        >
            <div style={itemStyle}>
                <b>Node Name:</b> {node.name} <br />
                <b>Level:</b> {node.level} <br />
                <b>parentId:</b> {node.parentId || "null"} <br />
                <b>relation: </b> {node.relation} <br />
                <b>uniqueId: </b> {node.uniqueId} <br />
                <b>children</b> {node.children?.length} <br />
                {node.children?.length && <button
                    onClick={() => {
                        setShowChildren((prev) => !prev);
                        onNodeComponentClick();
                    }}
                >
                    {showChildren ? "Hide" : "Show"}
                </button>}
            </div>
        </ArcherElement>
    );
};

const LevelSectionComponent = ({
    nodeChildrenData = [],
    parentId = "",
    level = 0,
}) => (
    <div style={rowStyle}>
        {SHOW_METADATA && (
            <>
                Parent Id: '{parentId}', Total elements: {nodeChildrenData.length},
                Level: {level}
            </>
        )}

        {nodeChildrenData.map((ncd) => (
            <NodeComponent key={ncd.uniqueId} node={ncd} />
        ))}
    </div>
);

const LevelComponent = ({ levelData = [], level = 0 }) => {
    const nodeChildrenCompArr = useMemo(() => {
        const distinctParentIds = getDistinctValuesForField(levelData, "parentId");
        return distinctParentIds.map((parentId) => ({
            parentId,
            nodeChildrenData:
                filterNodesByFieldValue(levelData, parentId, "parentId") || [],
        }));
    }, [levelData]);

    return (
        <div style={{ ...rowStyle, gap: "5px" }}>
            {SHOW_METADATA && (
                <>
                    Level: {level}, Total elements: {levelData.length}
                </>
            )}

            {nodeChildrenCompArr.map((lc, index) => (
                <LevelSectionComponent
                    key={lc.parentId || index}
                    parentId={lc.parentId}
                    nodeChildrenData={lc.nodeChildrenData}
                    level={level}
                />
            ))}
        </div>
    );
};

const ContainerComponent = ({ data = [] }) => {
    const flattenedData = useMemo(() => flattenTreeData(data), [data]);
    const levelCompArr = useMemo(() => {
        let currentLevel = 0;
        const levelComponentArr = [];

        while (true) {
            const levelArr = filterNodesByFieldValue(flattenedData, currentLevel,'level');
            if (levelArr.length === 0) break;
            levelComponentArr.push({ level: currentLevel, levelData: levelArr });
            currentLevel++;
        }

        return levelComponentArr;
    }, [flattenedData]);

    return (
        <div style={{ width: "1000px", height: "1000px", margin: "50px" }}>
            <ArcherContainer strokeColor="green">
                {levelCompArr.map((lc) => (
                    <LevelComponent
                        key={lc.level}
                        level={lc.level}
                        levelData={lc.levelData}
                    />
                ))}
            </ArcherContainer>
        </div>
    );
};

const SimpleCompNoBakwas = ({
    data = getUpdatedArrayForType(ArrayType.designPatternsTreeData),
}) => {
    const [showJson, setShowJson] = useState(false);

    const dataWithLevelAndParentIdField = useMemo(
        () => addLevelAndParentIdFields(data),
        [data]
    );

    const toggleShowJson = () => setShowJson((prev) => !prev);

    return (
        <>
            <div>
                <ToggleButton showJson={showJson} toggleShowJson={toggleShowJson} />
                {showJson && (
                    <pre style={itemStyle}>
                        {JSON.stringify(dataWithLevelAndParentIdField, null, 2)}
                    </pre>
                )}
            </div>
            <div>
                <ul>
                    <li>Show all elements at root level</li>
                    <li>
                        Show children of root level grouped by their parentId on the same
                        level
                    </li>
                </ul>
            </div>
            <ContainerComponent data={dataWithLevelAndParentIdField} />
        </>
    );
};

export default SimpleCompNoBakwas;
