
const {prepareQuestions} = require('./topicQuestionHelper');

// Example usage
// const inputString = "What is the definition of this #topic#?";
// const replacedString = replaceTopic(inputString, "JavaScript programming language");
// console.log(replacedString); // Output: What is the definition of this "JavaScript programming language"?

// const topics = ["Java", "Spring", "Spring boot"];
const topics = ["JavaScript"];
// Example usage
// prepareQuestions("JavaScript");
const tList=[];
topics.forEach(t => {
    const gq=prepareQuestions(t);
    tList.push(gq);
});

console.log(JSON.stringify(tList,null,2))