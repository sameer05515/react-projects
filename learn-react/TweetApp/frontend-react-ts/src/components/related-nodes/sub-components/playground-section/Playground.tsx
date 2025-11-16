import React, { /**useMemo,*/ useState } from "react";
import { useSharedConfigurations } from "../../util/RelatedNodeUtil";
// import PopupMenuV3 from "../../../miscelleneous/sub-components/PopupMenuV3";
import PopupMenuV3 from "../../../../ApnaPlayground/MiscellaneousExamples/PopupMenu/v3";
import { useNavigate } from "react-router-dom";
import { RELATION_DIRECTION_TYPES } from "../../util/common.util";
import { ArcherContainer, ArcherElement } from "react-archer";

export const boxStyle = {
  margin: "5px",
  padding: "10px",
  border: "1px solid black",
  borderRadius: "4px",
  backgroundColor: "#f9f9f9",
};

export const NodeType = {
  selectedNode: "selectedNode",
  previousNode: "previousNode",
  nextNode: "nextNode",
};

// styles object removed in favor of Tailwind utility classes

export const strokeStyle = {
  strokeColor: "blue",
  strokeWidth: 1,
};

type ArcherBoxItem = {
  id: string;
  label: string;
  style: any;
  type: string;
  relations: any[];
};

// Component to render ArcherBox
type ArcherBoxProps = {
  id: string;
  relations?: any[];
  label?: string;
  style?: any;
  children?: React.ReactNode;
};
export const ArcherBox = ({ id, relations = [], label, style = {}, children }: ArcherBoxProps) => (
  <ArcherElement id={id} relations={relations}>
    <div style={{ ...boxStyle, ...style }}>{children}</div>
  </ArcherElement>
);

