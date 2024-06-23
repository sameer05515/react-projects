import { useMemo, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import {
    ArcherBox,
    ArcherRow,
    getArcherElementRelations,
    getPart1ArcherBoxesForType,
    getPart1StylesForType,
    JsonToggle,
    PopulateChildren
} from "../../../common/utils/react-archer-examples-pt-1-common";

// Custom hook to handle common logic
const useArcherData = (data, type) => {
    const [showJson, setShowJson] = useState(false);
    const updatedFirstElement = useMemo(
        () => (data.length > 0 ? data[0] : {}),
        [data]
    );
    const archerBoxes = useMemo(
        () => getPart1ArcherBoxesForType(type, updatedFirstElement),
        [type, updatedFirstElement]
    );
    const styles = useMemo(() => getPart1StylesForType(type), [type]);

    return { showJson, setShowJson, updatedFirstElement, archerBoxes, styles };
};

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

const commonStyles = {
    rootStyle: { display: "flex", justifyContent: "center" },
    rowStyle: {
        margin: "100px 0", // Consistent margin for compact layout
        display: "flex",
        justifyContent: "center",
    },
    boxStyle: { padding: "10px", border: "1px solid black" },
};

const populateChildren = (nodes = [], level = 0, parentId = '', styles, includeRelation = false) => {
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

const renderTree = (nodes, level = 0, parentId = '', styles, maxLevel, allowAllLevels) => {
    if (!nodes.length) return null;

    return (
        <>
            {populateChildren(nodes, level, parentId, styles, true)}
            {(allowAllLevels || level + 1 <= maxLevel) && nodes.map((node) =>
                node.children && renderTree(node.children, level + 1, node.uniqueId, styles, maxLevel, allowAllLevels)
            )}
        </>
    );
};

const ReactArcherApp6 = ({ data = [] }) => {
    const [showJson, setShowJson] = useState(false);
    const updatedFirstElement = data.length > 0 ? data[0] : {};

    return (
        <>
            <div>
                <button onClick={() => setShowJson(prev => !prev)}>
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
                    {renderTree(data, 0, '', commonStyles, Infinity, true)}
                </ArcherContainer>
            </div>
        </>
    );
};

const ReactArcherApp7 = ({ data = [] }) => {
    const [showJson, setShowJson] = useState(false);
    const MAX_ALLOWED_LEVEL = 2;
    const ALLOW_ALL_LEVELS = true;

    return (
        <>
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

