export const sum = (a, b) => {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error(
            `Only integers should be passed: types of ${a}: ${typeof a}, types of ${b}: ${typeof b},`
        );
    }
    return a + b;
};

export const subtract = (a, b) => {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error(
            `Only integers should be passed: types of ${a}: ${typeof a}, types of ${b}: ${typeof b},`
        );
    }
    return a - b;
};

export const divide = (a, b) => {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error(
            `Only integers should be passed: types of ${a}: ${typeof a}, types of ${b}: ${typeof b},`
        );
    }
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}