const Playground = () => {
  const {
    SharedService: { setSelectedNode },
    sharedData: { selectedNode, allNodes },
  } = useSharedConfigurations();

  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (event) => {
    event.preventDefault();
    setPopupPosition({ x: event.pageX, y: event.pageY });
    setPopupVisible(true);
  };

  const getNodeNameForId = (id) => {
    if (!id) return "";
    return allNodes.find((node) => node.uniqueId === id)?.name || "";
  };

  const getNodeForId = (id) => {
    if (!id) return "";
    return allNodes.find((node) => node.uniqueId === id) || null;
  };

  // const previousNodes = useMemo(() => {
  //   return selectedNode?.relations?.reduce((acc, rel) => {
  //     if (rel.type === RELATION_DIRECTION_TYPES.previous) {
  //       const prevRel = allNodes?.find((an) => an.uniqueId === rel.withId);
  //       if (prevRel) acc.push(prevRel);
  //     }
  //     return acc;
  //   }, []);
  // }, [allNodes, selectedNode]);

  // const nextNodes = useMemo(() => {
  //   return selectedNode?.relations?.reduce((acc, rel) => {
  //     if (rel.type === RELATION_DIRECTION_TYPES.next) {
  //       const nextRel = allNodes?.find((an) => an.uniqueId === rel.withId);
  //       if (nextRel) acc.push(nextRel);
  //     }
  //     return acc;
  //   }, []);
  // }, [allNodes, selectedNode]);

  const getArcherBoxesForLanguage = (): { prevBoxes: ArcherBoxItem[]; selBoxes: ArcherBoxItem[]; nextBoxes: ArcherBoxItem[] } => {
    if (!selectedNode || !allNodes) return { prevBoxes: [], selBoxes: [], nextBoxes: [] };
    let archerBoxes: ArcherBoxItem[] = [];

    archerBoxes = [selectedNode].reduce((acc: ArcherBoxItem[], lang: any) => {
      const ac: ArcherBoxItem = {
        id: lang.uniqueId,
        label: lang.name,
        style: boxStyle,
        type: NodeType.selectedNode,
        relations: [],
      };
      acc.push(ac);
      (lang.relations || [])
        .filter((l: any) => l.type === RELATION_DIRECTION_TYPES.previous)
        .forEach((l: any) => {
          const c: ArcherBoxItem = {
            id: l.withId,
            label: getNodeNameForId(l.withId) || l.withId,
            style: boxStyle,
            type: NodeType.previousNode,
            relations: [],
          };
          acc.push(c);
          ac.relations.push({
            targetId: c.id,
            targetAnchor: "bottom",
            sourceAnchor: "top",
            style: strokeStyle,
            label: l.name,
          });
        });

      (lang.relations || [])
        .filter((l: any) => l.type === RELATION_DIRECTION_TYPES.next)
        .forEach((l: any) => {
          const c: ArcherBoxItem = {
            id: l.withId,
            label: getNodeNameForId(l.withId) || l.withId,
            style: boxStyle,
            type: NodeType.nextNode,
            relations: [],
          };
          acc.push(c);
          ac.relations.push({
            targetId: c.id,
            targetAnchor: "top",
            sourceAnchor: "bottom",
            style: strokeStyle,
            label: l.name,
          });
        });

      return acc;
    }, archerBoxes);

    const selBoxes = archerBoxes.filter((box) => box.type === NodeType.selectedNode);
    const prevBoxes = archerBoxes.filter((box) => box.type === NodeType.previousNode);
    const nextBoxes = archerBoxes.filter((box) => box.type === NodeType.nextNode);

    return { prevBoxes, selBoxes, nextBoxes };
  };

  const { prevBoxes, selBoxes, nextBoxes } = getArcherBoxesForLanguage();

  const handleEditNode = () => {
    navigate(`${selectedNode?.uniqueId}/edit`, {
      state: { data: selectedNode },
    });
  };

  const handlePopupOption = (option) => {
    console.log(`[handlePopupOption]: '${option.title}' selected for '${selectedNode?.name}'`);
    setPopupVisible(false);
    option.action();
  };

  const popupOptions = [
    { title: "Edit", action: handleEditNode },
    {
      title: "Add Next/Previous Node",
      action: () =>
        navigate(`${selectedNode?.uniqueId}/create-relation`, {
          state: {
            data: {
              nodeInfo: {
                name: selectedNode.name,
                uniqueId: selectedNode.uniqueId,
              },
              allNodes: allNodes,
            },
          },
        }),
    },
  ];

  const containerStyle = {};

  const nodeContainerClass = "m-1.5 flex flex-1 flex-row items-center p-12";

  return (
    <>
      <div className="flex flex-1 items-center justify-center" style={containerStyle} onClick={() => setPopupVisible(false)}>
        <ArcherContainer strokeColor="black">
          <div className="flex justify-around gap-4 p-2">
            <div className={nodeContainerClass}>
              {/* Previous Nodes container */}
              {prevBoxes?.map((node) => (
                <ArcherBox key={node.id} id={node.id} relations={node.relations} label={node.label} style={node.style}>
                  <Node isSelected={false} node={getNodeForId(node.id)} onItemSelection={setSelectedNode} onItemRightClick={handleRightClick} />
                </ArcherBox>
              ))}
            </div>

            <div className={nodeContainerClass}>
              {/* Current Node container <br /> */}
              {selBoxes.map((node) => (
                <ArcherBox key={node.id} id={node.id} relations={node.relations} label={node.label} style={node.style}>
                  <Node isSelected={true} node={getNodeForId(node.id)} onItemSelection={setSelectedNode} onItemRightClick={handleRightClick} />
                </ArcherBox>
              ))}
            </div>

            <div className={nodeContainerClass}>
              {/* Next Nodes container <br /> */}
              {nextBoxes?.map((node) => (
                <ArcherBox key={node.id} id={node.id} relations={node.relations} label={node.label} style={{ ...node.style, padding: "20px" }}>
                  <Node isSelected={false} node={getNodeForId(node.id)} onItemSelection={setSelectedNode} onItemRightClick={handleRightClick} />
                </ArcherBox>
              ))}
            </div>
          </div>
        </ArcherContainer>

        {popupVisible && <PopupMenuV3 position={popupPosition} popupOptions={popupOptions} onOptionSelect={handlePopupOption} popupOptionClassName="text-[12px]" />}
      </div>
    </>
  );
};
const Node = React.memo(({ isSelected = false, node, onItemRightClick, onItemSelection }: { isSelected?: boolean; node: any; onItemRightClick: (e: React.MouseEvent) => void; onItemSelection: (n: any) => void }) => (
  <div
    className={`text-xs ${isSelected ? "font-bold" : "font-normal"}`}
    onDoubleClick={() => !isSelected && onItemSelection(node)}
    onContextMenu={(e) => isSelected && onItemRightClick(e)}
  >
    {node.name}
  </div>
));
export default Playground;
