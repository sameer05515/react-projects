export const formatDateToDDMMMYYYY = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatDateToDDMMMYYYYWithTime = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


// questions preparation start
function replaceTopic(input, replacement) {
    if (input === null || replacement === null) {
        return null;
    }
    return input.replace(/#topic#/g, `"${replacement}"`);
}

function prepareWhs() {
    return [
        {
            name: "What",
            questions: [
                "What is the definition of this #topic#? or What is #topic#?",
                "What are the key components or concepts within this #topic#?",
                "What are the primary uses or applications of this #topic#?",
                "What are the main challenges or issues associated with this #topic#?",
                "What are alternatives of #topic#?",
                "What is a workaround, if I choose not to use this #topic#?"
            ]
        },
        {
            name: "Why",
            questions: [
                "Why is this #topic# important or relevant?",
                "Why are certain methods or approaches used within this #topic#?",
                "Why does this #topic# matter in the broader context of the field?",
                "Why did certain versions introduce specific changes or features?",
                "Why are certain buzzwords popular in the context of this #topic#?"
            ]
        },
        {
            name: "Who",
            questions: [
                "Who are the main contributors or experts in this field?",
                "Who can benefit from understanding this #topic#?",
                "Who are the primary stakeholders involved in this #topic#?",
                "Who were the key developers or organizations behind each major version?",
                "Who coined or popularized the buzzwords associated with this #topic#?"
            ]
        },
        {
            name: "When",
            questions: [
                "When did this #topic# emerge or become significant?",
                "When are the critical moments or milestones in the development of this #topic#?",
                "When should certain approaches or methods be applied within this #topic#?",
                "When were the significant versions or updates released for #topic#?",
                "When did #topic# become popular?"
            ]
        },
        {
            name: "Where",
            questions: [
                "Where is this #topic# most relevant or commonly applied?",
                "Where can you find resources or further information on this #topic#?",
                "Where are the key research institutions or companies working on this #topic#?",
                "Where can you find the changelogs or release notes for the different versions?",
                "Where are the discussions or forums where these buzzwords are frequently used?"
            ]
        },
        {
            name: "How",
            questions: [
                "How does this #topic# work in practice?",
                "How can you apply the concepts of this #topic# to real-world scenarios?",
                "How has this #topic# evolved over time?",
                "How do the features or functionalities differ between versions?",
                "How do the buzzwords relate to the underlying concepts or technologies in this #topic#?"
            ]
        },
        {
            name: "Which",
            questions: [
                "Which version is most stable or recommended for use?",
                "Which buzzwords should you be aware of to stay current in the field?"
            ]
        },
        {
            name: "What if",
            questions: [
                "What if you need to migrate from one version to another?",
                "What if the buzzword is just a hype and lacks substantial backing?"
            ]
        },
        {
            name: "What are",
            questions: [
                "What are the backward compatibility considerations for each version?",
                "What are the misconceptions or myths around the buzzwords in this #topic#?"
            ]
        },
        {
            name: "How has",
            questions: [
                "How has the community or market response been to different versions?",
                "How has the usage of buzzwords evolved over time in this #topic#?"
            ]
        },
        {
            name: "miscellaneous",
            questions: [
                
            ]
        }
    ];
}

export function prepareQuestions(t) {
    const groupQList = prepareWhs();
    // console.log("========================== " + t + " =======");
    const gqArr = [];
    groupQList.forEach(group => {
        const gq = { name: "", questions: [] };
        gq.name = group.name;
        // console.log(group.name);
        group.questions.forEach(question => {
            const gqt = replaceTopic(question, t);
            gq.questions.push(gqt);            
            // console.log("\t" + gqt);
        });
        gqArr.push(gq);
    });
    return gqArr;
}

// questions preparation end
