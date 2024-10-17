import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTopics,
    selectAllFlatTopics,
    selectAllTreeTopics,
} from "../../../redux/slices/topicSlice";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
// Reusable Label component
const HoverLabel = ({ id, text, show, onMouseEnter, onMouseLeave }) => (
    <div
        style={show ? styles.visibleLabel : styles.hiddenLabel}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={onMouseLeave}
    >
        {text}
    </div>
);

// Reusable Node component
const Node = ({ id, label, children, relations = [] }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={styles.node}>{children || label}</div>
    </ArcherElement>
);

const DynamicNodeComponent = ({
    selectedNode,
    leafNodes = [],
    ancestorNodes = [],
    onTopicSelection = () => { },
}) => {
    const [hoveredRelationId, setHoveredRelationId] = useState(null);

    const handleMouseEnter = (id) => setHoveredRelationId(id);
    const handleMouseLeave = () => setHoveredRelationId(null);

    const renderNodes = (nodes, labelStyle, onNodeClick) =>
        nodes.map((node) => (
            <Node key={node.uniqueId} id={node.uniqueId} label={node.name}>
                <div>
                    <span
                        style={labelStyle(node.children.length)}
                        onClick={() => onNodeClick && onNodeClick(node)}
                    >
                        {node.name}
                    </span>
                </div>
            </Node>
        ));

    const renderRelations = () =>
        selectedNode.relations
            .filter((relation) => relation.type === "next")
            .map((relation, index) => (
                <Node
                    key={relation.uniqueId}
                    id={`node-${index}`}
                    label={`Relation: ${relation.type}`}
                    relations={[
                        {
                            targetId: "selectedNode",
                            targetAnchor: "bottom",
                            sourceAnchor: "top",
                            label: (
                                <HoverLabel
                                    id={relation.uniqueId}
                                    text={`${relation.name}---${relation.uniqueId}`}
                                    show={hoveredRelationId === relation.uniqueId}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ),
                        },
                    ]}
                />
            ));

    return (
        <ArcherContainer strokeColor="black">
            <div style={styles.container}>
                {ancestorNodes?.length > 0 &&
                    renderNodes(
                        ancestorNodes,
                        () => ({ fontWeight: "bold", color: "blue", cursor: "pointer" }),
                        (node) => onTopicSelection(
                            node.uniqueId || ""
                        )
                    )}

                {selectedNode && (
                    <Node id={selectedNode.uniqueId} label={selectedNode.name}>
                        <div>
                            <span
                                style={{
                                    fontSize: "x-large",
                                    color: "green",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    onTopicSelection(
                                        selectedNode.ancestors?.[selectedNode.ancestors.length - 1]?.uniqueId ?? ""
                                    )
                                }
                            >
                                {selectedNode.name}
                            </span>
                        </div>
                    </Node>
                )}

                {leafNodes?.length > 0 && (
                    <div style={styles.relationsRow}>
                        {renderNodes(
                            leafNodes,
                            (hasChildren) => ({
                                fontWeight: hasChildren ? "bold" : "",
                                color: "red",
                                cursor: hasChildren ? "pointer" : "",
                            }),
                            (node) =>
                                node.children.length > 0 && onTopicSelection(node.uniqueId)
                        )}
                    </div>
                )}
            </div>
        </ArcherContainer>
    );
};

// Extracted styles for reuse
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        overflow: "auto",
    },
    relationsRow: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "50px",
        maxWidth: "90vw",
        overflowX: "auto",
    },
    node: {
        padding: "10px 20px",
        border: "2px solid black",
        borderRadius: "4px",
    },
    hiddenLabel: {
        opacity: 0,
        transition: "opacity 0.2s ease",
    },
    visibleLabel: {
        opacity: 1,
        transition: "opacity 0.2s ease",
    },
};

// Example usage
const TwoNodeComponentV5_3 = () => {
    const dispatch = useDispatch();
    const topics = useSelector(selectAllTreeTopics);
    const flatTopics = useSelector(selectAllFlatTopics);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const getTopicForUniqueId = (id) =>
        flatTopics.find((t) => t.uniqueId === id) || null;

    const getAncestorsForTopic = (topic) => {
        if (!topic) return [];
        return (
            topic.ancestors
                ?.map((ancestor) => getTopicForUniqueId(ancestor.uniqueId))
                .filter(Boolean) || []
        );
    };

    return (
        <>
            <div>
                <button onClick={() => dispatch(fetchTopics())}>
                    Reload Topic Data
                </button>
                <JSONDataViewer
                    metadata={{
                        parentId: selectedTopic?.parentId || "Baap nhi mila",
                        selectedTopic,
                    }}
                    title="Topics Data"
                />
            </div>
            <DynamicNodeComponent
                leafNodes={selectedTopic?.children || topics}
                selectedTopicId={selectedTopicId}
                selectedNode={selectedTopic}
                ancestorNodes={getAncestorsForTopic(selectedTopic) || []}
                onTopicSelection={(topicId) => {
                    setSelectedTopicId(topicId);
                    setSelectedTopic(getTopicForUniqueId(topicId));
                }}
            />
        </>
    );
};

export default TwoNodeComponentV5_3;
