"use strict";
var myTSNameSpace;
(function (myTSNameSpace) {
    myTSNameSpace.developer = 'Premendra Kumar';
    function displayData() {
        return 'TS Namespace start';
    }
    myTSNameSpace.displayData = displayData;
})(myTSNameSpace || (myTSNameSpace = {}));
