import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomBackdropV2 from "./common/components/CustomBackdrop/v2";
import { clearToken, getToken } from "./common/service/authService";
import HorizontalMenu from "./routes/HorizontalMenu/v1";
import SPPAppRoutes from "./routes/v1";

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
  const handleLogin = useCallback(() => {
    // Perform your authentication logic here
    // If authentication is successful, set isAuthenticated to true
    setIsAuthenticated(true);
  }, []);

  // Function to handle user logout
  const handleLogout = useCallback(() => {
    // Perform logout logic here
    // If logout is successful, set isAuthenticated to false
    clearToken();
    setIsAuthenticated(false);
    history("/login");
  }, [history]);

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
      <CustomBackdropV2 />

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

      <SPPAppRoutes
        handleLogin={handleLogin}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}

export default App;
