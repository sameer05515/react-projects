import { createSearchParams, useNavigate } from "react-router-dom";

export const createSearchParamsString = (params) => {
    return createSearchParams(params).toString();
};

const routes = {
    home: ()=>"/",
    interviewMgmtBase: () => `/interview-mgmt`,
    question: (uniqueId) => `/interview-mgmt/questions/${uniqueId}`,
    createQuestion: (qid) => ({
        pathname: `/interview-mgmt/questions/create`,
        search: qid ? createSearchParamsString({ parent: qid }) : "",
    }),
    // Add more routes as needed
};

// export default routes;

const useNavigation = () => {
    const navigate = useNavigate();

    const goToHome = () => navigate(routes.home());
    const goToInterviewMgmtBase = () => navigate(routes.interviewMgmtBase());
    const goToQuestion = (questionId) => navigate(routes.question(questionId));
    const goToCreateQuestion = (qid) => navigate(routes.createQuestion(qid));
    // Add more methods as needed

    return {
        goToHome,
        goToInterviewMgmtBase,
        goToQuestion,
        goToCreateQuestion,
        // Export more methods as needed
    };
};

// ExampleComponent.js
// import React from "react";
// import useNavigation from "./useNavigation";

const UseNavigationExampleComponent = () => {
    const { goToHome, goToInterviewMgmtBase, goToQuestion, goToCreateQuestion } = useNavigation();

    const qid = "someQuestionId";

    return (
        <div>
            <button onClick={() => goToHome()}>Go to Home</button>
            <button onClick={() => goToInterviewMgmtBase()}>Go to Interview Management base</button>
            <button onClick={() => goToQuestion(1)}>Go to Question 1</button>
            <button onClick={() => goToQuestion(2)}>Go to Question 2</button>
            <button onClick={() => goToCreateQuestion(qid)}>Go to Create Question</button>
        </div>
    );
};

export {UseNavigationExampleComponent};


export default useNavigation;

