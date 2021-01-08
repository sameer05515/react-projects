interface AutomobileInterface{
    brand: string;
    speed: number;
    speedMethod(speed:number):void;
}

interface AutomobileInterface2 extends AutomobileInterface{

}

const automobile2:AutomobileInterface2={
    brand:"Maruti",
    speed:2000,
    speedMethod:function(speed:number){
        console.log(`this ${this.brand} is going at ${this.speed} KPH`)
    }
}

const automobile:AutomobileInterface={
    brand:"Maruti",
    speed:2000,
    speedMethod:function(speed:number){
        console.log(`this ${this.brand} is going at ${this.speed} KPH`)
    }
}

function car2(a:AutomobileInterface){
    console.log(`this ${a.brand} is going at ${a.speed} KPH`)
}

car2(automobile);
car2(automobile2);

// to run and see output of compiled JAVASCRIPT FILE
// node dist/class-interfaces/defining-and-using-Interfaces.js 
// this Maruti is going at 2000 KPH