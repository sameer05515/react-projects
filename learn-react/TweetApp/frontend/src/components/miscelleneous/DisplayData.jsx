import React, { useState } from 'react';
import generateTreeData from './treeDataGenerator';
import RadioButtonsComponent from '../../common/components/radiobutton-component/RadioButtonsComponent';

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
const ulStyle = { listStyle: 'none' };

const TreeNode = ({ node, /**isOpen, onToggle */ }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li key={node.uniqueId}>
            <div style={{ marginLeft: '20px' }}>
                {node.children.length > 0 && (
                    <button onClick={() => {
                        // onToggle(node.uniqueId);
                        setIsOpen((prev) => !prev);
                    }}>
                        {isOpen ? '-' : '+'}
                    </button>
                )}
                <span
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {node.name}
                </span>

            </div>
            {isHovered && (
                <div style={{ fontSize: 'smaller', color: 'gray' }}>
                    {JSON.stringify({ ...node, children: [], childrenCount: node.children.length || 0 }, null, 2)}
                </div>
            )}
            {isOpen && (
                <ul style={ulStyle}>
                    {node.children.map(child => (
                        <TreeNode
                            key={child.uniqueId}
                            node={child}
                            isOpen={false} // Handling open state in parent
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
        <div>
            <ul style={ulStyle}>
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
    const styles = {
      memoryMapNode: {
        borderLeft: '1px solid gray',
        paddingLeft: '10px',
        marginBottom: '5px',
        marginLeft: `${level * 20}px`, // Indentation based on level
      }
    };
  
    return (
      <div style={styles.memoryMapNode}>
        {node.name}
        {node.children.length > 0 && (
          <div>
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
        <div>
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
