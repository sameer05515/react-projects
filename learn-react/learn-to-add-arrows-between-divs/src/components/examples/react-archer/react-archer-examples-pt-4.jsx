import { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { ArrayType, getUpdatedArrayForType } from "../../../common/utils/object-and-array-operation-utils";

// Constants
const MAX_ALLOWED_LEVEL = 2;
const ALLOW_ALL_LEVELS = true;

// Styles
// const rootStyle = { display: "flex", justifyContent: "center" };
const rowStyle = {
    margin: "50px 0", // Adjust margin based on layout needs
    display: "flex",
    justifyContent: "center",
};
// const boxStyle = { padding: "10px", border: "1px solid black", fontSize: '10px' };

// const levelStyle={display: "flex", justifyContent: "center", border: "1px solid red"};
// const nodeChildrenStyle={display: "flex", justifyContent: "center", border: "1px solid green"};
const itemStyle={padding: "10px", border: "1px solid black", fontSize: '13px'};

// Common Components

const TreeNode = ({ node, level, parentId }) => (
    <ArcherElement
        key={node.uniqueId}
        id={node.uniqueId}
        relations={
            node.children?.length
                ? node.children.map((child) => ({
                    targetId: child.uniqueId,
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: { strokeDasharray: "1,1" },
                    label: child.relation || ''
                }))
                : []
        }
    >
        <div style={itemStyle}>
            <b>Node Name: </b>{node.name} <br />
            <b>Level: </b> {level} <br />
            <b>parentId: </b> {parentId || 'null'}
        </div>
    </ArcherElement>
);

// const TreeLevel = ({ nodes, level, parentId }) => (
//     <>
//     </>
// )

const TreeLevelNodeChildren = ({ nodes, level, parentId }) => (
    <div key={`${level}-${parentId ? parentId : ''}`} style={rowStyle}>
        {nodes.map((node) => (
            <TreeNode key={node.uniqueId} node={node} level={level} parentId={parentId} />
        ))}
    </div>
);

const ToggleButton = ({ showJson, toggleShowJson=()=>{} }) => (
    <button onClick={toggleShowJson}>
        {showJson ? "Hide" : "Show"}
    </button>
);

// Main Component
const ReactArcherApp9 = ({ data = getUpdatedArrayForType(ArrayType.britishRoyalFamily) }) => {
    const [showJson, setShowJson] = useState(false);

    const toggleShowJson = () => setShowJson((prev) => !prev);

    const renderTree = (nodes, level = 0, parentId = '') => {
        if (!nodes?.length) return null;

        return (
            <>
                <TreeLevelNodeChildren nodes={nodes} level={level} parentId={parentId} />
                {(ALLOW_ALL_LEVELS || level < MAX_ALLOWED_LEVEL) &&
                    nodes.map((node) => node.children && renderTree(node.children, level + 1, node.uniqueId))}
            </>
        );
    };

    return (
        <>
            <div>
                <ToggleButton showJson={showJson} toggleShowJson={toggleShowJson} />
                {showJson && (
                    <pre style={{ padding: "10px", border: "1px solid black" }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}
            </div>
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="green">
                    {renderTree(data)}
                </ArcherContainer>
            </div>
        </>
    );
};

export { ReactArcherApp9 };
