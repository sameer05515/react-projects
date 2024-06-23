import React from "react";
import { ArcherElement } from "../external-import";
import { useSharedConfigurations } from "../external-import";

// Reusable TogglebleSpan for showing/hiding children
const TogglebleSpan = React.memo(
    ({ title = "", showChildren, onClick, showHideCharacters = {} }) => (
        <span
            title={showChildren ? `Hide ${title}` : `Show ${title}`}
            style={{ marginRight: "10px", fontSize: "12px", cursor: "pointer" }}
            onClick={onClick}
        >
            <span style={{ margin: '3px' }}>
                {showChildren
                    ? `${showHideCharacters?.hideChar || "-"}`
                    : `${showHideCharacters?.showChar || "+"}`}
            </span>
        </span>
    )
);

// Reusable NodeMetadata component to display node details
const NodeMetadata = React.memo(({ node }) => (
    <>
        <b>NodeComponent</b> <br />
        <b>Level:</b> {node.level} <br />
        <b>Parent ID:</b> {node.parentId || "null"} <br />
        <b>Relation:</b> {node.relation} <br />
        <b>Unique ID:</b> {node.uniqueId} <br />
        <b>Children Count:</b> {node.children?.length} <br />
        <b>Show Children:</b> {node.showChildren ? "true" : "false"} <br />
        <hr />
    </>
));

// NodeComponent for rendering individual nodes
const NodeComponent = React.memo(
    ({ node, onNodeComponentClick = () => { } }) => {
        const {
            sharedData: {
                showMetaData: SHOW_METADATA,
                styles: { nodeItemStyle },
            },
            toggleShowChildrenForId,
        } = useSharedConfigurations();

        const handleToggleChildren = () => {
            toggleShowChildrenForId(node.uniqueId);
            onNodeComponentClick();
        };

        const relations =
            node.showChildren && node.children?.length
                ? node.children.map((child) => ({
                    targetId: child.uniqueId,
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: { strokeColor: "blue", strokeWidth: 2 },
                    label: child.relation || "",
                }))
                : [];

        return (
            <div style={{ fontSize: "10px", display: "block", padding: "10px" }}>
                {SHOW_METADATA && <NodeMetadata node={node} />}
                <ArcherElement
                    key={node.uniqueId}
                    id={node.uniqueId}
                    relations={relations}
                >
                    <div style={{ ...nodeItemStyle }}>
                        

                        <b>{node.name}</b>
                        <br />

                        {node.children?.length > 0 && (
                            <TogglebleSpan
                                title={"Children"}
                                showChildren={node.showChildren}
                                onClick={handleToggleChildren}
                            />
                        )}
                        
                        {node.definition && (
                            <TogglebleSpan
                                title={"Definition"}
                                showChildren={node.showChildren}
                                onClick={handleToggleChildren}
                                showHideCharacters={{ showChar: 'S', hideChar: 'H' }}
                            />
                        )}
                        {/* {node.children?.length > 0 && <><b>Show Children:</b> {node.showChildren?'true':'false'}</>} */}
                    </div>
                </ArcherElement>
            </div>
        );
    }
);

export default NodeComponent;
