let array1:number[]=[1,22,333];
let array2:Array<number>=[1,2,3];
let array3:Array<string>=['Premendra','Kumar'];

class ObjectGenericsClass<TYPE1 extends string,TYPE2>{
    constructor(public value:TYPE1,public value2:TYPE2){
    }
}

let obj1=new ObjectGenericsClass<string,number>("Hello",2);
let obj2=new ObjectGenericsClass("123",1);