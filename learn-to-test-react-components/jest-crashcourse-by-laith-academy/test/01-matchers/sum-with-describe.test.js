const {sum, divide}=require('../../src/01-matchers/sum');

describe("sum", () => {
    it("should add 1 + 2 to equal 3", () => {
        const result = sum(1, 2);
        expect(result).toBe(3);
    });
    it("object assignment with toBe", () => {
        const obj = {};
        expect(obj).not.toBe({});
    });
    it("object assignment with toEqual", () => {
        const obj = {};
        expect(obj).toEqual({});
    });
});

describe("Truthy or falsy", ()=>{
    it("null should be falsy", ()=>{
        const n=null;
        expect(n).toBeFalsy();
    });
    it("null should not be truthy", ()=>{
        const n=null;
        expect(n).not.toBeTruthy();
    });
    it("null to be null", ()=>{
        const n=null;
        expect(n).toBe(null);
    });
    it("null should be equal to null", ()=>{
        const n=null;
        expect(n).toEqual(null);
    });
    it("null should not be undefined", ()=>{
        const n=null;
        expect(n).not.toEqual(undefined);
    });
});

describe("numbers", ()=>{
    it("two plus two",()=>{
        const value= 2+2;
        expect(value).toBe(4);
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(4);
    });

    it("adding floats", ()=>{
        const value= 0.1+0.2;
        expect(value).toBeCloseTo(0.2999999);
    })
});

describe("strings", ()=>{
    it("there is no I in `team`", ()=>{
        expect("team").not.toMatch(/I/);
    })
});

describe("arrays", ()=>{
    const shoppingLists=[
        "diapers", "milk", "frocks"
    ];

    expect(shoppingLists).toContain("milk")
});

describe("exceptions", () => {
    it("2 divided by 0 should throw an error", () => {
        expect(() => divide(2, 0)).toThrow(Error); // To check if it's an instance of Error
        expect(() => divide(2, 0)).toThrow("Cannot divide by zero"); // To check if the message matches
    });
});
