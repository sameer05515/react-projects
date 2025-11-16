import { RELATION_DIRECTION_TYPES } from "../util/common.util";
import { getRelationNameForId } from "../util/relation-data";

export const JSONPreview = ({ data, title }) => (
    <div className="m-2 flex-1">
        {title && <b>{title}</b>}
        <pre className="rounded bg-gray-100 p-2">
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
);

// Select component
export const Select = ({ options, value, onChange }) => (
    <select
      onChange={onChange}
      value={value}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>Select Node</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

// styles object removed in favor of Tailwind utility classes

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

export const strokeStyle = {
    strokeColor: "blue",
    strokeWidth: 1,
};

export const getNodeForId = (id, allNodes) => {
    if (!id) return "";
    return allNodes.find((node) => node.uniqueId === id) || null;
};

export const getNodeNameForId = (id, allNodes) => {
    if (!id) return "";
    return allNodes?.find((node) => node.uniqueId === id)?.name || "";
};

export const getArcherBoxesForLanguage = (selectedLanguage, allNodes) => {
    if (!selectedLanguage || !allNodes) return { prevBoxes: [], selBoxes: [], nextBoxes: [] };
    let archerBoxes = [];

    archerBoxes = [selectedLanguage].reduce((acc, lang) => {
        const ac = {
            id: lang.uniqueId,
            label: lang.name,
            style: boxStyle,
            type: NodeType.selectedNode,
            relations: [],
        };
        acc.push(ac);
        lang.relations
            .filter(l => l.type === RELATION_DIRECTION_TYPES.previous)
            .forEach(l => {
                const c = {
                    id: l.withId,
                    label: getNodeNameForId(l.withId, allNodes) || l.withId,
                    style: boxStyle,
                    type: NodeType.previousNode,
                };
                acc.push(c);
                ac.relations.push({
                    targetId: c.id,
                    targetAnchor: "right",
                    sourceAnchor: "left",
                    style: strokeStyle,
                    label: getRelationNameForId(l.name, l.showReverseRelationName) || l.name,
                });
            })

        lang.relations
            .filter(l => l.type === RELATION_DIRECTION_TYPES.next)
            .forEach(l => {
                const c = {
                    id: l.withId,
                    label: getNodeNameForId(l.withId, allNodes) || l.withId,
                    style: boxStyle,
                    type: NodeType.nextNode,
                };
                acc.push(c);
                ac.relations.push({
                    targetId: c.id,
                    targetAnchor: "left",
                    sourceAnchor: "right",
                    style: strokeStyle,
                    label: getRelationNameForId(l.name, l.showReverseRelationName) || l.name,
                });
            })

        return acc;
    }, archerBoxes);

    const selBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.selectedNode
    );
    const prevBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.previousNode
    );
    const nextBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.nextNode
    );

    return { prevBoxes, selBoxes, nextBoxes };

};