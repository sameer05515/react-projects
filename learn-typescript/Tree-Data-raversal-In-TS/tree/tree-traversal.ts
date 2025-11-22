import { TreeNode } from './tree-node';

/**
 * TreeTraversal class provides various algorithms for traversing tree structures.
 * Includes Depth-First Search (DFS) and Breadth-First Search (BFS) implementations.
 */
class TreeTraversal {
    /**
     * Depth-First Search (DFS) - Pre-order traversal
     * Visits node before its descendants
     * @param node - The root node to start traversal from
     * @param callback - Function called for each visited node
     */
    dfsPreOrder(node: TreeNode | null, callback: (node: TreeNode) => void): void {
        if (!node) return;

        callback(node);
        node.descendants.forEach(child => {
            this.dfsPreOrder(child, callback);
        });
    }

    /**
     * Depth-First Search (DFS) - Post-order traversal
     * Visits node after its descendants
     * @param node - The root node to start traversal from
     * @param callback - Function called for each visited node
     */
    dfsPostOrder(node: TreeNode | null, callback: (node: TreeNode) => void): void {
        if (!node) return;

        node.descendants.forEach(child => {
            this.dfsPostOrder(child, callback);
        });
        callback(node);
    }

    /**
     * Breadth-First Search (BFS) - Level-order traversal
     * Visits nodes level by level from top to bottom
     * @param node - The root node to start traversal from
     * @param callback - Function called for each visited node
     */
    bfs(node: TreeNode | null, callback: (node: TreeNode) => void): void {
        if (!node) return;

        const queue: TreeNode[] = [node];

        while (queue.length > 0) {
            const current = queue.shift()!;
            callback(current);

            current.descendants.forEach(child => {
                queue.push(child);
            });
        }
    }

    /**
     * Find a node by value using Depth-First Search
     * @param root - The root node to start search from
     * @param value - The value to search for
     * @returns The found TreeNode or null if not found
     */
    findNodeByValue(root: TreeNode | null, value: string): TreeNode | null {
        if (!root) return null;
        if (root.value === value) return root;

        for (const child of root.descendants) {
            const found = this.findNodeByValue(child, value);
            if (found) return found;
        }

        return null;
    }

    /**
     * Get the height/depth of the tree
     * Height is measured as the number of nodes from root to deepest leaf
     * @param node - The root node to calculate height from
     * @returns The height of the tree
     */
    getTreeHeight(node: TreeNode | null): number {
        if (!node) return 0;
        if (node.descendants.length === 0) return 1;

        const heights = node.descendants.map(child => this.getTreeHeight(child));
        return 1 + Math.max(...heights);
    }

    /**
     * Count total nodes in the tree
     * @param node - The root node to start counting from
     * @returns The total number of nodes in the tree
     */
    countNodes(node: TreeNode | null): number {
        if (!node) return 0;

        let count = 1;
        node.descendants.forEach(child => {
            count += this.countNodes(child);
        });

        return count;
    }
}

export { TreeTraversal };

