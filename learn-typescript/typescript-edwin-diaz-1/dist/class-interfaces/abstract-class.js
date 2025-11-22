"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var People = /** @class */ (function () {
    function People() {
    }
    return People;
}());
// let peopleClass=new People();
// peopleClass.displayDate();
var Kids = /** @class */ (function (_super) {
    __extends(Kids, _super);
    function Kids() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Kids.prototype.displayDate = function () {
        console.log("some data of kids");
    };
    return Kids;
}(People));
var kidsClass = new Kids();
kidsClass.displayDate();
