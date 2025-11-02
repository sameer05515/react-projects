import React, { useState, useCallback } from "react";
import CollapsibleMenu from "../../common/components/collapsible-menu/CollapsibleMenu";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedModuleName } from "../../redux/slices/breadcrumbSlice";

const HorizontalMenu = ({ isAuthenticated, handleLogout }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isPathActive = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path || currentPath.startsWith(path);
  };

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
    // { linkHeader: "Settings", linkPath: () => "/settings", isModule: true },
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
        <ul className="flex flex-wrap items-center gap-2 rounded-lg bg-[#2C3E50] text-white px-0 py-2 shadow-lg">
          {links
            .filter((l) => l.isModule)
            .map(({ linkPath, linkHeader }, idx) => (
              <li
                key={`linkPath_${idx + 100}`}
                className={
                  "px-4 py-2 text-xs rounded transition-colors duration-300" +
                  (isPathActive(linkPath())
                    ? " bg-[#34495E]"
                    : " hover:bg-[#34495E]") +
                  (isPathActive(linkPath())
                    ? " text-[#FFC107] font-bold text-sm"
                    : " text-[#ECF0F1]")
                }
              >
                <NavLink
                  to={linkPath()}
                  className={
                    "no-underline" +
                    (isPathActive(linkPath())
                      ? " text-[#FFC107] font-bold text-sm"
                      : " text-[#ECF0F1]")
                  }
                  onClick={() => handleLinkClick(linkHeader)}
                >
                  {linkHeader}
                </NavLink>
              </li>
            ))}

          {isAuthenticated && (
            <li className="px-4 py-2 text-xs ml-auto">
              <button
                onClick={handleLogout}
                className="bg-[#E74C3C] text-white border-none px-4 py-2 rounded transition-colors duration-300 font-bold cursor-pointer hover:bg-[#C0392B]"
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
