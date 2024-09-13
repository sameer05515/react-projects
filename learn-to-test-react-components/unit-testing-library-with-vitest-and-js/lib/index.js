export const greet = (name) => {
    if (!name || typeof name === "string") {
        return `Hello ${name || "User"}!!`;
    } else {
        throw Error(
            `invalid value provided. value: '${name}', has type: ${typeof name}`
        );
    }
};
