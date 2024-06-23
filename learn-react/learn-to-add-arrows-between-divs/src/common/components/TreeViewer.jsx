import React, { useState } from "react";

const styles = {
    container: {
        paddingLeft: "20px",
        margin: "5px 0",
        borderLeft: "1px solid #ccc",
    },
    node: {
        display: "flex",
        alignItems: "center",
        marginBottom: "5px",
    },
    toggleButton: {
        cursor: "pointer",
        marginRight: "10px",
        fontWeight: "bold",
    },
    nodeName: {
        fontSize: "14px",
        color: "#333",
    },
};

const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div style={styles.container}>
            <div style={styles.node}>
                <span style={styles.toggleButton} onClick={toggleExpand}>
                    {hasChildren ? (expanded ? "-" : "+") : null}
                </span>
                <span style={styles.nodeName}>
                    {node.name ? node.name : node.uniqueId}
                </span>
            </div>
            {expanded && hasChildren && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode key={child.uniqueId} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Tree = ({ data }) => {
    return (
        <div>
            {data.map((node) => (
                <TreeNode key={node.uniqueId} node={node} />
            ))}
        </div>
    );
};

export default Tree;
