const coversationNames = {
    SAMPLE_CONVERSATIONS1: "/data/sample-conversations1.json",
    SAMPLE_CONVERSATIONS2: "/data/sample-conversations2.json",
    SAMPLE_CONVERSATIONS3: "/data/sample-conversations3.json",
    CONVERSATIONS_09_MAY_2024: "/data/conversations-09-May-2024.json",
    CONVERSATIONS_10_MAY_2024: "/data/conversations-10-May-2024.json",
    CONVERSATIONS_12_MAY_2024: "/data/conversations-12-May-2024.json",
    CONVERSATIONS_24_MAY_2024: "/data/conversations-24-May-2024.json",
    CONVERSATIONS_27_MAY_2024: "/data/conversations-27-May-2024.json",
    CONVERSATIONS_17_JUNE_2024: "/data/conversations-17-June-2024.json",
    CONVERSATIONS_12_JULY_2024: "/data/conversations-12-July-2024.json",
    CONVERSATIONS_15_JULY_2024_NANDINI:
        "/data/conversations_15_July_2024_Nandini.json",
    CONVERSATIONS_20_JULY_2024: "/data/conversations-20-July-2024.json",
    CONVERSATIONS_15_Aug_2024: "/data/conversations-15-Aug-2024.json",
    CONVERSATIONS_18_Aug_2024: "/data/conversations-18-Aug-2024.json",
    CONVERSATIONS_19_Aug_2024: "/data/conversations-19-Aug-2024.json",
    CONVERSATIONS_25_Aug_2024: "/data/conversations-25-Aug-2024.json",
    CONVERSATIONS_30_Aug_2024: "/data/conversations-30-Aug-2024.json",
    CONVERSATIONS_06_SEP_2024: "/data/conversations-06-Sep-2024.json",
    CONVERSATIONS_24_SEP_2024: "/data/conversations-24-Sep-2024.json",
    CONVERSATIONS_23_OCT_2024: "/data/conversations-23-Oct-2024.json",
};

const LATEST_CONVERSATION_FILE =
    coversationNames.CONVERSATIONS_24_SEP_2024;

function parseDateFromString(dateStr) {
    // Split the string by the hyphen
    const [day, month, year] = dateStr.split('-').map(Number);

    // JavaScript's Date object uses 0-indexed months, so subtract 1 from month
    return new Date(year, month - 1, day);
}

// export const CGPTFileNames = [
//     {
//         name: "SAMPLE_CONVERSATIONS1",
//         location: "/data/sample-conversations1.json",
//         createdDate: parseDateFromString("01-05-2024")
//     },
//     {
//         name: "SAMPLE_CONVERSATIONS2",
//         location: "/data/sample-conversations2.json",
//         createdDate: parseDateFromString("05-05-2024")
//     },
//     {
//         name: "SAMPLE_CONVERSATIONS3",
//         location: "/data/sample-conversations3.json",
//         createdDate: parseDateFromString("06-05-2024")
//     },
//     {
//         name: "CONVERSATIONS_09_MAY_2024",
//         location: "/data/conversations-09-May-2024.json",
//         createdDate: parseDateFromString("09-05-2024")
//     }
// ]


const CGPTFileNames = [
    {
        name: "SAMPLE_CONVERSATIONS1",
        location: "/data/sample-conversations1.json",
        createdDate: parseDateFromString("01-05-2024"),
        isLatest: false
    },
    {
        name: "SAMPLE_CONVERSATIONS2",
        location: "/data/sample-conversations2.json",
        createdDate: parseDateFromString("05-05-2024"),
        isLatest: false
    },
    {
        name: "SAMPLE_CONVERSATIONS3",
        location: "/data/sample-conversations3.json",
        createdDate: parseDateFromString("06-05-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_09_MAY_2024",
        location: "/data/conversations-09-May-2024.json",
        createdDate: parseDateFromString("09-05-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_10_MAY_2024",
        location: "/data/conversations-10-May-2024.json",
        createdDate: parseDateFromString("10-05-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_12_MAY_2024",
        location: "/data/conversations-12-May-2024.json",
        createdDate: parseDateFromString("12-05-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_24_MAY_2024",
        location: "/data/conversations-24-May-2024.json",
        createdDate: parseDateFromString("24-05-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_27_MAY_2024",
        location: "/data/conversations-27-May-2024.json",
        createdDate: parseDateFromString("27-05-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_17_JUNE_2024",
        location: "/data/conversations-17-June-2024.json",
        createdDate: parseDateFromString("17-06-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_12_JULY_2024",
        location: "/data/conversations-12-July-2024.json",
        createdDate: parseDateFromString("12-07-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_15_JULY_2024_NANDINI",
        location: "/data/conversations_15_July_2024_Nandini.json",
        createdDate: parseDateFromString("15-07-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_20_JULY_2024",
        location: "/data/conversations-20-July-2024.json",
        createdDate: parseDateFromString("20-07-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_15_AUG_2024",
        location: "/data/conversations-15-Aug-2024.json",
        createdDate: parseDateFromString("15-08-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_18_AUG_2024",
        location: "/data/conversations-18-Aug-2024.json",
        createdDate: parseDateFromString("18-08-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_19_AUG_2024",
        location: "/data/conversations-19-Aug-2024.json",
        createdDate: parseDateFromString("19-08-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_25_AUG_2024",
        location: "/data/conversations-25-Aug-2024.json",
        createdDate: parseDateFromString("25-08-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_30_AUG_2024",
        location: "/data/conversations-30-Aug-2024.json",
        createdDate: parseDateFromString("30-08-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_06_SEP_2024",
        location: "/data/conversations-06-Sep-2024.json",
        createdDate: parseDateFromString("06-09-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_24_SEP_2024",
        location: "/data/conversations-24-Sep-2024.json",
        createdDate: parseDateFromString("24-09-2024"),
        isLatest: false
    },
    {
        name: "CONVERSATIONS_23_OCT_2024",
        location:"/data/conversations-23-Oct-2024.json",
        createdDate: parseDateFromString("23-10-2024"),
        isLatest: true
    }
];




module.exports = { CGPTFileNames, parseDateFromString, LATEST_CONVERSATION_FILE };
