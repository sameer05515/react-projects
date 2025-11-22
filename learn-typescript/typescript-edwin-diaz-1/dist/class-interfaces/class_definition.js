"use strict";
var Tree = /** @class */ (function () {
    // branch: string='';
    function Tree(leaf) {
        this.leaf = leaf;
        this.leaf = leaf;
    }
    Tree.prototype.moveLeaf = function () {
        console.log("leaf is trembling");
    };
    return Tree;
}());
var tree1 = new Tree("Yellow leaf");
tree1.moveLeaf();
