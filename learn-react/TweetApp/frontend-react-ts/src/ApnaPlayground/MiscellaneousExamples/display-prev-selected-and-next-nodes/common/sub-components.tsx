import React from "react";
import { ArcherElement } from "react-archer";
import { boxStyle, styles } from "./utils";

// Common components
export const Select = ({ options, value, onChange }) => (
    <select onChange={onChange} value={value} style={styles.select}>
        {options.map((option) => (
            <option key={option.name} value={option.name}>
                {option.name}
            </option>
        ))}
    </select>
);

export const Node = ({ item }) => {
    return <div style={boxStyle}>{item}</div>;
};

// Component to render ArcherBox
export const ArcherBox = ({ id, relations = [], label, style = {} }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={{ ...boxStyle, ...style }}>{label}</div>
    </ArcherElement>
);

export const InfoBox = ({ title, items, styles = {} }) => (
    <div style={{ ...styles }}>
        <strong>{title}</strong>
        <div>
            {items.map((item, index) => (
                <Node key={index} item={item} />
            ))}
        </div>
    </div>
);

export const InfoBoxV1 = ({ boxes }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {boxes.map((box) => (
                <ArcherBox
                    key={box.id}
                    id={box.id}
                    relations={box.relations}
                    label={box.label}
                    style={box.style}
                />
            ))}
        </div>
    );
};

export const JSONPreview = ({ data, title }) => (
    <div style={{ flex: 1, margin: "10px" }}>
        {title && <b>{title}</b>}
        <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
);