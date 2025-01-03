const isValidNumber = (value) => typeof value === "number" && !isNaN(value);

console.log(isValidNumber(0));