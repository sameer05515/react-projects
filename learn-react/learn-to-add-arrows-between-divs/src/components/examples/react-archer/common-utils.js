import { useMemo, useState } from "react";
import { ArcherElement } from "react-archer";
import { getPart1ArcherBoxesForType, getPart1StylesForType } from "../../../common/utils/react-archer-examples-pt-1-common";

// Custom hook to handle common logic
export const useArcherData = (data, type) => {
    const [showJson, setShowJson] = useState(false);
    const updatedFirstElement = useMemo(() => (data.length > 0 ? data[0] : {}), [data]);
    const archerBoxes = useMemo(() => getPart1ArcherBoxesForType(type, updatedFirstElement), [type, updatedFirstElement]);
    const styles = useMemo(() => getPart1StylesForType(type), [type]);

    return { showJson, setShowJson, updatedFirstElement, archerBoxes, styles };
};


// Common styles
export const commonStyles = {
    rootStyle: { display: "flex", justifyContent: "center" },
    rowStyle: {
        margin: "100px 0",
        display: "flex",
        justifyContent: "center",
    },
    boxStyle: { padding: "10px", border: "1px solid black" },
};

// PopulateChildren component
export const PopulateChildren = ({ nodes = [], level = 0, parentId = '', styles, includeRelation = false }) => {
    return nodes.length ? (
        <div key={level} style={styles.rowStyle}>
            {nodes.map((node) => (
                <ArcherElement
                    key={node.uniqueId}
                    id={node.uniqueId}
                    relations={
                        includeRelation && node.children
                            ? node.children.map((child) => ({
                                  targetId: child.uniqueId,
                                  targetAnchor: "top",
                                  sourceAnchor: "bottom",
                                  style: { strokeDasharray: "1,1" },
                                  label: child.relation || '',
                              }))
                            : []
                    }
                >
                    <div style={{ ...styles.boxStyle, fontSize: '10px' }}>
                        <b>{node.name}</b>{` - level: ${level} - parentId: ${parentId || 'null'}`}
                    </div>
                </ArcherElement>
            ))}
        </div>
    ) : null;
};

// RenderTree function
export const renderTree = (nodes, level = 0, parentId = '', styles, maxLevel, allowAllLevels) => {
    if (!nodes.length) return null;

    return (
        <>
            {PopulateChildren({ nodes, level, parentId, styles, includeRelation: true })}
            {(allowAllLevels || level + 1 <= maxLevel) && nodes.map((node) =>
                node.children && renderTree(node.children, level + 1, node.uniqueId, styles, maxLevel, allowAllLevels)
            )}
        </>
    );
};

// JsonToggle component
export const JsonToggle = ({ showJson, setShowJson, data }) => (
    <div>
        <button onClick={() => setShowJson(prev => !prev)}>
            {showJson ? "Hide" : "Show"}
        </button>
        {showJson && (
            <pre style={{ padding: "10px", border: "1px solid black" }}>
                {JSON.stringify(data, null, 2)}
            </pre>
        )}
    </div>
);
