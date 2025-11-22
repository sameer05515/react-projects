class Tree {
    // branch: string='';
    constructor(private leaf: string) {
        this.leaf = leaf;
    }
    public moveLeaf() {
        console.log("leaf is trembling")
    }
}

let tree1=new Tree("Yellow leaf");
tree1.moveLeaf();