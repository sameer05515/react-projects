import React, { useEffect, useRef, useState } from "react";

// Sample treeList data
const treeList = [
    {
        id: "root",
        name: "Root",
        type: "category",
        children: [
            {
                id: "1",
                name: "Parent 1",
                type: "category",
                children: [
                    {
                        id: "1-1",
                        name: "Child 1-1",
                        type: "question",
                        children: []
                    },
                    {
                        id: "1-2",
                        name: "Child 1-2",
                        type: "question",
                        children: [
                            {
                                id: "1-2-1",
                                name: "Grandchild 1-2-1",
                                type: "question",
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: "2",
                name: "Parent 2",
                type: "category",
                children: [
                    {
                        id: "2-1",
                        name: "Child 2-1",
                        type: "category",
                        children: []
                    }
                ]
            },
            {
                id: "3",
                name: "Parent 3",
                type: "category",
                children: []
            }
        ]
    }
];

// TreeNode component to render individual nodes
const TreeNode = ({ node, selectedNodeId, onNodeSelection = () => { } }) => {
    const nodeRef = useRef(null);
    useEffect(() => {
        if (selectedNodeId === node.id && nodeRef.current) {
            nodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedNodeId, node.id]);

    const handleNodeSelection = (node) => {
        // console.log(`[TreeNode]: this node has been clicked : ${JSON.stringify(node)}`);

        if (onNodeSelection && (selectedNodeId !== node.id)) {
            onNodeSelection({id: node.id, name:node.name, type:node.type});
        }
        // else{
        //     console.log(`Already selected!!`);
        // }
    }
    return (
        <li>
            <span
                ref={nodeRef}
                style={{ color: selectedNodeId === node.id ? "blue" : "black" }}
                onClick={() => handleNodeSelection(node)}
            >
                {node.name}
            </span>
            {node.children && node.children.length > 0 && (
                <ul>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selectedNodeId={selectedNodeId}
                            onNodeSelection={onNodeSelection}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

// TreeList component to render the entire tree
const TreeList = ({ treeList = [], selectedNodeId, customStyle, onNodeSelection = () => { } }) => {
    const handleNodeSelection = (node) => {
        // console.log(`[TreeList]: Mr node : ${JSON.stringify(node, null, 2)}. Please wait. TreenList is working you to get selected`);
        onNodeSelection(node);
    }
    return (
        <div style={customStyle}>
            {treeList && treeList.length > 0 && (
                <>
                    <ul>
                        {treeList.map((link) => (
                            <TreeNode
                                key={link.id}
                                node={link}
                                selectedNodeId={selectedNodeId}
                                onNodeSelection={handleNodeSelection}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

// Function to flatten the tree structure into an array
const flattenTree = (list, prevQueue = []) => {
    let queue = [...prevQueue];
    if (list && list.length > 0) {
        list.forEach((t) => {
            queue = [...queue, { ...{ id: t.id, name: t.name, type:t.type } }];
            const childQ = flattenTree(t.children, []);
            queue = [...queue, ...childQ];
        });
    }
    return queue;
};

// TreeBase Example component to render the TreeList component and handle selection
const TreeBase = ({ treeList = [], customStyle={}, onNodeSelection=()=>{} }) => {
    const [flattenedTree, setFlattenedTree] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setFlattenedTree(flattenTree(treeList));
    }, [treeList]);

    useEffect(() => {
        onNodeSelection(flattenedTree[selectedIndex]);
    }, [selectedIndex]);

    const handleNextClick = () => {
        // console.log(`Next clicked`);
        setSelectedIndex((prevIndex) => (prevIndex + 1+flattenedTree.length) % flattenedTree.length);
        // onNodeSelection(flattenedTree[selectedIndex])
    };

    const handlePrevClick = () => {
        // console.log(`Prev clicked`);
        setSelectedIndex((prevIndex) => (prevIndex - 1+flattenedTree.length) % flattenedTree.length);
        // onNodeSelection(flattenedTree[selectedIndex])
    };

    const handleNodeSelection = (node) => {
        if (node) {
            const index = flattenedTree.findIndex(t => t.id === node.id);
            if (index >= 0) { setSelectedIndex(index); }
            // console.log(`[TreeBase]: Please check and confirm if you have been selected. Mr node : ${JSON.stringify(node)}`);
        }
        // onNodeSelection(node);
    }    

    return (
        <div>
            {/* <h1>Tree List</h1> */}
            <button onClick={handlePrevClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
            <TreeList
                treeList={treeList}
                selectedNodeId={flattenedTree[selectedIndex]?.id || 0}
                customStyle={customStyle}
                onNodeSelection={handleNodeSelection}
            />
            {/* selectedIndex : {selectedIndex} <br /> */}
            {/* {JSON.stringify(flattenedTree, null, 2)} */}
            {/* <pre>{JSON.stringify(flattenedTree[selectedIndex], null, 2)}</pre> */}
        </div>
    );
};

export default TreeBase;
export { treeList };
