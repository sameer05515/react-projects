import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Notifications from "./Notifications/v1";
import Welcome from "./Welcome/v2";
import GlobalBreadcrumbV2 from "../common/components/global-breadcrumbs/GlobalBreadcrumbV2";
import ToggleableIcon from "../common/components/toggleable-icon/ToggleableIcon";
import ApnaPlaygroundBase from "../ApnaPlayground/v1";
import TestRouterPage from "../ApnaPlayground/navigation-utils-examples/TestRouterPage";
import InterviewMgmtBase from "../components/interview-mgmt/InterviewMgmtBase";
import CategoryList from "../components/interview-mgmt/sub-components/CategoryListRouterPage";
import CreateAnswer from "../components/interview-mgmt/sub-components/CreateAnswerRouterPage";
import CreateQuestion from "../components/interview-mgmt/sub-components/CreateQuestionRouterPage";
import EditAnswer from "../components/interview-mgmt/sub-components/EditAnswerRouterPage";
import EditQuestion from "../components/interview-mgmt/sub-components/EditQuestionRouterPage";
import MoveQuestionToAnotherParentQuestion from "../components/interview-mgmt/sub-components/MoveQuestionToAnotherParentQuestionRouterPage";
import SearchInterviewMgmtRouterPage from "../components/interview-mgmt/sub-components/SearchInterviewMgmtRouterPage";
import ViewQuestionDetails from "../components/interview-mgmt/sub-components/ViewQuestionDetailsRouterPage";
import LinksBase, {
  CreateLink,
  EditLink,
  ViewLink,
} from "../components/links/LinksBase";
import LoginUser from "./login/LoginUser";
import Registration from "./login/Registration";
import UserDashboard from "./login/UserDashboard";
import { AddUpdateSkeletonForMemoryMapItem } from "../components/memory-maps/AddUpdateSkeleton";
import { AddUpdateSkeletonUsingTreeEditorForMemoryMapItem } from "../components/memory-maps/AddUpdateSkeletonUsingTreeEditor";
import {
  CreateMemoryMapItem,
  EditMemoryMapItem,
} from "../components/memory-maps/CreateUpdateMemoryMapItemRouterPage";
import MemoryMapBase from "../components/memory-maps/MemoryMapBase";
import { MemoryMapList } from "../components/memory-maps/list/MemoryMapListRouterPage";
import MyResumeComponent from "../components/my-resume/MyResumeComponent";
import TaskBase from "../components/my-tasks/TaskBase";
import AddSubTaskRouterPage from "../components/my-tasks/sub-components/common/AddSubTaskRouterPage";
import CreateTaskRouterPage from "../components/my-tasks/sub-components/common/CreateTaskRouterPage";
import EditTaskRouterPage from "../components/my-tasks/sub-components/common/EditTaskRouterPage";
import ViewTaskRouterPage from "../components/my-tasks/sub-components/common/ViewTaskRouterPage";
import OldTasksBase from "../components/old-tasks-mgmt/OldTasksBase";
import RelatedNodesBase from "../components/related-nodes/RelatedNodesBase";
import {
  CreateRelatedNodeItem,
  CreateRelation,
  EditRelatedNodeItem,
  EditRelation,
} from "../components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage";
import RelatedNodesBaseV1 from "../components/related-nodes/v1/RelatedNodesBaseV1";
import ViewNode from "../components/related-nodes/v1/sub-components/ViewNode";
import ResumeForm from "../components/resume/ResumeForm";
// import SettingDashboard from "../components/settings/SettingDashboard";
import TagBase, {
  AddSubTagComp,
  CreateTag,
  EditTag,
  MoveToAnotherTagParent,
  SearchTagRouterPage,
  ViewTag,
} from "../components/tags/TagBase";
import TopicBase from "../components/topic/TopicBase";
import AddSubTopicComp from "../components/topic/sub-components/common/AddSubTopicRouterPage";
import CreateSectionRouterPage from "../components/topic/sub-components/common/CreateSectionRouterPage";
import CreateTopicComp from "../components/topic/sub-components/common/CreateTopicRouterPage";
import EditSectionRouterPage from "../components/topic/sub-components/common/EditSectionRouterPage";
import EditTopicComp from "../components/topic/sub-components/common/EditTopicRouterPage";
import MoveToAnotherTopicParent from "../components/topic/sub-components/common/MoveToAnotherTopicParentRouterPage";
import SearchTopicRouterPage from "../components/topic/sub-components/common/SearchRouterPage";
import TwoNodeComponentV53 from "../components/topic/sub-components/common/TwoNodeComponentV5.3";
import ViewTopic from "../components/topic/sub-components/common/ViewTopicRouterPage";
import TweetBase from "../components/tweets/TweetBase";
import WordList from "../components/words/WordList";
import { fetchAllQuestions } from "../redux/slices/interviewMgmtSlice";
import { fetchLinks } from "../redux/slices/linksSlice";
import { fetchMemoryMaps } from "../redux/slices/memoryMapSlice";
import { fetchPinnedItems } from "../redux/slices/pinnedItemSlice";
import { fetchTags } from "../redux/slices/tagsSlice";
import { fetchTasks } from "../redux/slices/taskSlice";
import { fetchTopics } from "../redux/slices/topicSlice";
import ToDoBase from "../components/my-reports/MyReportsBase";

const SPPAppRoutes = ({ isAuthenticated = false, handleLogin = () => {} }) => {
  return (
    <div>
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
                  {/* Welcome Bro!! */}
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

          {/* <Route path="/settings" element={<SettingDashboard />} /> */}

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
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Oops! Page not found.</p>
    </div>
  );
};

const Layout = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const performBootstrap = useCallback(() => {
    console.log("Performing bootstrap");
    dispatch(fetchTasks());
    dispatch(fetchTags());
    dispatch(fetchTopics());
    dispatch(fetchAllQuestions());
    dispatch(fetchLinks());
    dispatch(fetchPinnedItems());
    dispatch(fetchMemoryMaps());
  }, [dispatch]);

  useEffect(() => {
    performBootstrap();
  }, [performBootstrap]);
  return (
    <>
      <div
        style={{
          backgroundColor: isDarkMode ? "black" : "white",
          color: isDarkMode ? "white" : "black",
          paddingLeft: "25px",
          paddingTop: "5px",
        }}
      >
        {/* Breadcrumb component at the top */}
        <ToggleableIcon
          label={"Dark Mode"}
          isContentVisible={isDarkMode}
          additionalStyleForContainer={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
          toggleSymbols={{
            showSymbol: "Lite Mode",
            hideSymbol: "Dark mode",
          }}
          onToggle={() => toggleMode()}
        />
        <GlobalBreadcrumbV2 />
        <div style={{}}>
          <Outlet /> {/* Render the child routes */}
        </div>
      </div>
    </>
  );
};

export default SPPAppRoutes;
