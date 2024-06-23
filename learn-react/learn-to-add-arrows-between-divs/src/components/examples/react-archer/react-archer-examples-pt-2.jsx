import { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
// import { updatedNameArr } from "../../common/utils/object-operation-utils";

const ReactArcherApp6 = ({data=[]}) => {
    const [showJson, setShowJson] = useState(false);
    const updatedFirstElement=data && data.length>0 ? data[0]: {};

    const styles = {
        rootStyle: { display: "flex", justifyContent: "center" },
        rowStyle: {
            margin: "100px 0", // Reduced margin for a more compact layout
            display: "flex",
            justifyContent: "center",
        },
        boxStyle: { padding: "10px", border: "1px solid black" },
    };

    const populateChildren = (nodes = [], level = 0) => {
        if (!nodes.length) return null;

        return (
            <div key={level} style={styles.rowStyle}>
                {nodes.map((node) => (
                    <ArcherElement
                        key={node.uniqueId}
                        id={node.uniqueId}
                        relations={
                            node.children && node.children.length > 0
                                ? node.children.map((child) => ({
                                      targetId: child.uniqueId,
                                      targetAnchor: "top",
                                      sourceAnchor: "bottom",
                                      style: { strokeDasharray: "1,1" },
                                  }))
                                : []
                        }
                    >
                        <div style={styles.boxStyle}>{`${node.name} - level: ${level}`}</div>
                    </ArcherElement>
                ))}
            </div>
        );
    };

    const renderTree = (nodes, level = 0) => {
        if (!nodes || !nodes.length) return null;

        return (
            <>
                {populateChildren(nodes, level)}
                {nodes.map((node) => node.children && renderTree(node.children, level + 1))}
            </>
        );
    };

    return (
        <>
            <div>
                <button onClick={() => setShowJson((prev) => !prev)}>
                    {showJson ? "Hide" : "Show"}
                </button>
                {showJson && (
                    <pre style={{ padding: "10px", border: "1px solid black" }}>
                        {JSON.stringify(updatedFirstElement, null, 2)}
                    </pre>
                )}
            </div>
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="red">
                    {renderTree(data)}
                </ArcherContainer>
            </div>
        </>
    );
};

const ReactArcherApp7 = ({data=[]}) => {
    const [showJson, setShowJson] = useState(false);

    const MAX_ALLOWED_LEVEL=2;
    const ALLOW_ALL_LEVELS=true;

    const styles = {
        rootStyle: { display: "flex", justifyContent: "center" },
        rowStyle: {
            margin: "100px 0", // Reduced margin for a more compact layout
            display: "flex",
            justifyContent: "center",
        },
        boxStyle: { padding: "10px", border: "1px solid black" },
    };

    const populateChildren = (nodes = [], level = 0, parentId='') => {
        if (!nodes.length) return null;

        return (
            <div key={level} style={styles.rowStyle}>
                {nodes.map((node) => (
                    <ArcherElement
                        key={node.uniqueId}
                        id={node.uniqueId}
                        relations={
                            node.children && node.children.length > 0
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
                        <div style={{...styles.boxStyle, fontSize:'10px'}}><b>{node.name}</b>{` - level: '${level}' - parentId: '${parentId?parentId:'null'}'`}</div>
                    </ArcherElement>
                ))}
            </div>
        );
    };

    const renderTree = (nodes, level = 0, parentId='') => {
        if (!nodes || !nodes.length) return null;

        return (
            <>
                {populateChildren(nodes, level, parentId)}
                {(ALLOW_ALL_LEVELS || (level+1) <=MAX_ALLOWED_LEVEL) && nodes.map((node) => node.children && renderTree(node.children, level + 1, node.uniqueId))}
            </>
        );
    };

    return (
        <>
            <div>
                <button onClick={() => setShowJson((prev) => !prev)}>
                    {showJson ? "Hide" : "Show"}
                </button>
                {showJson && (
                    <pre style={{ padding: "10px", border: "1px solid black" }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}
            </div>
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="red">
                    {renderTree(data)}
                </ArcherContainer>
            </div>
        </>
    );
};

export { ReactArcherApp6, ReactArcherApp7 };

