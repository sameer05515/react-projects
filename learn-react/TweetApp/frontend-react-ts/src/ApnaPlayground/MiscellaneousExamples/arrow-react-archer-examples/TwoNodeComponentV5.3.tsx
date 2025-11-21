import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics, selectAllFlatTopics, selectAllTreeTopics, TopicNode, FlatTopic } from "../../../redux/slices/topicSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
// Reusable Label component
// const HoverLabel = ({ id, text, show, onMouseEnter, onMouseLeave }) => (
//     <div
//         style={show ? styles.visibleLabel : styles.hiddenLabel}
//         onMouseEnter={() => onMouseEnter(id)}
//         onMouseLeave={onMouseLeave}
//     >
//         {text}
//     </div>
// );

// Reusable Node component
interface NodeProps {
  id: string;
  label?: string;
  children?: React.ReactNode;
  relations?: any[];
}
const Node: React.FC<NodeProps> = ({ id, label, children, relations = [] }) => (
  <ArcherElement id={id} relations={relations}>
    <div style={styles.node}>{children || label}</div>
  </ArcherElement>
);

interface DynamicNodeComponentProps {
  selectedNode?: (TopicNode | FlatTopic) | null;
  leafNodes?: TopicNode[];
  ancestorNodes?: any[];
  onTopicSelection?: (topicId: string) => void;
  selectedTopicId?: string | null;
}

const DynamicNodeComponent: React.FC<DynamicNodeComponentProps> = ({ selectedNode, leafNodes = [], ancestorNodes = [], onTopicSelection = () => {} }) => {
  // const [hoveredRelationId, setHoveredRelationId] = useState(null);

  // const handleMouseEnter = (id) => setHoveredRelationId(id);
  // const handleMouseLeave = () => setHoveredRelationId(null);

  const renderNodes = (
    nodes: any[],
    labelStyle: (hasChildren: boolean) => React.CSSProperties,
    onNodeClick?: (node: any) => void
  ) =>
    nodes.map((node: any) => (
      <Node key={node.uniqueId} id={node.uniqueId} label={node.name}>
        <div>
          <span style={labelStyle(Array.isArray(node.children) && node.children.length > 0)} onClick={() => onNodeClick && onNodeClick(node)}>
            {node.name}
          </span>
        </div>
      </Node>
    ));

  // const renderRelations = () =>
  //     selectedNode.relations
  //         .filter((relation) => relation.type === "next")
  //         .map((relation, index) => (
  //             <Node
  //                 key={relation.uniqueId}
  //                 id={`node-${index}`}
  //                 label={`Relation: ${relation.type}`}
  //                 relations={[
  //                     {
  //                         targetId: "selectedNode",
  //                         targetAnchor: "bottom",
  //                         sourceAnchor: "top",
  //                         label: (
  //                             <HoverLabel
  //                                 id={relation.uniqueId}
  //                                 text={`${relation.name}---${relation.uniqueId}`}
  //                                 show={hoveredRelationId === relation.uniqueId}
  //                                 onMouseEnter={handleMouseEnter}
  //                                 onMouseLeave={handleMouseLeave}
  //                             />
  //                         ),
  //                     },
  //                 ]}
  //             />
  //         ));

  return (
    <ArcherContainer strokeColor="black">
      <div style={styles.container}>
        {ancestorNodes?.length > 0 &&
          renderNodes(
            ancestorNodes,
            () => ({ fontWeight: "bold", color: "blue", cursor: "pointer" }),
            (node) => onTopicSelection && onTopicSelection(node.uniqueId || "")
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
                onClick={() => onTopicSelection && onTopicSelection((selectedNode as any)?.ancestors?.[(selectedNode as any)?.ancestors?.length - 1]?.uniqueId ?? "")}
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
                fontWeight: hasChildren ? "bold" : ("" as any),
                color: "red",
                cursor: hasChildren ? "pointer" : ("" as any),
              }),
              (node) => (Array.isArray(node.children) && node.children.length > 0) && onTopicSelection && onTopicSelection(node.uniqueId)
            )}
          </div>
        )}
      </div>
    </ArcherContainer>
  );
};

// Extracted styles for reuse
const styles: {
  container: React.CSSProperties;
  relationsRow: React.CSSProperties;
  node: React.CSSProperties;
  hiddenLabel: React.CSSProperties;
  visibleLabel: React.CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    alignItems: "center",
    marginTop: "50px",
    overflow: "auto" as React.CSSProperties["overflow"],
  },
  relationsRow: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "50px",
    maxWidth: "90vw",
    overflowX: "auto" as React.CSSProperties["overflowX"],
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
const TwoNodeComponentV5_3: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const topics = useSelector((state: RootState) => selectAllTreeTopics(state)) as TopicNode[];
  const flatTopics = useSelector((state: RootState) => selectAllFlatTopics(state)) as FlatTopic[];
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<FlatTopic | null>(null);

  const getTopicForUniqueId = (id: string) => flatTopics.find((t) => t.uniqueId === id) || null;

  const getAncestorsForTopic = (topic: FlatTopic | null): FlatTopic[] => {
    if (!topic) return [];
    return (topic.ancestors ?? [])
      .map((ancestor) => (ancestor.uniqueId ? getTopicForUniqueId(ancestor.uniqueId) : null))
      .filter((t): t is FlatTopic => Boolean(t));
  };

  return (
    <>
      <div>
        <button onClick={() => dispatch(fetchTopics() as any)}>Reload Topic Data</button>
        <JSONDataViewer
          metadata={{
            parentId: (selectedTopic as any)?.parentId || "Baap nhi mila",
            selectedTopic,
          }}
          title="Topics Data"
        />
      </div>
      <DynamicNodeComponent
        leafNodes={(selectedTopic as any)?.children || topics}
        selectedTopicId={selectedTopicId}
        selectedNode={selectedTopic as any}
        ancestorNodes={getAncestorsForTopic(selectedTopic) || []}
        onTopicSelection={(topicId: string) => {
          setSelectedTopicId(topicId);
          setSelectedTopic(getTopicForUniqueId(topicId));
        }}
      />
    </>
  );
};

export default TwoNodeComponentV5_3;
