import { useMemo,useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
// import { useArcherData, commonStyles, renderTree, JsonToggle, PopulateChildren } from "./common-utils";
import { useArcherData, commonStyles, renderTree, PopulateChildren } from "./common-utils";
import {
    ArcherBox,
    ArcherRow,
    getArcherElementRelations,
    getPart1ArcherBoxesForType,
    getPart1StylesForType,
    JsonToggle,
    
} from "../../../common/utils/react-archer-examples-pt-1-common";

// App1 Component
const ReactArcherApp1 = ({ type = "app1" }) => {
    const archerBoxes = useMemo(() => getPart1ArcherBoxesForType(type), [type]);
    const styles = useMemo(() => getPart1StylesForType(type), [type]);

    const rootBoxes = archerBoxes.filter((box) => box.isRoot);
    const nonRootBoxes = archerBoxes.filter((box) => !box.isRoot);

    return (
        <>
            <h1>ReactArcherApp1</h1>
            <div style={styles.container}>
                <ArcherContainer strokeColor="red">
                    <div style={styles.rootStyle}>
                        {rootBoxes.map((box) => (
                            <ArcherBox key={box.id} id={box.id} relations={box.relations} label={box.label} style={box.style} />
                        ))}
                    </div>
                    <div style={styles.rowStyle}>
                        {nonRootBoxes.map((box) => (
                            <ArcherBox key={box.id} id={box.id} relations={box.relations} label={box.label} style={box.style} />
                        ))}
                    </div>
                </ArcherContainer>
            </div>
        </>
    );
};

// App2 Component
const ReactArcherApp2 = ({ data = [], type = "app2" }) => {
    const { showJson, setShowJson, updatedFirstElement, archerBoxes, styles } = useArcherData(data, type);

    if (!data.length) return null;

    return (
        <>
            <JsonToggle showJson={showJson} setShowJson={setShowJson} data={updatedFirstElement} />
            <div style={styles.container}>
                <ArcherContainer strokeColor="red">
                    <div style={styles.rootStyle}>
                        {archerBoxes.filter((box) => box.isRoot).map((box) => (
                            <ArcherBox key={box.id} id={box.id} relations={box.relations} label={box.label} style={box.style} />
                        ))}
                    </div>
                    <ArcherRow style={styles.rowStyle}>
                        {archerBoxes.filter((box) => !box.isRoot).map((box) => (
                            <ArcherBox key={box.id} id={box.id} label={box.label} style={box.style} />
                        ))}
                    </ArcherRow>
                </ArcherContainer>
            </div>
        </>
    );
};

// App3 Component
const ReactArcherApp3 = ({ data = [] }) => {
    const { showJson, setShowJson, updatedFirstElement, styles } = useArcherData(data, "app3");

    return (
        <>
            <JsonToggle showJson={showJson} setShowJson={setShowJson} data={updatedFirstElement} />
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="red">
                    <div style={styles.rootStyle}>
                        <ArcherElement
                            id={updatedFirstElement.uniqueId}
                            relations={getArcherElementRelations(updatedFirstElement.children, { target: "top", source: "bottom" })}
                        >
                            <div style={styles.boxStyle}>{updatedFirstElement.name}</div>
                        </ArcherElement>
                    </div>
                    <PopulateChildren providedArray={updatedFirstElement.children} level={1} styles={styles} />
                </ArcherContainer>
            </div>
        </>
    );
};

// App4 Component
const ReactArcherApp4 = ({ data = [], type = "app4" }) => {
    const { showJson, setShowJson, updatedFirstElement, styles } = useArcherData(data, type);

    return (
        <>
            <JsonToggle showJson={showJson} setShowJson={setShowJson} data={updatedFirstElement} />
            <div style={styles.container}>
                <ArcherContainer strokeColor="red">
                    <PopulateChildren providedArray={data} level={0} styles={styles} />
                </ArcherContainer>
            </div>
        </>
    );
};

// App5 Component
const ReactArcherApp5 = ({ data = [], type = "app5" }) => {
    const { showJson, setShowJson, updatedFirstElement, styles } = useArcherData(data, type);

    return (
        <>
            <JsonToggle showJson={showJson} setShowJson={setShowJson} data={updatedFirstElement} />
            <div style={styles.container}>
                <ArcherContainer strokeColor="red">
                    <PopulateChildren providedArray={data} level={0} styles={styles} />
                </ArcherContainer>
            </div>
        </>
    );
};

// App6 Component
const ReactArcherApp6 = ({ data = [] }) => {
    const [showJson, setShowJson] = useState(false);
    const updatedFirstElement = data.length > 0 ? data[0] : {};

    return (
        <>
            <JsonToggle showJson={showJson} setShowJson={setShowJson} data={updatedFirstElement} />
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="red">
                    {renderTree(data, 0, '', commonStyles, Infinity, true)}
                </ArcherContainer>
            </div>
        </>
    );
};

// App7 Component
const ReactArcherApp7 = ({ data = [] }) => {
    const [showJson, setShowJson] = useState(false);
    const MAX_ALLOWED_LEVEL = 2;
    const ALLOW_ALL_LEVELS = true;

    return (
        <>
            <JsonToggle showJson={showJson} setShowJson={setShowJson} data={data} />
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="red">
                    {renderTree(data, 0, '', commonStyles, MAX_ALLOWED_LEVEL, ALLOW_ALL_LEVELS)}
                </ArcherContainer>
            </div>
        </>
    );
};

export {
    ReactArcherApp1,
    ReactArcherApp2,
    ReactArcherApp3,
    ReactArcherApp4,
    ReactArcherApp5,
    ReactArcherApp6,
    ReactArcherApp7
};
