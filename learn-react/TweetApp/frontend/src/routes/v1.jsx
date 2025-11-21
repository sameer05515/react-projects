import React, { useCallback, lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import GlobalBreadcrumbV2 from "../common/components/global-breadcrumbs/GlobalBreadcrumbV2";
import ToggleableIcon from "../common/components/toggleable-icon/ToggleableIcon";
import LoadingSpinner from "../common/components/LoadingSpinner";
import { fetchPinnedItems } from "../redux/slices/pinnedItemSlice";

// Critical components loaded synchronously (needed immediately)
import Welcome from "./Welcome/v2";
import LoginUser from "./login/LoginUser";
import Registration from "./login/Registration";
import Notifications from "./Notifications/v1";

// Lazy load all route components for code splitting
const ApnaPlaygroundBase = lazy(() => import("../ApnaPlayground/v1"));
const TestRouterPage = lazy(() => import("../ApnaPlayground/navigation-utils-examples/TestRouterPage"));
const InterviewMgmtBase = lazy(() => import("../components/interview-mgmt/InterviewMgmtBase"));
const CategoryList = lazy(() => import("../components/interview-mgmt/sub-components/CategoryListRouterPage"));
const CreateAnswer = lazy(() => import("../components/interview-mgmt/sub-components/CreateAnswerRouterPage"));
const CreateQuestion = lazy(() => import("../components/interview-mgmt/sub-components/CreateQuestionRouterPage"));
const EditAnswer = lazy(() => import("../components/interview-mgmt/sub-components/EditAnswerRouterPage"));
const EditQuestion = lazy(() => import("../components/interview-mgmt/sub-components/EditQuestionRouterPage"));
const MoveQuestionToAnotherParentQuestion = lazy(() => import("../components/interview-mgmt/sub-components/MoveQuestionToAnotherParentQuestionRouterPage"));
const SearchInterviewMgmtRouterPage = lazy(() => import("../components/interview-mgmt/sub-components/SearchInterviewMgmtRouterPage"));
const ViewQuestionDetails = lazy(() => import("../components/interview-mgmt/sub-components/ViewQuestionDetailsRouterPage"));
const LinksBase = lazy(() => import("../components/links/LinksBase").then(module => ({ default: module.default })));
const CreateLink = lazy(() => import("../components/links/LinksBase").then(module => ({ default: module.CreateLink })));
const EditLink = lazy(() => import("../components/links/LinksBase").then(module => ({ default: module.EditLink })));
const ViewLink = lazy(() => import("../components/links/LinksBase").then(module => ({ default: module.ViewLink })));
const UserDashboard = lazy(() => import("./login/UserDashboard"));
const AddUpdateSkeletonForMemoryMapItem = lazy(() => import("../components/memory-maps/AddUpdateSkeleton").then(module => ({ default: module.AddUpdateSkeletonForMemoryMapItem })));
const AddUpdateSkeletonUsingTreeEditorForMemoryMapItem = lazy(() => import("../components/memory-maps/AddUpdateSkeletonUsingTreeEditor").then(module => ({ default: module.AddUpdateSkeletonUsingTreeEditorForMemoryMapItem })));
const CreateMemoryMapItem = lazy(() => import("../components/memory-maps/CreateUpdateMemoryMapItemRouterPage").then(module => ({ default: module.CreateMemoryMapItem })));
const EditMemoryMapItem = lazy(() => import("../components/memory-maps/CreateUpdateMemoryMapItemRouterPage").then(module => ({ default: module.EditMemoryMapItem })));
const MemoryMapBase = lazy(() => import("../components/memory-maps/MemoryMapBase"));
const MemoryMapList = lazy(() => import("../components/memory-maps/list/MemoryMapListRouterPage").then(module => ({ default: module.MemoryMapList })));
const MyResumeComponent = lazy(() => import("../components/my-resume/MyResumeComponent"));
const TaskBase = lazy(() => import("../components/my-tasks/TaskBase"));
const AddSubTaskRouterPage = lazy(() => import("../components/my-tasks/sub-components/common/AddSubTaskRouterPage"));
const CreateTaskRouterPage = lazy(() => import("../components/my-tasks/sub-components/common/CreateTaskRouterPage"));
const EditTaskRouterPage = lazy(() => import("../components/my-tasks/sub-components/common/EditTaskRouterPage"));
const ViewTaskRouterPage = lazy(() => import("../components/my-tasks/sub-components/common/ViewTaskRouterPage"));
const OldTasksBase = lazy(() => import("../components/old-tasks-mgmt/OldTasksBase"));
const RelatedNodesBase = lazy(() => import("../components/related-nodes/RelatedNodesBase"));
const CreateRelatedNodeItem = lazy(() => import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage").then(module => ({ default: module.CreateRelatedNodeItem })));
const CreateRelation = lazy(() => import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage").then(module => ({ default: module.CreateRelation })));
const EditRelatedNodeItem = lazy(() => import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage").then(module => ({ default: module.EditRelatedNodeItem })));
const EditRelation = lazy(() => import("../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage").then(module => ({ default: module.EditRelation })));
const RelatedNodesBaseV1 = lazy(() => import("../components/related-nodes/v1/RelatedNodesBaseV1"));
const ViewNode = lazy(() => import("../components/related-nodes/v1/sub-components/ViewNode"));
const ResumeForm = lazy(() => import("../components/resume/ResumeForm"));
const TagBase = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.default })));
const AddSubTagComp = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.AddSubTagComp })));
const CreateTag = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.CreateTag })));
const EditTag = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.EditTag })));
const MoveToAnotherTagParent = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.MoveToAnotherTagParent })));
const SearchTagRouterPage = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.SearchTagRouterPage })));
const ViewTag = lazy(() => import("../components/tags/TagBase").then(module => ({ default: module.ViewTag })));
const TopicBase = lazy(() => import("../components/topic/TopicBase"));
const AddSubTopicComp = lazy(() => import("../components/topic/sub-components/common/AddSubTopicRouterPage"));
const CreateSectionRouterPage = lazy(() => import("../components/topic/sub-components/common/CreateSectionRouterPage"));
const CreateTopicComp = lazy(() => import("../components/topic/sub-components/common/CreateTopicRouterPage"));
const EditSectionRouterPage = lazy(() => import("../components/topic/sub-components/common/EditSectionRouterPage"));
const EditTopicComp = lazy(() => import("../components/topic/sub-components/common/EditTopicRouterPage"));
const MoveToAnotherTopicParent = lazy(() => import("../components/topic/sub-components/common/MoveToAnotherTopicParentRouterPage"));
const SearchTopicRouterPage = lazy(() => import("../components/topic/sub-components/common/SearchRouterPage"));
const TwoNodeComponentV53 = lazy(() => import("../components/topic/sub-components/common/TwoNodeComponentV5.3"));
const ViewTopic = lazy(() => import("../components/topic/sub-components/common/ViewTopicRouterPage"));
const TweetBase = lazy(() => import("../components/tweets/TweetBase"));
const WordList = lazy(() => import("../components/words/WordList"));
const ToDoBase = lazy(() => import("../components/my-reports/MyReportsBase"));

