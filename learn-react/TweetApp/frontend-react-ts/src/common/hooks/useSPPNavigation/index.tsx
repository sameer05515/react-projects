import { useNavigate } from "react-router-dom";
import routes from "./util";

const useSPPNavigation = () => {
  const navigate = useNavigate();

  const goTo = ({ to, options }) => {
    if (!to || !to.pathname) {
      console.error("Invalid navigation target:", to);
      return;
    }
    console.log("Navigating to:", to, "with options:", options);
    navigate(to, options); // Navigate to the specified path
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const goToHome = () => {
    goTo(routes.home());
  };
  const goToLogin = () => {
    goTo(routes.login());
  };

  const goToTestRoute = (id, state, search, hash) => {
    goTo(routes.testRoute(id, state, search, hash));
  };

  const goToInterviewMgmtBase = () => {
    goTo(routes.interviewMgmtBase());
  };
  const goToInterviewMgmtModuleSearch = () =>
    goTo(routes.interviewMgmtModuleSearch());
  const goToQuestion = (questionId) => {
    if (!questionId) {
      console.error(
        `Question ID is required to navigate to a question. Provided id is: '${questionId}'`
      );
      return;
    }
    goTo(routes.question(questionId));
  };
  const goToCreateQuestion = (parentQuestionId) =>
    goTo(routes.createQuestion(parentQuestionId));
  // Add more methods as needed

  return {
    goToHome,
    goToLogin,
    goBack,
    goToTestRoute,
    goToInterviewMgmtBase,
    goToInterviewMgmtModuleSearch,
    goToQuestion,
    goToCreateQuestion,
  };
};

export default useSPPNavigation;
