import React, { useMemo, useState } from "react";
import generateTreeData from "./treeDataGenerator";
import RadioButtonsComponent from "../../../common/components/radiobutton-component/RadioButtonsComponent";

const DISPLAY_STYLE = {
  TREE: "tree",
  MEMORY_MAP: "memory-map",
};

const generateLabelValueArray = (obj = DISPLAY_STYLE) =>
  Object.keys(obj).map((key) => ({
    label: key,
    value: obj[key],
  }));

const TreeNode = ({ node }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="list-none">
      <div className="flex items-start gap-2">
        {node.children.length > 0 && (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full bg-blue-100 px-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-200"
            aria-label={isOpen ? "Collapse node" : "Expand node"}
          >
            {isOpen ? "−" : "+"}
          </button>
        )}
        <span
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer text-sm font-medium text-gray-800 transition hover:text-blue-600"
        >
          {node.name}
        </span>
      </div>

      {isHovered && (
        <div className="ml-6 mt-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 text-[11px] font-mono text-gray-600 shadow-sm">
          {JSON.stringify(
            { ...node, children: [], childrenCount: node.children.length || 0 },
            null,
            2
          )}
        </div>
      )}

      {isOpen && node.children.length > 0 && (
        <ul className="ml-5 mt-2 border-l border-gray-200 pl-4">
          {node.children.map((child) => (
            <TreeNode key={child.uniqueId} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const DisplayDataWithTree = ({ treeData = [] }) => {
  const rootNodes = useMemo(
    () => treeData.filter((node) => node.parentId === 0),
    [treeData]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <ul className="space-y-3">
        {rootNodes.map((node) => (
          <TreeNode key={node.uniqueId} node={node} />
        ))}
      </ul>
    </div>
  );
};

const MemoryMapNode = ({ node, level }) => (
  <div className="relative pl-5">
    {level > 0 && (
      <span className="absolute left-1 top-0 h-full border-l border-gray-200" />
    )}
    <div className="rounded border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
      {node.name}
    </div>
    {node.children.length > 0 && (
      <div className="ml-4 mt-2 space-y-2">
        {node.children.map((child) => (
          <MemoryMapNode key={child.uniqueId} node={child} level={level + 1} />
        ))}
      </div>
    )}
  </div>
);

const MemoryMap = ({ treeData }) => {
  const roots = useMemo(
    () => treeData.filter((node) => node.parentId === 0),
    [treeData]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 shadow-inner">
      <div className="space-y-4">
        {roots.map((rootNode) => (
          <MemoryMapNode key={rootNode.uniqueId} node={rootNode} level={0} />
        ))}
      </div>
    </div>
  );
};

const DisplayData = ({ treeData = generateTreeData(7, 4) }) => {
  const [displayStyle, setDisplayStyle] = useState(DISPLAY_STYLE.TREE);

  const handleItemTypeSelect = (selectedOption) => {
    if (selectedOption?.value) {
      setDisplayStyle(selectedOption.value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <RadioButtonsComponent
          initialSelectedOption={displayStyle}
          options={generateLabelValueArray()}
          onChange={handleItemTypeSelect}
          orientation="row"
        />
      </div>

      {displayStyle === DISPLAY_STYLE.TREE && (
        <DisplayDataWithTree treeData={treeData} />
      )}
      {displayStyle === DISPLAY_STYLE.MEMORY_MAP && (
        <MemoryMap treeData={treeData} />
      )}
    </div>
  );
};

export default DisplayData;
