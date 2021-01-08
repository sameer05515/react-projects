interface AutomobileInterface{
    brand: string;
    speed: number;
    speedMethod(speed:number):void;
}

const automobile1:AutomobileInterface={
    brand:"Maruti",
    speed:2000,
    speedMethod:function(speed1:number){
        console.log(`this ${this.brand} is going at ${this.speed} KPH`)
    }
}

function car3(a:AutomobileInterface){
    console.log(`this ${a.brand} is going at ${a.speed} KPH`)
}

// car2(automobile);

// to run and see output of compiled JAVASCRIPT FILE
// node dist/class-interfaces/implementing-interfaces-to-classes.js 
// speed at 5000

class AutomobileClass implements AutomobileInterface{
    brand:string="Toyota";
    speed:number=4000;
    speedMethod(speedd:number){
        console.log("speed at "+speedd);
    }
}

let carObject= new AutomobileClass();
carObject.speedMethod(5000);