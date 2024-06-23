import React from "react";
import {
    useSharedConfigurations
} from '../external-import';
import LevelSectionComponent from "./LevelSectionComponent";

// LevelComponent for grouping nodes at a specific level
const LevelComponent = ({ levelData = [], level = 0 }) => {
    const {
        sharedData: { showMetaData: SHOW_METADATA,
            styles: { levelItemStyle } },
        getNodeChildrenCompArr
    } = useSharedConfigurations();

    const nodeChildrenCompArr = getNodeChildrenCompArr(levelData);

    return (
        <div style={{ fontSize: "10px", display: 'block' }}>
            {SHOW_METADATA && (
                <div>
                    <b>LevelComponent</b> Level: {level}, Total elements: {levelData.length}
                    <hr />
                </div>

            )}
            <div style={levelItemStyle}>
                {nodeChildrenCompArr.map((lc) => (
                    <LevelSectionComponent
                        key={lc.parentId || lc.nodeChildrenData[0]?.uniqueId || "unknown"}
                        parentId={lc.parentId}
                        nodeChildrenData={lc.nodeChildrenData}
                        level={level}
                    />
                ))}
            </div>
        </div>

    );
};

export default LevelComponent