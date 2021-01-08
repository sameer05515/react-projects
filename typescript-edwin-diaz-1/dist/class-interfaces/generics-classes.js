"use strict";
var array1 = [1, 22, 333];
var array2 = [1, 2, 3];
var array3 = ['Premendra', 'Kumar'];
var ObjectGenericsClass = /** @class */ (function () {
    function ObjectGenericsClass(value, value2) {
        this.value = value;
        this.value2 = value2;
    }
    return ObjectGenericsClass;
}());
var obj1 = new ObjectGenericsClass("Hello", 2);
var obj2 = new ObjectGenericsClass("123", 1);
