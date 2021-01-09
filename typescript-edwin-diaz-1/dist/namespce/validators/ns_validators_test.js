"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var v = __importStar(require("./namespaced_validators"));
// Some samples to try
var strings1 = ["Hello", "98052", "845401", "101"];
// Validators to use
var validators1 = {};
validators1["ZIP code in US"] = new v.Validation.ZipCodeValidator(5);
validators1["ZIP code in India"] = new v.Validation.ZipCodeValidator(6);
validators1["Letters only"] = new v.Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (var _i = 0, strings1_1 = strings1; _i < strings1_1.length; _i++) {
    var s = strings1_1[_i];
    for (var name_1 in validators1) {
        console.log("\"" + s + "\" - " + (validators1[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
    }
}
