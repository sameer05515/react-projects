const qids = [
  "29a09a46-c308-48e7-8a96-4539926de7d8",
  "edeb6697-ff73-43f6-b5ad-9bf5a4c6196c",
];

const buttonConfig = (() => [
  {
    title: "Go to Home",
    method: "goToHome",
    params: [],
    icon: "FaHome",
  },
  {
    title: "Go To Login",
    method: "goToLogin",
    params: [],
    icon: "FaHome",
  },
  {
    title: "Go Back",
    method: "goBack",
    params: [],
    icon: "FaArrowLeft",
  },
  {
    title: "Go To TestRoute with ID",
    method: "goToTestRoute",
    params: [
      "test-id-no-1",
      {
        data: { linkedQuestionsId: "dummy-linked-question-id" },
        questionName: "dummy question name",
      },
      {
        param: "param-no-1",
      },
      "shaadi-ke-side-effects"
    ],
    icon: "FaArrowLeft",
  },
  {
    title: "Go To TestRoute without ID",
    method: "goToTestRoute",
    params: [],
    icon: "FaArrowLeft",
  },
  {
    title: "Go to Interview Management Base",
    method: "goToInterviewMgmtBase",
    params: [],
    icon: "FaSearch",
  },
  {
    title: "Go To Interview Mgmt Module Search",
    method: "goToInterviewMgmtModuleSearch",
    params: [],
    icon: "FaSearch",
  },
  {
    title: "Go to Invalid Question",
    method: "goToQuestion",
    params: [undefined],
    icon: "FaQuestionCircle",
  },
  {
    title: "Go to Question 2",
    method: "goToQuestion",
    params: [qids[1]],
    icon: "FaQuestionCircle",
  },
  {
    title: `Go to Create Sub Question inside parent question: ${qids[0]}`,
    method: "goToCreateQuestion",
    params: [qids[0]],
    icon: "FaPlus",
  },
  {
    title: "Go to Create Question at root",
    method: "goToCreateQuestion",
    params: [],
    icon: "FaPlus",
  },
])();

export { qids, buttonConfig };
