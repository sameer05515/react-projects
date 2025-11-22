function add(n1: number, n2: number){
    return n1+n2;
}

function printResult(num: number){
    console.log('Result : '+num);    
}

function addAndHandleResult(n1: number, n2: number, cbFn: (num: number) => void){
    const result= add(n1,n2);
    cbFn(result);
}

printResult(add(12,774));

// let combinedValues : Function;
let combinedValues : (a:number,b:number) => number;
combinedValues = add;
// combinedValues = printResult;

console.log(combinedValues(33,66));

addAndHandleResult(12,13,(result)=> { console.log('Result is : ====== : '+result);})