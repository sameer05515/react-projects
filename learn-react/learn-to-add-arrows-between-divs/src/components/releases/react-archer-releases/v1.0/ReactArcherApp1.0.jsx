import React from "react";
import { ArcherContainer } from "react-archer";
import {
    SharedConfigurationsProvider,
    useSharedConfigurations,
} from "../../../../common/utils/CombinedReactArcherConfigurationsUtil";
import ConfigurationAndMetadataDisplayComponent from "./subcomponents/ConfigurationAndMetadataDisplayComponent";
import LevelComponent from "./subcomponents/LevelComponent";

// ContainerComponent for rendering the hierarchy using ArcherContainer
const ContainerComponent = ({ levelCompArr = [] }) => (
    <div style={{ minWidth: "1000px", height: "1000px", margin: "50px" }}>
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

// Main component wrapping the entire application
const ReactArcherV1 = ({ data = [] }) => (
    <SharedConfigurationsProvider data={data}>
        <AppContainerComponent />
    </SharedConfigurationsProvider>
);

const AppContainerComponent = () => {
    const { levelCompArr, dataWithLevelAndParentIdField } = useSharedConfigurations();
    return (
        <>
            <ConfigurationAndMetadataDisplayComponent metadata={dataWithLevelAndParentIdField} />
            <ContainerComponent levelCompArr={levelCompArr} />
        </>
    );
};

export default ReactArcherV1;
