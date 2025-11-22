function stringFunction(){
    console.log("Hello I'm string");
    return "hello";
}

function cal1(val1:number,val2:number):number{
    let total=val1+val2;
    return total;
}

cal1(22,44);

let universal:()=>string =stringFunction;
universal();

let universal2:(n1:number,n2:number)=>number=cal1;
console.log(universal2(22,444))