const SPPAppRoutes = ({ isAuthenticated = false, handleLogin = () => {} }) => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
        {/**
         * ----- Apna Playground ----------------------------
         * Test route- for arbitrary testing from scratch
         *
         * */}
        <Route path="/apna-playground" element={<ApnaPlaygroundBase />} />

        {/* Use the Layout component for the routes that need a breadcrumb */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              !isAuthenticated ? (
                <>
                  <Navigate to="/login" />
                </>
              ) : (
                <>                  
                  <Welcome />
                  {/* <HorizontalMenu
                    isAuthenticated={isAuthenticated}
                    handleLogout={handleLogout}
                  /> */}
                </>
              )
            }
          />

          {/** ----- TWEET MANAGEMENT ---------------------- */}

          <Route path="/tweet-base" element={<TweetBase />} />

          {/** ----- OLD TASK MANAGEMENT ---------------------- */}
          <Route path="/old-task-mgmt" element={<OldTasksBase />} />

          {/** ----- TASK MANAGEMENT ---------------------- */}

          <Route path="/task-mgmt" element={<TaskBase />}>
            <Route path=":id/edit" element={<EditTaskRouterPage />} />
            <Route path=":id/add-sub-task" element={<AddSubTaskRouterPage />} />
            <Route path=":id" element={<ViewTaskRouterPage />} />
            <Route path="create" element={<CreateTaskRouterPage />} />
          </Route>

          {/** ----- USER MANAGEMENT ---------------------- */}

          <Route path="/user-mgmt" element={<UserDashboard />} />

          {/** ----- RESUME MANAGEMENT ---------------------- */}

          <Route path="/resume-mgmt" element={<ResumeForm />} />

          {/** ----- SETTINGS MANAGEMENT ---------------------- */}
          {/* Settings dashboard has been moved to ApnaPlayground */}

          {/** ----- TOPICS MANAGEMENT ---------------------- */}

          <Route path="/topic-mgmt" element={<TopicBase />}>
            <Route path=":id/edit" element={<EditTopicComp />} />
            <Route path=":id" element={<ViewTopic />} />
            <Route path=":id/add-sub-topic" element={<AddSubTopicComp />} />
            <Route
              path=":id/move-parent"
              element={<MoveToAnotherTopicParent />}
            />
            <Route
              path=":id/add-section"
              element={<CreateSectionRouterPage />}
            />
            <Route
              path=":id/section/:sectionId/edit"
              element={<EditSectionRouterPage />}
            />
            <Route path="create" element={<CreateTopicComp />} />
            <Route path="search" element={<SearchTopicRouterPage />} />
            <Route path="two-nodes" element={<TwoNodeComponentV53 />} />
          </Route>

          {/** ----- WORD-MEANING MANAGEMENT ---------------------- */}

          <Route path="/words" element={<WordList />} />

          {/** ----- MY RESUME  ---------------------- */}

          <Route
            path="/my-resume"
            element={<MyResumeComponent uniqueId="john_doe_resume" />}
          />

          {/** ----- INTERVIEW MANAGEMENT ---------------------- */}

          <Route path="/interview-mgmt" element={<InterviewMgmtBase />}>
            <Route index element={<CategoryList />} />
            {/* <Route path=":id/edit" element={<EditCategory />} />
            <Route path=":id" element={<ViewCategoryDetails />}></Route> */}

            {/* <Route path=":id/add-sub-categoty" element={<AddSubTagComp />} /> */}
            {/* <Route
              path=":id/move-parent"
              element={<MoveToAnotherCategoryParent />}
            />
            <Route
              path=":id/questions/:qid/move-to-another-category"
              element={<MoveQuestionToAnotherCategory />}
            /> */}

            <Route path="questions/create" element={<CreateQuestion />} />

            <Route path="questions/:qid" element={<ViewQuestionDetails />} />

            <Route
              path="questions/:qid/move-parent"
              element={<MoveQuestionToAnotherParentQuestion />}
            />

            <Route path="questions/:qid/edit" element={<EditQuestion />} />

            <Route
              path="questions/:qid/answers/create"
              element={<CreateAnswer />}
            />
            <Route
              path="questions/:qid/answers/:aid/edit"
              element={<EditAnswer />}
            />
            <Route path="search" element={<SearchInterviewMgmtRouterPage />} />
            {/* <Route path="create" element={<CreateCategory />} /> */}
          </Route>

          {/** ----- LINKS MANAGEMENT ---------------------- */}

          <Route path="/links-mgmt" element={<LinksBase />}>
            <Route path=":id/edit" element={<EditLink />} />
            <Route path=":id" element={<ViewLink />} />
            <Route path="create" element={<CreateLink />} />

            {/* <Route path=":id/add-child" element={<AddChildLink/>}/> */}
          </Route>

          {/** ----- TAGS MANAGEMENT ---------------------- */}

          <Route path="/tags" element={<TagBase />}>
            <Route path=":id/edit" element={<EditTag />} />
            <Route path=":id" element={<ViewTag />} />
            <Route path="create" element={<CreateTag />} />
            <Route path="search" element={<SearchTagRouterPage />} />
            <Route path=":id/add-sub-tag" element={<AddSubTagComp />} />
            <Route
              path=":id/move-parent"
              element={<MoveToAnotherTagParent />}
            />
            {/* <Route path=":id/add-child" element={<AddChildLink/>}/> */}
          </Route>

          {/** ----- MEMORY MAPS MANAGEMENT ---------------------- */}

          <Route path="/memory-maps" element={<MemoryMapBase />}>
            <Route index element={<MemoryMapList />} />
            <Route path=":id" element={<MemoryMapList />} />
            <Route path="create" element={<CreateMemoryMapItem />} />
            <Route path=":id/edit" element={<EditMemoryMapItem />} />
            <Route
              path=":id/edit/append-skeleton"
              element={<AddUpdateSkeletonForMemoryMapItem />}
            />
            <Route
              path=":id/edit/append-skeleton-v2"
              element={<AddUpdateSkeletonUsingTreeEditorForMemoryMapItem />}
            />
          </Route>

          {/** ----- NODE STORY OLD ---------------------- */}

          <Route path="/node-story" element={<RelatedNodesBase />}>
            <Route path="create" element={<CreateRelatedNodeItem />} />
            <Route path=":id/edit" element={<EditRelatedNodeItem />} />
            <Route path=":id/create-relation" element={<CreateRelation />} />
            <Route path=":id/edit-relation" element={<EditRelation />} />
          </Route>

          {/** ----- NODE STORY V1 ---------------------- */}

          <Route path="/node_story_v1" element={<RelatedNodesBaseV1 />}>
            <Route path=":id" element={<ViewNode />} />
          </Route>

          {/** Todo Application*/}
          <Route path="/my-reports" element={<ToDoBase/>}/>

          {/** ----- Testing Route: For useSPPNavigation hook testing ---------------------------- */}
          <Route path="/test-route" element={<TestRouterPage />} />
        </Route>

        {/** ----- LOGIN/ LOGOUT ---------------------- */}

        <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/notifications" element={<Notifications />} />

        {/** ----- NOT FOUND ---------------------- */}

        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-red-600">404 Not Found</h1>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">Oops! Page not found.</p>
    </div>
  );
};

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  // Load pinned items only on home page (used globally across routes)
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(fetchPinnedItems());
    }
  }, [dispatch, location.pathname]);
  return (
    <>
      <div
        className={`relative pl-6 pt-1 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        {/* Breadcrumb component at the top */}
        <div className="absolute top-2.5 right-2.5 cursor-pointer">
          <ToggleableIcon
            label={"Dark Mode"}
            isContentVisible={isDarkMode}
            toggleSymbols={{
              showSymbol: "Lite Mode",
              hideSymbol: "Dark mode",
            }}
            onToggle={() => toggleMode()}
          />
        </div>
        <GlobalBreadcrumbV2 />
        <div>
          <Outlet /> {/* Render the child routes */}
        </div>
      </div>
    </>
  );
};

export default SPPAppRoutes;
