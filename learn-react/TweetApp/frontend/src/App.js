import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearToken, getToken } from "./common/service/authService";
import ActionableContainer from "./components/actionable/ActionableContainer";
import ActivityForm from "./components/activity/ActivityForm";
import SchedulerCalender from "./components/calendar/SchedulerCalenderWithEventsWithViews";
import DraggableArea from "./components/drag-drop/DraggableArea2";
import InterviewMgmtBase from "./components/interview-mgmt/InterviewMgmtBase";
import {
  CategoryList,
  CreateAnswer,
  // CreateCategory,
  CreateQuestion,
  EditAnswer,
  // EditCategory,
  EditQuestion,
  MoveQuestionToAnotherParentQuestion,
  SearchInterviewMgmtRouterPage,
  // MoveQuestionToAnotherCategory,
  // MoveToAnotherCategoryParent,
  // ViewCategoryDetails,
  ViewQuestionDetails,
} from "./components/interview-mgmt/sub-components/router-pages";
import LinksBase, {
  CreateLink,
  EditLink,
  ViewLink,
} from "./components/links/LinksBase";
import LoginUser from "./components/login/LoginUser";
import Registration from "./components/login/Registration";
import UserDashboard from "./components/login/UserDashboard";
import GitDiff from "./components/miscelleneous/GitDiff";
import MyFormWithValidation from "./components/miscelleneous/MyFormWithValidation";
import MyResumeComponent from "./components/my-resume/MyResumeComponent";
import TaskBase, {
  AddSubTaskComp,
  CreateTaskComp,
  EditTaskComp,
  ViewTaskComp,
} from "./components/my-tasks/TaskBase";
import ResumeForm from "./components/resume/ResumeForm";
import SettingDashboard from "./components/settings/SettingDashboard";
import TopicBase, {
  AddSubTopicComp,
  CreateSectionRouterPage,
  CreateTopicComp,
  EditSectionRouterPage,
  EditTopicComp,
  MoveToAnotherTopicParent,
  SearchRouterPage as SearchTopicRouterPage,
  ViewTopic,
} from "./components/topic/TopicBase";
import TweetBase from "./components/tweets/TweetBase";
import WordList from "./components/words/WordList";
// import "./styles/nav-styles.css";
// import TagList from "./components/tags/TagList";
import HorizontalMenu from "./HorizontalMenu";
import JSONDataViewer from "./common/components/json-data-viewer/JSONDataViewer";
import GlobalBreadcrumbV2 from "./common/components/global-breadcrumbs/GlobalBreadcrumbV2";
import { AddUpdateSkeletonForMemoryMapItem } from "./components/memory-maps/AddUpdateSkeleton";
import {
  CreateMemoryMapItem,
  EditMemoryMapItem,
} from "./components/memory-maps/CreateUpdateMemoryMapItemRouterPage";
import MemoryMapBase from "./components/memory-maps/MemoryMapBase";
import { MemoryMapList } from "./components/memory-maps/list/MemoryMapListRouterPage";
import RelatedNodesBase from "./components/related-nodes/RelatedNodesBase";
import {
  CreateRelatedNodeItem,
  CreateRelation,
  EditRelatedNodeItem,
  EditRelation,
} from "./components/related-nodes/sub-components/details-section/CreateUpdateNodeRouterPage";
import RelatedNodesBaseV1 from "./components/related-nodes/v1/RelatedNodesBaseV1";
import ViewNode from "./components/related-nodes/v1/sub-components/ViewNode";
import TagBase, {
  AddSubTagComp,
  CreateTag,
  EditTag,
  MoveToAnotherTagParent,
  SearchTagRouterPage,
  ViewTag,
} from "./components/tags/TagBase";
import ToggleableIcon from "./common/components/toggleable-icon/ToggleableIcon";
import TwoNodeComponentV5_3 from "./components/topic/sub-components/TwoNodeComponentV5.3";
import { AddUpdateSkeletonUsingTreeEditorForMemoryMapItem } from "./components/memory-maps/AddUpdateSkeletonUsingTreeEditor";
import Welcome from "./Welcome";
import PlaygroundBase from "./components/apna-playground/PlaygroundBase";
import Notifications from "./Notifications";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const history = useNavigate();

  useEffect(() => {
    // Check authentication when App.js loads
    // You can implement your authentication logic here
    // For example, check if the user has a valid token
    const token = getToken(); // Replace with your token retrieval logic

    if (token) {
      setIsAuthenticated(true);
    } else {
      // If not authenticated and not on the /register route, redirect to the login page
      if (window.location.pathname !== "/register") {
        history("/login");
      }
    }
    setLoading(false); // Loading completed
  }, [history]);

  // Function to handle user login
  const handleLogin = () => {
    // Perform your authentication logic here
    // If authentication is successful, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic here
    // If logout is successful, set isAuthenticated to false
    clearToken();
    setIsAuthenticated(false);
    history("/login");
  };

  if (loading) {
    // Render loading state until authentication check is complete
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
        />
      </div>

      {isAuthenticated && (
        <>
          {/* <VerticalMenu
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          /> */}
          <HorizontalMenu
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        </>
      )}
      <Routes>
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

          {/** ----- MY FORM VALIDATION ---------------------- */}

          <Route path="/myformvalidation" element={<MyFormWithValidation />} />

          {/** ----- GIT DIFF ---------------------- */}
          <Route
            path="/gitDiff"
            element={
              <GitDiff
                oldContent="This is the old content."
                newContent="This is the new content."
              />
            }
          />

          {/** ----- SCHEDULE CALENDER ---------------------- */}

          <Route path="/scheduler-calender" element={<SchedulerCalender />} />

          {/** ----- ACTIVITY MANAGEMENT ---------------------- */}

          <Route path="/activity" element={<ActivityForm />} />

          {/** ----- DRAGGABLE AREA MANAGEMENT ---------------------- */}

          <Route path="/draggable-area" element={<DraggableArea />} />

          {/** ----- ACTIONABLE CONTAINER ---------------------- */}

          <Route path="/actionable" element={<ActionableContainer />} />

          {/** ----- TASK MANAGEMENT ---------------------- */}

          <Route path="/task-mgmt" element={<TaskBase />}>
            <Route path=":id/edit" element={<EditTaskComp />} />
            <Route path=":id/add-sub-task" element={<AddSubTaskComp />} />
            <Route path=":id" element={<ViewTaskComp />} />
            <Route path="create" element={<CreateTaskComp />} />
          </Route>

          {/** ----- USER MANAGEMENT ---------------------- */}

          <Route path="/user-mgmt" element={<UserDashboard />} />

          {/** ----- RESUME MANAGEMENT ---------------------- */}

          <Route path="/resume-mgmt" element={<ResumeForm />} />

          {/** ----- SETTINGS MANAGEMENT ---------------------- */}

          <Route path="/settings" element={<SettingDashboard />} />

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
            <Route path="two-nodes" element={<TwoNodeComponentV5_3 />} />
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

          {/** ----- Apna Playground ---------------------------- */}
          <Route path="/apna-playground" element={<PlaygroundBase />} />

        </Route>

        {/** ----- LOGIN/ LOGOUT ---------------------- */}

        <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/notifications" element={<Notifications/>} />

        {/** ----- NOT FOUND ---------------------- */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Oops! Page not found.</p>
    </div>
  );
};

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
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
          label={'Dark Mode'}
          isContentVisible={isDarkMode}
          additionalStyleForContainer={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer'
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

export default App;
