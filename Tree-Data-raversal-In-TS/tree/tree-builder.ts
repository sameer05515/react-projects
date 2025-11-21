import { TreeNode } from './tree-node';

/**
 * TreeBuilder class provides utilities for constructing tree structures.
 * Includes methods to build trees recursively and create sample trees for testing.
 */
class TreeBuilder {
    /**
     * Builds a tree structure recursively
     * @param parentNode - The parent node to attach children to
     * @param childrenCount - Number of children to create at each level
     * @param depth - Remaining depth levels to build
     */
    buildTree(parentNode: TreeNode, childrenCount: number, depth: number): void {
        if (depth <= 0) return;

        for (let index = 0; index < childrenCount; index++) {
            const childNode = new TreeNode(`${parentNode.value}_${index}`);
            parentNode.descendants.push(childNode);
            this.buildTree(childNode, childrenCount - 1, depth - 1);
        }
    }

    /**
     * Creates a sample tree for testing and demonstration purposes
     * Creates a tree with 3 children per node and depth of 3 levels
     * @returns The root node of the created tree
     */
    createSampleTree(): TreeNode {
        const root = new TreeNode('ROOT');
        this.buildTree(root, 3, 3);
        return root;
    }

    /**
     * Creates a custom tree with specified parameters
     * @param rootValue - Value for the root node
     * @param childrenCount - Number of children at each level
     * @param depth - Depth of the tree
     * @returns The root node of the created tree
     */
    createCustomTree(rootValue: string, childrenCount: number, depth: number): TreeNode {
        const root = new TreeNode(rootValue);
        this.buildTree(root, childrenCount, depth);
        return root;
    }
}

export { TreeBuilder };

