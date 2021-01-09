export const developer = 'Premendra Kumar';
export function displayData(value:string) {
    return 'TS Namespace start >>>>>>>  '+value;
}

interface AutomobileInterface{
    brand: string;
    speed: number;
    speedMethod(speed:number):void;
}


export class AutomobileClass implements AutomobileInterface{
    // brand:string="Toyota";
    // speed:number=4000;

    constructor(public brand:string,public speed:number){

    }
    speedMethod(){
        console.log(`Car ${this.brand} is running on speed of ${this.speed} Kilometers Per Hour !!!`);
    }
}

