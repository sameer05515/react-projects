import React from "react";
import { useSharedConfigurations } from "../external-import";
import NodeComponent from "./NodeComponent";

// LevelSectionComponent for rendering nodes at each level
const LevelSectionComponent = React.memo(
    ({ nodeChildrenData = [], parentId = "", level = 0 }) => {
        const {
            sharedData: {
                showMetaData: SHOW_METADATA,
                styles: { nodeChildrenItemStyle },
            },
        } = useSharedConfigurations();

        return (
            <div style={{ fontSize: "10px", display: 'block' }}>
                {SHOW_METADATA && (
                    <div>
                        <b>LevelSectionComponent</b> <br />
                        <b>Parent Id:</b> '{parentId}' <br />
                        <b>Total elements:</b> {nodeChildrenData.length} <br />
                        <b>Level:</b> {level}
                        <hr />
                    </div>
                )}
                <div style={nodeChildrenItemStyle}>

                    {nodeChildrenData.map((ncd) => (
                        <NodeComponent key={ncd.uniqueId} node={ncd} />
                    ))}
                </div>
            </div>

        );
    }
);

export default LevelSectionComponent;
