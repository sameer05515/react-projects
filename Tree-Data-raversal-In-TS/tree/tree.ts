class TreeNode{
    private _value:string='';
    private _descendants:TreeNode[]=[];
    constructor(value:string){
        this._value=value;
        this._descendants=[];
    }

    
    public get value() : string {
        return this.value;
    }

    public get descendants() : TreeNode[]{
        return this._descendants;
    }
    
}

class AddTreeData{

    addTreeData(parentNode:TreeNode,childrenCount:number,appender:string){
        for (let index = 0; index < childrenCount; index++) {
            const element = new TreeNode(parentNode.value+'_'+index);
            parentNode.descendants.push(element);
            this.addTreeData(element,childrenCount-1,'');
            
        }
    }

    public uu(){
        let root:TreeNode=new TreeNode('ROOT');
        this.addTreeData(root,5,'');
        console.log('Data : '+root);
    }
}
