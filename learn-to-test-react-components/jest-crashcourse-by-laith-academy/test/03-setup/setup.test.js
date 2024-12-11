const initialState = ['elephant', 'zebra', 'bear', 'tiger'];


describe("animals array", () => {

    let animals = [];

    beforeAll(() => {
        console.log('BEFORE ALL: Do some startup operation.');
    })

    beforeEach(() => {
        console.log('BEFORE EACH TEST: Reseting animals to initial state.');
        animals = [...initialState];
    });

    afterEach(() => {
        console.log('AFTER EACH TEST: Do cleanup.');

    });

    afterAll(() => {
        console.log('AFTER ALL: Do cleanup before exiting the suite.');
    });

    it("should add animals to end of array", () => {
        animals.push("aligator");
        expect(animals[animals.length - 1]).toBe('aligator');
    });

    it("should add animals to begining of array", () => {
        animals.unshift("lion");
        expect(animals[0]).toBe('lion');
    });

    it("should have initial length of 4", () => {
        expect(animals.length).toBe(4);
    });
});

describe("testing something else", () => {
    // it.only("should not execute the setup and teardown operations. {i.e. beforeAll, beforeEach, afterEach, afterAll}", () => {
    //     expect(true).toBeTruthy();
    // });

    it("should not execute the setup and teardown operations. {i.e. beforeAll, beforeEach, afterEach, afterAll}", () => {
        expect(true).toBeTruthy();
    })
})