import { TreeNode, TreeTraversal, TreeBuilder } from './tree';

/**
 * Main entry point for Tree Data Traversal demonstration
 */
function main() {
    console.log('=== Tree Data Traversal in TypeScript ===\n');

    // Create a sample tree
    const builder = new TreeBuilder();
    const root = builder.createSampleTree();
    
    console.log('Tree created successfully!');
    console.log(`Total nodes: ${new TreeTraversal().countNodes(root)}`);
    console.log(`Tree height: ${new TreeTraversal().getTreeHeight(root)}\n`);

    // Initialize traversal instance
    const traversal = new TreeTraversal();

    // DFS Pre-order traversal
    console.log('--- DFS Pre-order Traversal ---');
    const preOrderValues: string[] = [];
    traversal.dfsPreOrder(root, (node) => {
        preOrderValues.push(node.value);
    });
    console.log(preOrderValues.join(' -> '));
    console.log();

    // DFS Post-order traversal
    console.log('--- DFS Post-order Traversal ---');
    const postOrderValues: string[] = [];
    traversal.dfsPostOrder(root, (node) => {
        postOrderValues.push(node.value);
    });
    console.log(postOrderValues.join(' -> '));
    console.log();

    // BFS Level-order traversal
    console.log('--- BFS Level-order Traversal ---');
    const bfsValues: string[] = [];
    traversal.bfs(root, (node) => {
        bfsValues.push(node.value);
    });
    console.log(bfsValues.join(' -> '));
    console.log();

    // Search for a specific node
    console.log('--- Node Search ---');
    const searchValue = 'ROOT_0_1';
    const foundNode = traversal.findNodeByValue(root, searchValue);
    if (foundNode) {
        console.log(`Found node: ${foundNode.value}`);
        console.log(`Children count: ${foundNode.descendants.length}`);
    } else {
        console.log(`Node "${searchValue}" not found`);
    }
}

// Run the main function
main();

