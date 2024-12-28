import { createSearchParams } from "react-router-dom";

const createSearchParamsString = (params) => {
  return createSearchParams(params).toString();
};

const prepareObject = (pathname = "", state, search = {}, hash) => ({
  to: {
    pathname: pathname,
    search: search ? createSearchParamsString(search) : "",
    hash,
  },
  options: state
    ? {
        state: state,
      }
    : undefined,
});

const routes = (() => {
  return {
    /** ----- Initial Routes  ---------------------- */

    home: () => prepareObject("/"),
    login: () => prepareObject("/login"),
    testRoute: (id, state, search, hash) =>
      prepareObject(`/test-route/${id}`, state, search, hash),

    /** ----- Notifications Module  ---------------------- */
    notificationsMgmtBase: () => prepareObject("/notifications"),

    /** ----- Apna Playground Module  ---------------------- */
    apnaPlaygroundMgmtBase: () => prepareObject("/apna-playground"),

    /** ----- TWEET MANAGEMENT Module  ---------------------- */

    tweetMgmtBase: () => prepareObject("/tweet-base"),

    /** ----- Task Container Module  ---------------------- */
    taskMgmtModuleBase: () => prepareObject("/task-mgmt"),

    /** ----- User Mgmt Module  ---------------------- */
    userMgmtModuleBase: () => prepareObject("/user-mgmt"),

    /** ----- Resume Mgmt Module  ---------------------- */
    resumeMgmtModuleBase: () => prepareObject("/resume-mgmt"),

    /** ----- My Resume Module  ---------------------- */
    myResumeModuleBase: () => prepareObject("/my-resume"),

    /** ----- Topic Mgmt Module  ---------------------- */
    topicMgmtModuleBase: () => prepareObject("/topic-mgmt"),

    /** ----- Words Module  ---------------------- */
    wordMgmtModuleBase: () => prepareObject("/words"),

    /** ----- Interview Mgmt Module  ---------------------- */

    interviewMgmtBase: () => prepareObject(`/interview-mgmt`),
    interviewMgmtModuleSearch: () => prepareObject(`/interview-mgmt/search`),
    question: (uniqueId) =>
      prepareObject(`/interview-mgmt/questions/${uniqueId}`),
    createQuestion: (qid) =>
      prepareObject(
        `/interview-mgmt/questions/create`,
        undefined,
        qid ? { parent: qid } : undefined
      ),

    /** ----- Links Management Module  ---------------------- */
    linksMgmtModuleBase: () => prepareObject("/links-mgmt"),

    /** ----- Tags Management Module  ---------------------- */
    tagMgmtModuleBase: () => prepareObject("/tags"),

    /** ----- Memory Maps Management Module  ---------------------- */
    memoryMapsModuleBase: () => prepareObject("/memory-maps"),

    /** ----- Node Story- Distorted Style Module  ---------------------- */
    nodeStoryDistortedStyleModuleBase: () => prepareObject("/node-story"),

    /** ----- Node Story V1 Module  ---------------------- */
    nodeStoryV1ModuleBase: () => prepareObject("/node_story_v1"),

    /** ----- Settings Module  ---------------------- */
    settingsModuleBase: () => prepareObject("/settings"),
  };
})();

export default routes;
