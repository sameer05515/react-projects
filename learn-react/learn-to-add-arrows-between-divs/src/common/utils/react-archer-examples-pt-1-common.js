import React from "react";
import { ArcherElement } from "react-archer";

// Generate common styles
export const generateStyles = (padding, border) => ({
    padding,
    border,
});

// Styles for different applications
export const getPart1StylesForType = (type = '') => {
    const baseStyles = {
        container: {
            height: "500px",
            margin: "50px",
        },
        rootStyle: {
            display: "flex",
            justifyContent: "center",
        },
        rowStyle: {
            margin: "200px 0",
            display: "flex",
            justifyContent: "space-between",
        },
        boxStyle: generateStyles("10px", "1px solid black"),
    };

    const typeSpecificStyles = {
        app1: {
            arrowLabel: {
                marginTop: "-20px",
            },
            strokeDash: {
                strokeDasharray: "5,5",
            },
            strokeStyle: {
                strokeColor: "blue",
                strokeWidth: 1,
            },
        },
        app2: {},
        app3: {},
        app4: {},
        app5: {
            rowStyle: {
                margin: "200px 0",
                display: "flex",
                justifyContent: "center",
            },
        },
    };

    return { ...baseStyles, ...(typeSpecificStyles[type] || {}) };
};

// Generate archer boxes based on type and data
export const getPart1ArcherBoxesForType = (type = '', updatedFirstElement = null) => {
    const styles = getPart1StylesForType(type);
    const archerBoxes = {
        app1: [
            {
                id: "root",
                relations: [
                    {
                        targetId: "element2",
                        targetAnchor: "top",
                        sourceAnchor: "bottom",
                        style: styles.strokeDash,
                    },
                ],
                label: "Root",
                style: styles.boxStyle,
                isRoot: true,
            },
            {
                id: "element2",
                relations: [
                    {
                        targetId: "element3",
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: styles.strokeStyle,
                        label: <div style={styles.arrowLabel}>Arrow 2</div>,
                    },
                ],
                label: "Element 2",
                style: styles.boxStyle,
            },
            {
                id: "element3",
                label: "Element 3",
                style: styles.boxStyle,
            },
            {
                id: "element4",
                relations: [
                    {
                        targetId: "root",
                        targetAnchor: "right",
                        sourceAnchor: "left",
                        label: "Arrow 3",
                    },
                ],
                label: "Element 4",
                style: styles.boxStyle,
            },
        ],
        app2: updatedFirstElement ? [
            {
                id: updatedFirstElement.uniqueId,
                relations: getArcherElementRelations(updatedFirstElement.children, { target: "top", source: "bottom" }),
                label: updatedFirstElement.name,
                style: styles.boxStyle,
                isRoot: true,
            },
            ...(updatedFirstElement.children || []).map(child => ({
                id: child.uniqueId,
                label: child.name,
                style: styles.boxStyle,
                isRoot: false,
            })),
        ] : [],
    };

    return archerBoxes[type] || [];
};

// Component to render ArcherBox
export const ArcherBox = ({ id, relations = [], label, style = {} }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={style}>{label}</div>
    </ArcherElement>
);

// Component to render ArcherRow
export const ArcherRow = ({ children, style = {} }) => (
    <div style={style}>{children}</div>
);

// Generate archer element relations
export const getArcherElementRelations = (children = [], anchor) => (
    children.map((ch) => ({
        targetId: ch.uniqueId,
        targetAnchor: anchor.target,
        sourceAnchor: anchor.source,
        style: { strokeDasharray: "1,1" },
    }))
);

// Component to toggle JSON display
export const JsonToggle = ({ showJson, setShowJson, data }) => (
    <div>
        <button onClick={() => setShowJson((prev) => !prev)}>
            {showJson ? "Hide" : "Show"}
        </button>
        {showJson && (
            <pre style={generateStyles("10px", "1px solid black")}>
                {JSON.stringify(data, null, 2)}
            </pre>
        )}
    </div>
);

// Recursive component to populate children
export const PopulateChildren = ({ providedArray, level, styles }) => {
    if (!providedArray || providedArray.length === 0) return null;

    return (
        <>
            <div style={level > 0 ? styles.rowStyle : styles.rootStyle}>
                {providedArray.map((element) => (
                    <ArcherElement
                        key={element.uniqueId}
                        id={element.uniqueId}
                        relations={getArcherElementRelations(element.children, {
                            target: "top",
                            source: "bottom",
                        })}
                    >
                        <div style={styles.boxStyle}>{element.name}</div>
                    </ArcherElement>
                ))}
            </div>

            {providedArray.map((element) => (
                <PopulateChildren
                    key={element.uniqueId}
                    providedArray={element.children}
                    level={level + 1}
                    styles={styles}
                />
            ))}
        </>
    );
};