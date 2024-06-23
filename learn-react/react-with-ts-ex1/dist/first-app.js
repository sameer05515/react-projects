var user = "Premendra";
console.log(user);
// user=34;
var user2;
// user2=34;
var user3;
user3 = {
    name: "Premendra",
    age: 37,
    isAdmin: true,
    id: 1,
};
var hobbies;
hobbies = ["Sports", "Study"];
var hobbies2;
function add(a, b) {
    var res = a + b;
    console.log(res);
}
add(1, 2);
function add2(a, b) {
    var res = a + b;
    //   console.log(res);
    return res;
}
add2(7, 7);
function calculate(a, b, calcFn) {
    return calcFn(a, b);
}
var result = calculate(8, 9, add2);
console.log(result);
function calculate2(a, b, calcFn) {
    return calcFn(a, b);
}
var result2 = calculate2(80, 99, add2);
console.log(result2);
