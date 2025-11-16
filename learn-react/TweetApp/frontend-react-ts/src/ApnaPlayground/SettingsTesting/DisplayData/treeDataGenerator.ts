// const data = [
//     { uniqueId: 1, name: 'Parent 1', children: [], parentId: 0 },
//     { uniqueId: 2, name: 'Child 1 of Parent 1', children: [], parentId: 1 },
//     { uniqueId: 3, name: 'Child 2 of Parent 1', children: [], parentId: 1 },
//     { uniqueId: 4, name: 'Parent 2', children: [], parentId: 0 },
//     { uniqueId: 5, name: 'Child 1 of Parent 2', children: [], parentId: 4 },
//     { uniqueId: 6, name: 'Child 2 of Parent 2', children: [], parentId: 4 }
// ];

// data.forEach(item => {
//     if (item.parentId !== 0) {
//         const parent = data.find(parent => parent.uniqueId === item.parentId);
//         parent.children.push(item);
//     }
// });
const generateTreeData = (depth, itemsPerLevel) => {
    const data = [];
    let uniqueId = 1;

    const generateChildren = (parentId, currentDepth) => {
        if (currentDepth >= depth) return;

        for (let i = 0; i < itemsPerLevel; i++) {
            const id = uniqueId++;
            const node = {
                uniqueId: id,
                name: `Item ${id}`,
                children: [],
                parentId: parentId,
                currentDepth
            };

            data.push(node);
            generateChildren(id, currentDepth + 1);
        }
    };

    // Initialize the root nodes
    generateChildren(0, 0);

    // Map children to their parents
    data.forEach(item => {
        if (item.parentId !== 0) {
            const parent = data.find(parent => parent.uniqueId === item.parentId);
            parent.children.push(item);
        }
    });

    return data;
};

// Generate tree with depth 7 and 3 items at each level
// const treeData = generateTreeData(7, 1);

// console.log(JSON.stringify(treeData, null, 2));

export default generateTreeData;