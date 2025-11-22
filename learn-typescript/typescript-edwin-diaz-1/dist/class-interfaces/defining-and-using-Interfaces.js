"use strict";
var automobile2 = {
    brand: "Maruti",
    speed: 2000,
    speedMethod: function (speed) {
        console.log("this " + this.brand + " is going at " + this.speed + " KPH");
    }
};
var automobile = {
    brand: "Maruti",
    speed: 2000,
    speedMethod: function (speed) {
        console.log("this " + this.brand + " is going at " + this.speed + " KPH");
    }
};
function car2(a) {
    console.log("this " + a.brand + " is going at " + a.speed + " KPH");
}
car2(automobile);
car2(automobile2);
// to run and see output of compiled JAVASCRIPT FILE
// node dist/class-interfaces/defining-and-using-Interfaces.js 
// this Maruti is going at 2000 KPH
