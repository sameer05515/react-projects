import { lazy } from "react";

/**
 * Lazy-load a named export from a module (for files that export multiple components).
 * @param {() => Promise<Record<string, unknown>>} moduleImport
 * @param {string} exportName
 */
export function lazyNamed(moduleImport, exportName) {
  return lazy(() =>
    moduleImport().then((m) => ({ default: m[exportName] }))
  );
}

export const ApnaPlaygroundBase = lazy(() => import("../ApnaPlayground/v1"));
export const TestRouterPage = lazy(() =>
  import("../ApnaPlayground/navigation-utils-examples/TestRouterPage")
);
export const InterviewMgmtBase = lazy(() =>
  import("../components/interview-mgmt/InterviewMgmtBase")
);
export const CategoryList = lazy(() =>
  import("../components/interview-mgmt/sub-components/CategoryListRouterPage")
);
export const CreateAnswer = lazy(() =>
  import("../components/interview-mgmt/sub-components/CreateAnswerRouterPage")
);
export const CreateQuestion = lazy(() =>
  import("../components/interview-mgmt/sub-components/CreateQuestionRouterPage")
);
export const EditAnswer = lazy(() =>
  import("../components/interview-mgmt/sub-components/EditAnswerRouterPage")
);
export const EditQuestion = lazy(() =>
  import("../components/interview-mgmt/sub-components/EditQuestionRouterPage")
);
export const MoveQuestionToAnotherParentQuestion = lazy(() =>
  import(
    "../components/interview-mgmt/sub-components/MoveQuestionToAnotherParentQuestionRouterPage"
  )
);
export const SearchInterviewMgmtRouterPage = lazy(() =>
  import("../components/interview-mgmt/sub-components/SearchInterviewMgmtRouterPage")
);
export const ViewQuestionDetails = lazy(() =>
  import("../components/interview-mgmt/sub-components/ViewQuestionDetailsRouterPage")
);

export const LinksBase = lazyNamed(() => import("../components/links/LinksBase"), "default");
export const CreateLink = lazyNamed(() => import("../components/links/LinksBase"), "CreateLink");
export const EditLink = lazyNamed(() => import("../components/links/LinksBase"), "EditLink");
export const ViewLink = lazyNamed(() => import("../components/links/LinksBase"), "ViewLink");

export const UserDashboard = lazy(() => import("./login/UserDashboard"));
export const AddUpdateSkeletonForMemoryMapItem = lazyNamed(
  () => import("../components/memory-maps/AddUpdateSkeleton"),
  "AddUpdateSkeletonForMemoryMapItem"
);
export const AddUpdateSkeletonUsingTreeEditorForMemoryMapItem = lazyNamed(
  () => import("../components/memory-maps/AddUpdateSkeletonUsingTreeEditor"),
  "AddUpdateSkeletonUsingTreeEditorForMemoryMapItem"
);
export const CreateMemoryMapItem = lazyNamed(
  () => import("../components/memory-maps/CreateUpdateMemoryMapItemRouterPage"),
  "CreateMemoryMapItem"
);
export const EditMemoryMapItem = lazyNamed(
  () => import("../components/memory-maps/CreateUpdateMemoryMapItemRouterPage"),
  "EditMemoryMapItem"
);
export const MemoryMapBase = lazy(() => import("../components/memory-maps/MemoryMapBase"));
export const MemoryMapList = lazyNamed(
  () => import("../components/memory-maps/list/MemoryMapListRouterPage"),
  "MemoryMapList"
);

export const MyResumeComponent = lazy(() => import("../components/my-resume/MyResumeComponent"));
export const TaskBase = lazy(() => import("../components/my-tasks/TaskBase"));
export const AddSubTaskRouterPage = lazy(() =>
  import("../components/my-tasks/sub-components/common/AddSubTaskRouterPage")
);
export const CreateTaskRouterPage = lazy(() =>
  import("../components/my-tasks/sub-components/common/CreateTaskRouterPage")
);
export const EditTaskRouterPage = lazy(() =>
  import("../components/my-tasks/sub-components/common/EditTaskRouterPage")
);
export const ViewTaskRouterPage = lazy(() =>
  import("../components/my-tasks/sub-components/common/ViewTaskRouterPage")
);

