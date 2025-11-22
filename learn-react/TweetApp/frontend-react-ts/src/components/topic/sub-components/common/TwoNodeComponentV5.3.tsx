import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTopics,
    selectAllFlatTopics,
    selectAllTreeTopics,
    type FlatTopic,
} from "../../../../redux/slices/topicSlice";
import type { AppDispatch, RootState } from "../../../../redux/store";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";

// Reusable Node component
interface NodeProps {
    id: string;
    label?: string;
    children?: React.ReactNode;
    relations?: any[];
}
const Node: React.FC<NodeProps> = ({ id, label, children, relations = [] }) => (
    <ArcherElement id={id} relations={relations as any}>
        <div className="rounded border-2 border-black px-5 py-2">{children || label}</div>
    </ArcherElement>
);

interface DynamicNodeComponentProps {
    selectedNode?: FlatTopic | null;
    leafNodes?: FlatTopic[];
    ancestorNodes?: FlatTopic[];
    onTopicSelection?: (topicId: string) => void;
}

const DynamicNodeComponent: React.FC<DynamicNodeComponentProps> = ({
    selectedNode,
    leafNodes = [],
    ancestorNodes = [],
    onTopicSelection = () => { },
}) => {
    const renderNodes = (
        nodes: any[],
        labelStyle: (hasChildren: boolean) => string,
        onNodeClick?: (node: any) => void
    ) =>
        nodes.map((node: any) => (
            <Node key={node.uniqueId} id={node.uniqueId} label={node.name}>
                <div>
                    <span
                        className={`cursor-pointer ${labelStyle(Array.isArray(node.children) && node.children.length > 0)}`}
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
                        (node) => onTopicSelection && onTopicSelection(node.uniqueId || "")
                    )}

                {selectedNode && (
                    <Node id={selectedNode.uniqueId as string} label={selectedNode.name as string}>
                        <div>
                            <span
                                className="cursor-pointer text-2xl text-green-600"
                                onClick={() =>
                                    onTopicSelection &&
                                    onTopicSelection(
                                        (selectedNode as any).ancestors?.[(selectedNode as any).ancestors?.length - 1]?.uniqueId ?? ""
                                    )
                                }
                            >
                                {selectedNode.name as string}
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
                                Array.isArray(node.children) && node.children.length > 0 && onTopicSelection && onTopicSelection(node.uniqueId)
                        )}
                    </div>
                )}
            </div>
        </ArcherContainer>
    );
};

// styles object removed in favor of Tailwind classes

// Example usage
const TwoNodeComponentV5_3: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const topics = useSelector((state: RootState) => selectAllTreeTopics(state)) as any[];
    const flatTopics = useSelector((state: RootState) => selectAllFlatTopics(state)) as FlatTopic[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_selectedTopicId, setSelectedTopicId] = useState<string | null>(null); // ✅ Reserved for future use
    const [selectedTopic, setSelectedTopic] = useState<FlatTopic | null>(null);

    const getTopicForUniqueId = (id: string) =>
        flatTopics.find((t) => t.uniqueId === id) || null;

    const getAncestorsForTopic = (topic: FlatTopic | null): FlatTopic[] => {
        if (!topic) return [];
        return (
            topic.ancestors
                ?.map((ancestor: any) => getTopicForUniqueId(ancestor.uniqueId))
                .filter((t): t is FlatTopic => t !== null) || []
        );
    };

    return (
        <>
            <div>
                <button onClick={() => dispatch(fetchTopics() as any)}>
                    Reload Topic Data
                </button>
                <JSONDataViewer
                    metadata={{
                        parentId: (selectedTopic as any)?.parentId || "Baap nhi mila",
                        selectedTopic,
                    }}
                    title="Topics Data"
                />
            </div>
            <DynamicNodeComponent
                leafNodes={(selectedTopic as any)?.children || (topics as any)}
                selectedNode={selectedTopic as any}
                ancestorNodes={getAncestorsForTopic(selectedTopic)}
                onTopicSelection={(topicId: string) => {
                    setSelectedTopicId(topicId);
                    setSelectedTopic(getTopicForUniqueId(topicId));
                }}
            />
        </>
    );
};

export default TwoNodeComponentV5_3;
