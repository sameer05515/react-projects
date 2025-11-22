import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import GlobalBreadcrumbV2 from "../common/components/global-breadcrumbs/GlobalBreadcrumbV2";
import ToggleableIcon from "../common/components/toggleable-icon/ToggleableIcon";
import { fetchPinnedItems } from "../redux/slices/pinnedItemSlice";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-red-600">404 Not Found</h1>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
        Oops! Page not found.
      </p>
    </div>
  );
}

/**
 * Shell: breadcrumbs, dark mode toggle, outlet for nested routes.
 */
export function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    const path = location.pathname || "";
    const needsPinnedItems =
      path === "/" ||
      path.startsWith("/topic-mgmt") ||
      path.startsWith("/task-mgmt");
    if (needsPinnedItems) {
      dispatch(fetchPinnedItems());
    }
  }, [dispatch, location.pathname]);

  return (
    <div
      className={`relative pl-6 pt-1 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="absolute top-2.5 right-2.5 cursor-pointer">
        <ToggleableIcon
          label="Dark Mode"
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
        <Outlet />
      </div>
    </div>
  );
}
