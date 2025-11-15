/**
 * TreeNode class represents a node in a tree data structure.
 * Each node has a value and can have multiple child nodes (descendants).
 */
class TreeNode {
    private _value: string = '';
    private _descendants: TreeNode[] = [];

    /**
     * Creates a new TreeNode instance
     * @param value - The value stored in this node
     */
    constructor(value: string) {
        this._value = value;
        this._descendants = [];
    }

    /**
     * Gets the value stored in this node
     */
    public get value(): string {
        return this._value;
    }

    /**
     * Gets the array of child nodes (descendants)
     */
    public get descendants(): TreeNode[] {
        return this._descendants;
    }
}

export { TreeNode };

