"use strict";
var automobile1 = {
    brand: "Maruti",
    speed: 2000,
    speedMethod: function (speed1) {
        console.log("this " + this.brand + " is going at " + this.speed + " KPH");
    }
};
function car3(a) {
    console.log("this " + a.brand + " is going at " + a.speed + " KPH");
}
// car2(automobile);
// to run and see output of compiled JAVASCRIPT FILE
// node dist/class-interfaces/implementing-interfaces-to-classes.js 
// speed at 5000
var AutomobileClass = /** @class */ (function () {
    function AutomobileClass() {
        this.brand = "Toyota";
        this.speed = 4000;
    }
    AutomobileClass.prototype.speedMethod = function (speedd) {
        console.log("speed at " + speedd);
    };
    return AutomobileClass;
}());
var carObject = new AutomobileClass();
carObject.speedMethod(5000);
