"use strict";
function stringFunction() {
    console.log("Hello I'm string");
    return "hello";
}
function cal1(val1, val2) {
    var total = val1 + val2;
    return total;
}
cal1(22, 44);
var universal = stringFunction;
universal();
var universal2 = cal1;
console.log(universal2(22, 444));
