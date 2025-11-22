"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator(zipCodeSize) {
            this.zipCodeSize = zipCodeSize;
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === this.zipCodeSize && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation = exports.Validation || (exports.Validation = {}));
