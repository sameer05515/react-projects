
const { prepareQuestions } = require('./topicQuestionHelper');



// const topics = ["Java", "Spring", "Spring boot"];
// const topics = ["JavaScript"];
// // Example usage
// const tList=[];
// topics.forEach(t => {
//     const gq=prepareQuestions(t);
//     tList.push(gq);
// });

// console.log(JSON.stringify(tList,null,2));

describe("prepareQuestions", () => {
    it("should return an array of length 4", () => {
        const topics = ["JavaScript","Java", "Spring", "Spring boot"];
        // Example usage
        const tList = [];
        topics.forEach(t => {
            const gq = prepareQuestions(t);
            tList.push(gq);
        });

        // console.log(JSON.stringify(tList, null, 2));
        expect(tList.length).not.toBe(1);
        expect(tList.length).toBe(4);
    });

    it("should throw an Error, if null topic passed", () => {
        expect(()=>prepareQuestions(null)).toThrow(Error);
    });

    it("should throw an Error, if undefined topic passed", () => {
        expect(()=>prepareQuestions(undefined)).toThrow(Error);
    });

    it("should throw an Error, if topic is not an string type", () => {
        expect(()=>prepareQuestions(123)).toThrow(Error);
    });
})