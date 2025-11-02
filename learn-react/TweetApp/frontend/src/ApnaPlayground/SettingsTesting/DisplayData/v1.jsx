import React, { useState } from 'react';
import generateTreeData from './treeDataGenerator';
import RadioButtonsComponent from '../../../common/components/radiobutton-component/RadioButtonsComponent';

const DISPLAY_STYLE = {
    TREE: 'tree',
    MEMORY_MAP: 'memory-map'
}

const generateLabelValueArray = (obj = DISPLAY_STYLE) => {
    return Object.keys(obj).map(key => ({
        label: key,
        value: obj[key]
    }));
};

//=== TREE STYLE DISPLAY: START ============================
const TreeNode = ({ node, /**isOpen, onToggle */ }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li key={node.uniqueId} className="list-none">
            <div className="ml-5">
                {node.children.length > 0 && (
                    <button 
                        onClick={() => {
                        setIsOpen((prev) => !prev);
                        }}
                        className="px-2 py-1 mr-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-bold"
                    >
                        {isOpen ? '−' : '+'}
                    </button>
                )}
                <span
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                >
                    {node.name}
                </span>

            </div>
            {isHovered && (
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mt-1 ml-7 font-mono">
                    {JSON.stringify({ ...node, children: [], childrenCount: node.children.length || 0 }, null, 2)}
                </div>
            )}
            {isOpen && (
                <ul className="list-none">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.uniqueId}
                            node={child}
                            isOpen={false}
                            onToggle={() => { } /**onToggle*/}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const DisplayDataWithUlLi = ({ treeData = [] }) => {
    const [openNodes, setOpenNodes] = useState(new Set());

    const toggleNode = (id) => {
        setOpenNodes(prevOpenNodes => {
            const newOpenNodes = new Set(prevOpenNodes);
            if (newOpenNodes.has(id)) {
                newOpenNodes.delete(id);
            } else {
                newOpenNodes.add(id);
            }
            return newOpenNodes;
        });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <ul className="list-none">
                {treeData.filter(node => node.parentId === 0).map(node => (
                    <TreeNode
                        key={node.uniqueId}
                        node={node}
                        isOpen={openNodes.has(node.uniqueId)}
                        onToggle={toggleNode}
                    />
                ))}
            </ul>
        </div>
    );
};

//=== TREE STYLE DISPLAY: END ============================

// ------------------------------------------------------------------------

//=== MEMORY_MAP STYLE DISPLAY: START ============================

const MemoryMapNode = ({ node, level }) => {
    return (
      <div className="border-l border-gray-400 pl-2.5 mb-1.5" style={{ marginLeft: `${level * 20}px` }}>
        <span className="text-gray-800 font-medium">{node.name}</span>
        {node.children.length > 0 && (
          <div className="mt-1">
            {node.children.map(child => (
              <MemoryMapNode key={child.uniqueId} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

const MemoryMap = ({ treeData }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            {treeData
                .filter(node => node.parentId === 0)
                .map(rootNode => (
                    <MemoryMapNode key={rootNode.uniqueId} node={rootNode} level={0} />
                ))}
        </div>
    );
};

//=== MEMORY_MAP STYLE DISPLAY: END ============================

const DisplayData = ({ /**dispalyStyle = DISPLAY_STYLE.TREE,*/ treeData = generateTreeData(7, 4) }) => {

    const [dispalyStyle, setDispalyStyle] = useState(DISPLAY_STYLE.TREE);
    const handleItemTypeSelect = (selectedOption) => {
        if (!selectedOption) return;

        console.log("Selected Option:", selectedOption);
        setDispalyStyle(() => selectedOption.value);
    };
    return (
        <>

            <div>
                <div>
                    <RadioButtonsComponent
                        initialSelectedOption={dispalyStyle}
                        options={generateLabelValueArray()}
                        onChange={handleItemTypeSelect}
                    />
                </div>
                <div>

                </div>
            </div>

            {
                dispalyStyle === DISPLAY_STYLE.TREE && <DisplayDataWithUlLi treeData={treeData} />
            }
            {
                dispalyStyle === DISPLAY_STYLE.MEMORY_MAP && <MemoryMap treeData={treeData} />
            }

        </>
    )
}



export default DisplayData;
