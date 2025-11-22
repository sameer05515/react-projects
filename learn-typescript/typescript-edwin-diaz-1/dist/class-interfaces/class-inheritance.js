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
var Building = /** @class */ (function () {
    function Building() {
        this.windows = '';
    }
    Building.prototype.escalators = function () {
        console.log('The escalators is moving');
    };
    return Building;
}());
var Building2 = /** @class */ (function (_super) {
    __extends(Building2, _super);
    function Building2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Building2.prototype.escalators = function () {
        console.log('The escalators is moving from building 2');
    };
    return Building2;
}(Building));
var building1 = new Building();
building1.escalators();
var building2 = new Building2();
building2.escalators();
