(()=>{"use strict";eval('\n;// CONCATENATED MODULE: ./src/module_external.ts\nconst developer = \'Premendra Kumar\';\nfunction displayData(value) {\n    return \'TS Namespace start >>>>>>>  \' + value;\n}\nclass AutomobileClass {\n    // brand:string="Toyota";\n    // speed:number=4000;\n    constructor(brand, speed) {\n        this.brand = brand;\n        this.speed = speed;\n    }\n    speedMethod() {\n        console.log(`Car ${this.brand} is running on speed of ${this.speed} Kilometers Per Hour !!!`);\n    }\n}\n\n;// CONCATENATED MODULE: ./src/namespaced_validators.ts\nvar Validation;\n(function (Validation) {\n    const lettersRegexp = /^[A-Za-z]+$/;\n    const numberRegexp = /^[0-9]+$/;\n    class LettersOnlyValidator {\n        isAcceptable(s) {\n            return lettersRegexp.test(s);\n        }\n    }\n    Validation.LettersOnlyValidator = LettersOnlyValidator;\n    class ZipCodeValidator {\n        constructor(zipCodeSize) {\n            this.zipCodeSize = zipCodeSize;\n        }\n        isAcceptable(s) {\n            return s.length === this.zipCodeSize && numberRegexp.test(s);\n        }\n    }\n    Validation.ZipCodeValidator = ZipCodeValidator;\n})(Validation || (Validation = {}));\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\nconsole.log(displayData(\'Premendra Kumar\'));\nlet carObject = new AutomobileClass(\'Toyota\', 5);\ncarObject.speedMethod();\n// Some samples to try\nlet strings1 = ["Hello", "98052", "845401", "121004", "101"];\n// Validators to use\nlet validators1 = {};\nvalidators1["ZIP code in US"] = new Validation.ZipCodeValidator(5);\nvalidators1["ZIP code in India"] = new Validation.ZipCodeValidator(6);\nvalidators1["Letters only"] = new Validation.LettersOnlyValidator();\n// Show whether each string passed each validator\nfor (let s of strings1) {\n    for (let name in validators1) {\n        console.log(`"${s}" - ${validators1[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWstdHlwZXNjcmlwdC1jb2RpbmctbmluemEvLi9zcmMvbW9kdWxlX2V4dGVybmFsLnRzPzJjOGEiLCJ3ZWJwYWNrOi8vd2VicGFrLXR5cGVzY3JpcHQtY29kaW5nLW5pbnphLy4vc3JjL25hbWVzcGFjZWRfdmFsaWRhdG9ycy50cz82YjI2Iiwid2VicGFjazovL3dlYnBhay10eXBlc2NyaXB0LWNvZGluZy1uaW56YS8uL3NyYy9pbmRleC50cz9mZmI0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQU8sTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDcEMsU0FBUyxXQUFXLENBQUMsS0FBWTtJQUNwQyxPQUFPLDhCQUE4QixHQUFDLEtBQUssQ0FBQztBQUNoRCxDQUFDO0FBU00sTUFBTSxlQUFlO0lBQ3hCLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFFckIsWUFBbUIsS0FBWSxFQUFRLEtBQVk7UUFBaEMsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUFRLFVBQUssR0FBTCxLQUFLLENBQU87SUFFbkQsQ0FBQztJQUNELFdBQVc7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssMkJBQTJCLElBQUksQ0FBQyxLQUFLLDBCQUEwQixDQUFDLENBQUM7SUFDbEcsQ0FBQztDQUNKOzs7QUN0Qk0sSUFBVSxVQUFVLENBcUIxQjtBQXJCRCxXQUFpQixVQUFVO0lBS3pCLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7SUFFaEMsTUFBYSxvQkFBb0I7UUFDL0IsWUFBWSxDQUFDLENBQVM7WUFDcEIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FDRjtJQUpZLCtCQUFvQix1QkFJaEM7SUFFRCxNQUFhLGdCQUFnQjtRQUMzQixZQUFvQixXQUFtQjtZQUFuQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUFJLENBQUM7UUFFNUMsWUFBWSxDQUFDLENBQVM7WUFDcEIsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQ0Y7SUFOWSwyQkFBZ0IsbUJBTTVCO0FBQ0gsQ0FBQyxFQXJCZ0IsVUFBVSxLQUFWLFVBQVUsUUFxQjFCOzs7QUNyQnNFO0FBQzFCO0FBRTdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUN0QyxJQUFJLFNBQVMsR0FBRSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0MsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRXhCLHNCQUFzQjtBQUN0QixJQUFJLFFBQVEsR0FBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUVwRSxvQkFBb0I7QUFDcEIsSUFBSSxXQUFXLEdBQWtELEVBQUUsQ0FBQztBQUNwRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLDJCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksMkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksK0JBQWlDLEVBQUUsQ0FBQztBQUV0RSxpREFBaUQ7QUFDakQsS0FBSyxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUU7SUFDdEIsS0FBSyxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUU7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxJQUFJLENBQUMsT0FDSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUNsRCxJQUFJLElBQUksRUFBRSxDQUNYLENBQUM7S0FDSDtDQUNGIiwiZmlsZSI6Ijk1MC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkZXZlbG9wZXIgPSAnUHJlbWVuZHJhIEt1bWFyJztcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5RGF0YSh2YWx1ZTpzdHJpbmcpIHtcbiAgICByZXR1cm4gJ1RTIE5hbWVzcGFjZSBzdGFydCA+Pj4+Pj4+ICAnK3ZhbHVlO1xufVxuXG5pbnRlcmZhY2UgQXV0b21vYmlsZUludGVyZmFjZXtcbiAgICBicmFuZDogc3RyaW5nO1xuICAgIHNwZWVkOiBudW1iZXI7XG4gICAgc3BlZWRNZXRob2Qoc3BlZWQ6bnVtYmVyKTp2b2lkO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBBdXRvbW9iaWxlQ2xhc3MgaW1wbGVtZW50cyBBdXRvbW9iaWxlSW50ZXJmYWNle1xuICAgIC8vIGJyYW5kOnN0cmluZz1cIlRveW90YVwiO1xuICAgIC8vIHNwZWVkOm51bWJlcj00MDAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGJyYW5kOnN0cmluZyxwdWJsaWMgc3BlZWQ6bnVtYmVyKXtcblxuICAgIH1cbiAgICBzcGVlZE1ldGhvZCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhgQ2FyICR7dGhpcy5icmFuZH0gaXMgcnVubmluZyBvbiBzcGVlZCBvZiAke3RoaXMuc3BlZWR9IEtpbG9tZXRlcnMgUGVyIEhvdXIgISEhYCk7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRpb24ge1xuICBleHBvcnQgaW50ZXJmYWNlIFN0cmluZ1ZhbGlkYXRvciB7XG4gICAgaXNBY2NlcHRhYmxlKHM6IHN0cmluZyk6IGJvb2xlYW47XG4gIH1cblxuICBjb25zdCBsZXR0ZXJzUmVnZXhwID0gL15bQS1aYS16XSskLztcbiAgY29uc3QgbnVtYmVyUmVnZXhwID0gL15bMC05XSskLztcblxuICBleHBvcnQgY2xhc3MgTGV0dGVyc09ubHlWYWxpZGF0b3IgaW1wbGVtZW50cyBTdHJpbmdWYWxpZGF0b3Ige1xuICAgIGlzQWNjZXB0YWJsZShzOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBsZXR0ZXJzUmVnZXhwLnRlc3Qocyk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFppcENvZGVWYWxpZGF0b3IgaW1wbGVtZW50cyBTdHJpbmdWYWxpZGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgemlwQ29kZVNpemU6IG51bWJlcikgeyB9XG5cbiAgICBpc0FjY2VwdGFibGUoczogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gcy5sZW5ndGggPT09IHRoaXMuemlwQ29kZVNpemUgJiYgbnVtYmVyUmVnZXhwLnRlc3Qocyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2Rpc3BsYXlEYXRhIGFzIFByZW1pLEF1dG9tb2JpbGVDbGFzc30gZnJvbSBcIi4vbW9kdWxlX2V4dGVybmFsXCI7XG5pbXBvcnQgKiBhcyB2IGZyb20gJy4vbmFtZXNwYWNlZF92YWxpZGF0b3JzJztcblxuY29uc29sZS5sb2coUHJlbWkoJ1ByZW1lbmRyYSBLdW1hcicpKTtcbmxldCBjYXJPYmplY3Q9IG5ldyBBdXRvbW9iaWxlQ2xhc3MoJ1RveW90YScsNSk7XG5jYXJPYmplY3Quc3BlZWRNZXRob2QoKTtcblxuLy8gU29tZSBzYW1wbGVzIHRvIHRyeVxubGV0IHN0cmluZ3MxOnN0cmluZ1tdID0gW1wiSGVsbG9cIiwgXCI5ODA1MlwiLFwiODQ1NDAxXCIsXCIxMjEwMDRcIiwgXCIxMDFcIl07XG5cbi8vIFZhbGlkYXRvcnMgdG8gdXNlXG5sZXQgdmFsaWRhdG9yczE6IHsgW3M6IHN0cmluZ106IHYuVmFsaWRhdGlvbi5TdHJpbmdWYWxpZGF0b3IgfSA9IHt9O1xudmFsaWRhdG9yczFbXCJaSVAgY29kZSBpbiBVU1wiXSA9IG5ldyB2LlZhbGlkYXRpb24uWmlwQ29kZVZhbGlkYXRvcig1KTtcbnZhbGlkYXRvcnMxW1wiWklQIGNvZGUgaW4gSW5kaWFcIl0gPSBuZXcgdi5WYWxpZGF0aW9uLlppcENvZGVWYWxpZGF0b3IoNik7XG52YWxpZGF0b3JzMVtcIkxldHRlcnMgb25seVwiXSA9IG5ldyB2LlZhbGlkYXRpb24uTGV0dGVyc09ubHlWYWxpZGF0b3IoKTtcblxuLy8gU2hvdyB3aGV0aGVyIGVhY2ggc3RyaW5nIHBhc3NlZCBlYWNoIHZhbGlkYXRvclxuZm9yIChsZXQgcyBvZiBzdHJpbmdzMSkge1xuICBmb3IgKGxldCBuYW1lIGluIHZhbGlkYXRvcnMxKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgXCIke3N9XCIgLSAke1xuICAgICAgICB2YWxpZGF0b3JzMVtuYW1lXS5pc0FjY2VwdGFibGUocykgPyBcIm1hdGNoZXNcIiA6IFwiZG9lcyBub3QgbWF0Y2hcIlxuICAgICAgfSAke25hbWV9YFxuICAgICk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///950\n')})();