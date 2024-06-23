class TreeNode {
    constructor(name) {
        this.name = name;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
        return this;  // For chaining
    }
}

class TreeBuilder {
    constructor(rootName) {
        this.root = new TreeNode(rootName);
        this.currentNode = this.root;
        this.parentStack = [];
    }

    addChild(name) {
        const childNode = new TreeNode(name);
        this.currentNode.addChild(childNode);
        this.parentStack.push(this.currentNode);
        this.currentNode = childNode;
        return this;  // For chaining
    }

    addSibling(name) {
        const siblingNode = new TreeNode(name);
        this.parentStack[this.parentStack.length - 1].addChild(siblingNode);
        this.currentNode = siblingNode;
        return this;  // For chaining
    }

    up() {
        this.currentNode = this.parentStack.pop();
        return this;  // For chaining
    }

    build() {
        return this.root;
    }
}

// Example usage:

// const tree = new TreeBuilder('World')
//     .addChild('Africa')
//         .addChild('Nigeria')
//             .addChild('Lagos').up()
//             .addSibling('Abuja').up()
//             .addSibling('Kano').up().up()
//         .addSibling('Egypt')
//             .addChild('Cairo').up()
//             .addSibling('Alexandria').up()
//             .addSibling('Giza').up().up()
//         .addSibling('South Africa')
//             .addChild('Johannesburg').up()
//             .addSibling('Cape Town').up()
//             .addSibling('Durban').up().up().up()
//     .addSibling('Asia')
//         .addChild('China')
//             .addChild('Beijing').up()
//             .addSibling('Shanghai').up()
//             .addSibling('Shenzhen').up().up()
//         .addSibling('India')
//             .addChild('Mumbai').up()
//             .addSibling('Delhi').up()
//             .addSibling('Bangalore').up().up()
//         .addSibling('Japan')
//             .addChild('Tokyo').up()
//             .addSibling('Osaka').up()
//             .addSibling('Kyoto').up().up().up()
//     .build();

const tree1=new TreeBuilder('World').build();

console.log(JSON.stringify(tree1, null, 2));
