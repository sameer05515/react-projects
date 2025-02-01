const obj = {
    value: 10,
    regularFn: function () {
        return function () {
            return this.value; // Undefined since this refers to the global object
        };
    },
    arrowFn: function () {
        return () => this.value; // Lexically inherits this from obj
    },
};

console.log(obj.regularFn()()); // undefined
console.log(obj.arrowFn()()); // 10

const totalPages=5;
const currentPage=2;
const pages = Array.from({ length: totalPages }, (_, i) => currentPage + i + 1);

console.log(pages);