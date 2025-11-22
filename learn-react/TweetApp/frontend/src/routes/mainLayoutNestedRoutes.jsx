import { homeIndexRouteElement } from "./sections/HomeIndexRoute";
import { interviewMgmtRouteTree } from "./sections/InterviewMgmtRoutes";
import { linksMgmtRouteTree } from "./sections/LinksMgmtRoutes";
import { memoryMapsRouteTree } from "./sections/MemoryMapsRoutes";
import { relatedNodesRouteElements } from "./sections/RelatedNodesRoutes";
import { reportsAndTestRouteElements } from "./sections/ReportsAndTestRoutes";
import { tagsMgmtRouteTree } from "./sections/TagsMgmtRoutes";
import { taskMgmtRouteTree } from "./sections/TaskMgmtRoutes";
import { topicMgmtRouteTree } from "./sections/TopicMgmtRoutes";
import { tweetAndOldTaskRouteElements } from "./sections/TweetAndOldTaskRoutes";
import { userResumeSettingsRouteElements } from "./sections/UserResumeSettingsRoutes";
import { wordsAndProfileRouteElements } from "./sections/WordsAndProfileRoutes";

/**
 * Child <Route> nodes for path="/" + <MainLayout />.
 * Returned as an array so we avoid invalid Fragment wrappers under RR6.
 */
export function getMainLayoutNestedRouteElements(isAuthenticated) {
  return [
    homeIndexRouteElement(isAuthenticated),
    ...tweetAndOldTaskRouteElements,
    taskMgmtRouteTree,
    ...userResumeSettingsRouteElements,
    topicMgmtRouteTree,
    ...wordsAndProfileRouteElements,
    interviewMgmtRouteTree,
    linksMgmtRouteTree,
    tagsMgmtRouteTree,
    memoryMapsRouteTree,
    ...relatedNodesRouteElements,
    ...reportsAndTestRouteElements,
  ];
}
