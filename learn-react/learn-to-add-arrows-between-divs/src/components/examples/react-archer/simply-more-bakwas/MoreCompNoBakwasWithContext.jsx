import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import useTreeData from "../../../../common/hooks/useTreeData";
import {
    SharedConfigurationsProvider,
    useSharedConfigurations,
} from "./ReactArcherConfigurationsUtil";

// Common styles
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

// ToggleButton component
const ToggleButton = React.memo(({ title = "", isVisible, onToggle }) => (
    <button onClick={onToggle}>
        {isVisible ? `Hide ${title}` : `Show ${title}`}
    </button>
));

// NodeComponent for rendering individual nodes
const NodeComponent = React.memo(
    ({ node, onNodeComponentClick = () => { } }) => {
        const [showChildren, setShowChildren] = useState(true);
        const {
            sharedData: { showMetaData: SHOW_METADATA },
        } = useSharedConfigurations();

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
                            style: { strokeColor: "blue", strokeWidth: 2 },
                            label: child.relation || "",
                        }))
                        : []
                }
            >
                <div style={{ ...itemStyle }}>
                    {node.children?.length ? (
                        <span
                            title={showChildren ? "Hide Children" : "Show Children"}
                            style={{ marginRight: '10px', fontSize: '20px' }}
                            onClick={() => {
                                setShowChildren((prev) => !prev);
                                onNodeComponentClick();
                            }}
                        >
                            {showChildren ? "-" : "+"}
                        </span>
                    ): <></>}

                    {
                        SHOW_METADATA ?
                            <>
                                <b>Node Name:</b> {node.name} <br />
                                <b>Level:</b> {node.level} <br />
                                <b>parentId:</b> {node.parentId || "null"} <br />
                                <b>relation:</b> {node.relation} <br />
                                <b>uniqueId:</b> {node.uniqueId} <br />
                                <b>children:</b> {node.children?.length} <br />
                            </> :
                            <><b>{node.name}</b><b>{node.name}</b></>
                    }

                </div>
            </ArcherElement>
        );
    }
);

// LevelSectionComponent for rendering nodes at each level
const LevelSectionComponent = React.memo(
    ({ nodeChildrenData = [], parentId = "", level = 0 }) => {
        const {
            sharedData: { showMetaData: SHOW_METADATA },
        } = useSharedConfigurations();

        return (
            <div style={rowStyle}>
                {SHOW_METADATA && (
                    <div>
                        Parent Id: '{parentId}', Total elements: {nodeChildrenData.length},
                        Level: {level}
                    </div>
                )}
                {nodeChildrenData.map((ncd) => (
                    <NodeComponent key={ncd.uniqueId} node={ncd} />
                ))}
            </div>
        );
    }
);

// LevelComponent for grouping nodes at a specific level
const LevelComponent = ({ levelData = [], level = 0 }) => {
    const {
        sharedData: { showMetaData: SHOW_METADATA },
    } = useSharedConfigurations();
    const { getNodeChildrenCompArr } = useTreeData();
    const nodeChildrenCompArr = getNodeChildrenCompArr(levelData);

    return (
        <div style={{ ...rowStyle, gap: "5px" }}>
            {SHOW_METADATA && (
                <div>
                    Level: {level}, Total elements: {levelData.length}
                </div>
            )}
            {nodeChildrenCompArr.map((lc) => (
                <LevelSectionComponent
                    key={lc.parentId || lc.nodeChildrenData[0]?.uniqueId || "unknown"}
                    parentId={lc.parentId}
                    nodeChildrenData={lc.nodeChildrenData}
                    level={level}
                />
            ))}
        </div>
    );
};

// ContainerComponent for rendering the hierarchy using ArcherContainer
const ContainerComponent = ({ levelCompArr = [] }) => (
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

const ConfigurationAndMetadataDisplayComponent = ({ metadata = [] }) => {
    const [buttonStates, setButtonStates] = useState({
        showJson: false,
        showConfigurations: false,
    });
    const {
        sharedData: { showMetaData: SHOW_METADATA },
        toggleShowMetaData,
    } = useSharedConfigurations();

    return (
        <>
            <div style={{ padding: "10px", border: "1px solid black" }}>
                <div style={{ margin: "5px" }}>
                    <ToggleButton
                        title="JSON"
                        isVisible={buttonStates.showJson}
                        onToggle={() =>
                            setButtonStates((prev) => ({ ...prev, showJson: !prev.showJson }))
                        }
                    />
                    <ToggleButton
                        title="Configurations"
                        isVisible={buttonStates.showConfigurations}
                        onToggle={() =>
                            setButtonStates((prev) => ({
                                ...prev,
                                showConfigurations: !prev.showConfigurations,
                            }))
                        }
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    {buttonStates.showJson && (
                        <div style={{ ...itemStyle, flex: "1" }}>
                            <pre>{JSON.stringify(metadata, null, 2)}</pre>
                        </div>
                    )}
                    {buttonStates.showConfigurations && (
                        <div style={{ ...itemStyle, flex: "1" }}>
                            {/* Configuration Panel will be shown soon!! */}
                            <ToggleButton
                                title="METADATA"
                                isVisible={SHOW_METADATA}
                                onToggle={() => toggleShowMetaData()}
                            />
                        </div>
                    )}
                </div>
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
        </>
    );
};

// Main component wrapping the entire application
const MoreCompNoBakwasWithContext = ({ data = [] }) => {
    const { dataWithLevelAndParentIdField, levelCompArr } = useTreeData(data);

    return (
        <SharedConfigurationsProvider>
            <div><pre>{JSON.stringify(levelCompArr, null, 2)}</pre></div>
            <ConfigurationAndMetadataDisplayComponent
                metadata={dataWithLevelAndParentIdField}
            />
            <ContainerComponent levelCompArr={levelCompArr} />
        </SharedConfigurationsProvider>
    );
};

export default MoreCompNoBakwasWithContext;
