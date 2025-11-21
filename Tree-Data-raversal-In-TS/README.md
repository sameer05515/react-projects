# Tree Data Traversal in TypeScript

A TypeScript implementation of tree data structures with various traversal algorithms including Depth-First Search (DFS) and Breadth-First Search (BFS).

## Features

- **TreeNode Class**: A generic tree node implementation with value and descendants
- **Tree Traversal Algorithms**:
  - DFS Pre-order traversal
  - DFS Post-order traversal
  - BFS Level-order traversal
- **Tree Utilities**:
  - Find node by value
  - Calculate tree height
  - Count total nodes
- **Tree Builder**: Utility class for creating sample tree structures

## Project Structure

```
Tree-Data-raversal-In-TS/
├── tree/
│   └── tree.ts          # Core tree classes and traversal implementations
├── index.ts              # Main entry point with examples
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

### Compile TypeScript

```bash
npm run build
```

### Run the compiled code

```bash
npm start
```

### Run directly with ts-node (development)

```bash
npm run dev
```

### Watch mode (auto-compile on changes)

```bash
npm run watch
```

## Code Examples

### Creating a Tree

```typescript
import { TreeNode, TreeBuilder } from './tree/tree';

const builder = new TreeBuilder();
const root = builder.createSampleTree();
```

### Traversing a Tree

```typescript
import { TreeTraversal } from './tree/tree';

const traversal = new TreeTraversal();

// DFS Pre-order
traversal.dfsPreOrder(root, (node) => {
    console.log(node.value);
});

// DFS Post-order
traversal.dfsPostOrder(root, (node) => {
    console.log(node.value);
});

// BFS Level-order
traversal.bfs(root, (node) => {
    console.log(node.value);
});
```

### Finding a Node

```typescript
const foundNode = traversal.findNodeByValue(root, 'ROOT_0_1');
if (foundNode) {
    console.log(`Found: ${foundNode.value}`);
}
```

### Tree Statistics

```typescript
const totalNodes = traversal.countNodes(root);
const treeHeight = traversal.getTreeHeight(root);
console.log(`Nodes: ${totalNodes}, Height: ${treeHeight}`);
```

## Traversal Algorithms Explained

### Depth-First Search (DFS)

**Pre-order**: Visit the node before its children
- Algorithm: Root → Left subtree → Right subtree
- Use case: Copying a tree, prefix notation

**Post-order**: Visit the node after its children
- Algorithm: Left subtree → Right subtree → Root
- Use case: Deleting a tree, postfix notation

### Breadth-First Search (BFS)

**Level-order**: Visit nodes level by level from top to bottom
- Algorithm: Uses a queue to process nodes level by level
- Use case: Finding shortest path, level-by-level processing

## API Reference

### TreeNode

```typescript
class TreeNode {
    value: string;              // Getter for node value
    descendants: TreeNode[];    // Getter for child nodes
    constructor(value: string);
}
```

### TreeTraversal

```typescript
class TreeTraversal {
    dfsPreOrder(node: TreeNode | null, callback: (node: TreeNode) => void): void;
    dfsPostOrder(node: TreeNode | null, callback: (node: TreeNode) => void): void;
    bfs(node: TreeNode | null, callback: (node: TreeNode) => void): void;
    findNodeByValue(root: TreeNode | null, value: string): TreeNode | null;
    getTreeHeight(node: TreeNode | null): number;
    countNodes(node: TreeNode | null): number;
}
```

### TreeBuilder

```typescript
class TreeBuilder {
    buildTree(parentNode: TreeNode, childrenCount: number, depth: number): void;
    createSampleTree(): TreeNode;
}
```

## Development

### TypeScript Configuration

The project uses TypeScript with the following compiler options:
- Target: ES5
- Module: CommonJS
- Source maps enabled

### VS Code Tasks

The project includes VS Code tasks configuration for building TypeScript files. Use `Ctrl+Shift+P` → "Tasks: Run Build Task" to compile.

## License

MIT