export const OldTasksBase = lazy(() => import("../components/old-tasks-mgmt/OldTasksBase"));
export const RelatedNodesBase = lazy(() =>
  import("../components/related-nodes/RelatedNodesBase")
);
export const CreateRelatedNodeItem = lazyNamed(
  () =>
    import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage"),
  "CreateRelatedNodeItem"
);
export const CreateRelation = lazyNamed(
  () =>
    import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage"),
  "CreateRelation"
);
export const EditRelatedNodeItem = lazyNamed(
  () =>
    import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage"),
  "EditRelatedNodeItem"
);
export const EditRelation = lazyNamed(
  () =>
    import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage"),
  "EditRelation"
);
export const RelatedNodesBaseV1 = lazy(() =>
  import("../components/related-nodes/v1/RelatedNodesBaseV1")
);
export const ViewNode = lazy(() =>
  import("../components/related-nodes/v1/sub-components/ViewNode")
);

export const ResumeForm = lazy(() => import("../components/resume/ResumeForm"));

export const TagBase = lazyNamed(() => import("../components/tags/TagBase"), "default");
export const AddSubTagComp = lazyNamed(() => import("../components/tags/TagBase"), "AddSubTagComp");
export const CreateTag = lazyNamed(() => import("../components/tags/TagBase"), "CreateTag");
export const EditTag = lazyNamed(() => import("../components/tags/TagBase"), "EditTag");
export const MoveToAnotherTagParent = lazyNamed(
  () => import("../components/tags/TagBase"),
  "MoveToAnotherTagParent"
);
export const SearchTagRouterPage = lazyNamed(
  () => import("../components/tags/TagBase"),
  "SearchTagRouterPage"
);
export const ViewTag = lazyNamed(() => import("../components/tags/TagBase"), "ViewTag");

export const TopicBase = lazy(() => import("../components/topic/TopicBase"));
export const AddSubTopicComp = lazy(() =>
  import("../components/topic/sub-components/common/AddSubTopicRouterPage")
);
export const CreateSectionRouterPage = lazy(() =>
  import("../components/topic/sub-components/common/CreateSectionRouterPage")
);
export const CreateTopicComp = lazy(() =>
  import("../components/topic/sub-components/common/CreateTopicRouterPage")
);
export const CreateTopicBulkComp = lazy(() =>
  import("../components/topic/sub-components/common/CreateTopicBulkRouterPage")
);
export const EditSectionRouterPage = lazy(() =>
  import("../components/topic/sub-components/common/EditSectionRouterPage")
);
export const EditTopicComp = lazy(() =>
  import("../components/topic/sub-components/common/EditTopicRouterPage")
);
export const MoveToAnotherTopicParent = lazy(() =>
  import("../components/topic/sub-components/common/MoveToAnotherTopicParentRouterPage")
);
export const SearchTopicRouterPage = lazy(() =>
  import("../components/topic/sub-components/common/SearchRouterPage")
);
export const TwoNodeComponentV53 = lazy(() =>
  import("../components/topic/sub-components/common/TwoNodeComponentV5.3")
);
export const ViewTopic = lazy(() =>
  import("../components/topic/sub-components/common/ViewTopicRouterPage")
);
export const PublishedTopicsPage = lazy(() =>
  import("../components/topic/sub-components/common/PublishedTopicsPage")
);
export const TopicBaseWiki = lazy(() =>
  import("../components/topic/sub-components/TopicBaseWiki")
);

export const TweetBase = lazy(() => import("../components/tweets/TweetBase"));
export const WordList = lazy(() => import("../components/words/WordList"));
export const ToDoBase = lazy(() => import("../components/my-reports/MyReportsBase"));
export const SettingsBase = lazy(() => import("../components/settings/SettingsBase"));
