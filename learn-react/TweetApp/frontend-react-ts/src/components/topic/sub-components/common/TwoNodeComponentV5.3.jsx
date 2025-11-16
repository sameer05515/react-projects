import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTopics,
    selectAllFlatTopics,
    selectAllTreeTopics,
} from "../../../../redux/slices/topicSlice";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";

// Reusable Node component
const Node = ({ id, label, children, relations = [] }) => (
    <ArcherElement id={id} relations={relations}>
        <div className="rounded border-2 border-black px-5 py-2">{children || label}</div>
    </ArcherElement>
);

const DynamicNodeComponent = ({
    selectedNode,
    leafNodes = [],
    ancestorNodes = [],
    onTopicSelection = () => { },
}) => {
    const renderNodes = (nodes, labelStyle, onNodeClick) =>
        nodes.map((node) => (
            <Node key={node.uniqueId} id={node.uniqueId} label={node.name}>
                <div>
                    <span
                        className={`cursor-pointer ${labelStyle(node.children.length)}`}
                        onClick={() => onNodeClick && onNodeClick(node)}
                    >
                        {node.name}
                    </span>
                </div>
            </Node>
        ));

    return (
        <ArcherContainer strokeColor="black">
            <div className="mt-12 flex flex-col items-center overflow-auto">
                {ancestorNodes?.length > 0 &&
                    renderNodes(
                        ancestorNodes,
                        () => "font-bold text-blue-600",
                        (node) => onTopicSelection(
                            node.uniqueId || ""
                        )
                    )}

                {selectedNode && (
                    <Node id={selectedNode.uniqueId} label={selectedNode.name}>
                        <div>
                            <span
                                className="cursor-pointer text-2xl text-green-600"
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
                    <div className="mt-12 flex max-w-[90vw] justify-start overflow-x-auto">
                        {renderNodes(
                            leafNodes,
                            (hasChildren) =>
                                hasChildren
                                    ? "font-bold text-red-600 cursor-pointer"
                                    : "text-red-600",
                            (node) =>
                                node.children.length > 0 && onTopicSelection(node.uniqueId)
                        )}
                    </div>
                )}
            </div>
        </ArcherContainer>
    );
};

// styles object removed in favor of Tailwind classes

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
