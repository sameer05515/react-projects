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
import GitDiff from "./components/GitDiff";
import MyFormWithValidation from "./components/MyFormWithValidation";
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
            <Route path="/task-container" element={<TaskContainer />} />
            <Route path="/user-mgmt" element={<UserDashboard />} />
            <Route path="/resume-mgmt" element={<ResumeForm />} />
            <Route path="/settings" element={<SettingDashboard/>}/>
            <Route path="/topic-dashboard" element={<TopicDashboard/>}/>
            <Route path="/words" element={<WordList/>}/>
            <Route path="/my-resume" element={<MyResumeComponent uniqueId='john_doe_resume'/>}/>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
