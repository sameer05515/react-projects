import React, { useState, useCallback } from "react";
import CollapsibleMenu from "../../common/components/collapsible-menu/CollapsibleMenu";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedModuleName } from "../../redux/slices/breadcrumbSlice";

const HorizontalMenu = ({ isAuthenticated, handleLogout }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const links = [
    { linkHeader: "Home", linkPath: () => "/", isModule: true },
    { linkHeader: "My Reports", linkPath: () => "/my-reports", isModule: true },
    {
      linkHeader: "Notifications",
      linkPath: () => "/notifications",
      isModule: true,
    },
    {
      linkHeader: "Apna Playground",
      linkPath: () => "/apna-playground",
      isModule: true,
    },
    { linkHeader: "Tweets", linkPath: () => "/tweet-base", isModule: true },
    {
      linkHeader: "Task Container",
      linkPath: () => "/task-mgmt",
      isModule: true,
    },
    { linkHeader: "User Mgmt", linkPath: () => "/user-mgmt", isModule: true },
    {
      linkHeader: "Resume Mgmt",
      linkPath: () => "/resume-mgmt",
      isModule: true,
    },
    { linkHeader: "My Resume", linkPath: () => "/my-resume", isModule: true },
    { linkHeader: "Topic Mgmt", linkPath: () => "/topic-mgmt", isModule: true },
    { linkHeader: "Words", linkPath: () => "/words", isModule: true },
    {
      linkHeader: "Interview-Mgmt",
      linkPath: () => "/interview-mgmt",
      isModule: true,
    },
    { linkHeader: "Links", linkPath: () => "/links-mgmt", isModule: true },
    { linkHeader: "Tags", linkPath: () => "/tags", isModule: true },
    {
      linkHeader: "Memory Maps",
      linkPath: () => "/memory-maps",
      isModule: true,
    },
    {
      linkHeader: "Node Story- Distorted Style",
      linkPath: () => "/node-story",
      isModule: true,
    },
    {
      linkHeader: "Node Story V1",
      linkPath: () => "/node_story_v1",
      isModule: true,
    },
    { linkHeader: "Settings", linkPath: () => "/settings", isModule: true },
  ];

  const handleLinkClick = useCallback(
    (linkHeader) => {
      console.log("Going to Register Module: " + linkHeader);
      dispatch(setSelectedModuleName(linkHeader));
      setIsCollapsed(true);
    },
    [dispatch]
  );

  return (
    <div className="mb-5">
      <CollapsibleMenu isCollapsed={isCollapsed}>
        <ul className="flex flex-wrap items-center gap-1 rounded-lg bg-menu-dark px-3 py-2 shadow-lg text-white max-h-[70vh] overflow-y-auto">
          {links
            .filter((l) => l.isModule)
            .map(({ linkPath, linkHeader }, idx) => (
                <li key={`linkPath_${idx + 100}`}>
                  <NavLink
                    to={linkPath()}
                    end={linkPath() === "/"}
                    onClick={() => handleLinkClick(linkHeader)}
                    className={({ isActive }) =>
                      [
                        "block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                        "no-underline focus:outline-none focus:ring-2 focus:ring-menu-yellow focus:ring-offset-2 focus:ring-offset-menu-dark",
                        isActive
                          ? "bg-menu-darker text-menu-yellow"
                          : "text-menu-light hover:bg-menu-darker hover:text-white",
                      ].join(" ")
                    }
                  >
                    {linkHeader}
                  </NavLink>
                </li>
              ))}

          {isAuthenticated && (
            <li className="ml-auto pl-2">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-menu-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-menu-yellow focus:ring-offset-2 focus:ring-offset-menu-dark hover:bg-menu-red-dark cursor-pointer border-0"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </CollapsibleMenu>
    </div>
  );
};

export default HorizontalMenu;
