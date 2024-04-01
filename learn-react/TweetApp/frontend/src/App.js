import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerticalMenu from "./VerticalMenu";
import { clearToken, getToken } from "./common/authService";
import GitDiff from "./components/miscelleneous/GitDiff";
import MyFormWithValidation from "./components/miscelleneous/MyFormWithValidation";
import ActionableContainer from "./components/actionable/ActionableContainer";
import ActivityForm from "./components/activity/ActivityForm";
import SchedulerCalender from "./components/calendar/SchedulerCalenderWithEventsWithViews";
import DraggableArea from "./components/drag-drop/DraggableArea2";
import LoginUser from "./components/login/LoginUser";
import Registration from "./components/login/Registration";
import UserDashboard from "./components/login/UserDashboard";
import TaskContainer from "./components/my-tasks/TaskContainer";
import ResumeForm from './components/resume/ResumeForm';
import SettingDashboard from "./components/settings/SettingDashboard";
import TopicDashboard from "./components/topic/TopicDashboard";
import TweetBase from "./components/tweets/TweetBase";
import WordList from "./components/words/WordList";
import "./styles/nav-styles.css";
import MyResumeComponent from "./components/my-resume/MyResumeComponent";
import InterviewMgmtBase, { CreateCategory, EditCategory, ViewCategoryDetails, ViewQuestionDetails } from "./components/interview-mgmt/InterviewMgmtBase";
import LinksBase, { AddChildLink, CreateLink, EditLink, ViewLink } from "./components/links/LinksBase";
import TopicBase, { AddSubTopicComp, CreateSectionRouterPage, CreateTopicComp, EditSectionRouterPage, EditTopicComp, MoveToAnotherTopicParent, ViewTopic } from "./components/topic/TopicBase";
import TaskBase, { AddSubTaskComp, CreateTaskComp, EditTaskComp, ViewTaskComp } from "./components/my-tasks/TaskBase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        <VerticalMenu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      )}
      <Routes>
        {/* Default route to redirect to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected routes */}
        {isAuthenticated && (
          <>
            <Route path="/tweet-base" element={<TweetBase />} />

            <Route
              path="/myformvalidation"
              element={<MyFormWithValidation />}
            />

            <Route
              path="/gitDiff"
              element={
                <GitDiff
                  oldContent="This is the old content."
                  newContent="This is the new content."
                />
              }
            />

            <Route path="/scheduler-calender" element={<SchedulerCalender />} />

            <Route path="/activity" element={<ActivityForm />} />

            <Route path="/draggable-area" element={<DraggableArea />} />

            <Route path="/actionable" element={<ActionableContainer />} />

            <Route path="/task-mgmt" element={<TaskBase />} >
              <Route path=":id/edit" element={<EditTaskComp />} />
              <Route path=":id/add-sub-task" element={<AddSubTaskComp />} />
              <Route path=":id" element={<ViewTaskComp />} />
              <Route path="create" element={<CreateTaskComp />} />
            </Route>

            <Route path="/user-mgmt" element={<UserDashboard />} />

            <Route path="/resume-mgmt" element={<ResumeForm />} />

            <Route path="/settings" element={<SettingDashboard />} />

            <Route path="/topic-mgmt" element={<TopicBase />} >
              <Route path=":id/edit" element={<EditTopicComp />} />
              <Route path=":id" element={<ViewTopic />} />
              <Route path=":id/add-sub-topic" element={<AddSubTopicComp />} />
              <Route path=":id/move-parent" element={<MoveToAnotherTopicParent/>}/>
              <Route path=":id/add-section" element={<CreateSectionRouterPage/>}/>
              <Route path=":id/section/:sectionId/edit" element={<EditSectionRouterPage/>}/>
              <Route path="create" element={<CreateTopicComp />} />
            </Route>

            <Route path="/words" element={<WordList />} />

            <Route path="/my-resume" element={<MyResumeComponent uniqueId='john_doe_resume' />} />

            <Route path="/interview-mgmt" element={<InterviewMgmtBase />} >
              <Route path=":id/edit" element={<EditCategory />} />
              <Route path=":id" element={<ViewCategoryDetails />} >
                {/* <Route path="edit" element={<EditCategory />} /> */}
                {/* <Route path="questions/:qid" element={<ViewQuestionDetails />} /> */}
              </Route>
              <Route path=":id/questions/:qid" element={<ViewQuestionDetails />} />
              <Route path="create" element={<CreateCategory />} />
            </Route>
            
            <Route path="/links-mgmt" element={<LinksBase />} >
              <Route path=":id/edit" element={<EditLink />} />
              <Route path=":id" element={<ViewLink />} />
              <Route path="create" element={<CreateLink />} />
              {/* <Route path=":id/add-child" element={<AddChildLink/>}/> */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </>
        )}
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

export default App;
