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
  const [loading, setLoading] = useState(true);

  const history = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      if (window.location.pathname !== "/register") {
        history("/login");
      }
    }
    setLoading(false);
  }, [history]);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    clearToken();
    setIsAuthenticated(false);
    history("/login");
  }, [history]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-lg text-gray-700">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="z-[2000]">
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


