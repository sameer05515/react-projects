import React, { useState, useCallback } from "react";
import CollapsibleMenu from "../../common/components/collapsible-menu/CollapsibleMenu";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedModuleName } from "../../redux/slices/breadcrumbSlice";

const HorizontalMenu = ({ isAuthenticated, handleLogout }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuStyle = {
    backgroundColor: "#2C3E50",
    color: "white",
    padding: "10px 0",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const selectedLinkStyle = {
    color: "#FFC107",
    fontSize: "15px",
    fontWeight: "bold",
  };

  const listItemStyle = {
    padding: "8px 15px",
    fontSize: "10px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const linkStyle = {
    color: "#ECF0F1",
    textDecoration: "none",
  };

  const listItemHoverStyle = {
    backgroundColor: "#34495E",
    borderRadius: "5px",
  };

  const buttonStyle = {
    backgroundColor: "#E74C3C",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#C0392B",
  };

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
    <div style={{ marginBottom: "20px" }}>
      <CollapsibleMenu isCollapsed={isCollapsed}>
        <ul style={{ listStyle: "none", ...menuStyle }}>
          {links
            .filter((l) => l.isModule)
            .map(({ linkPath, linkHeader }, idx) => (
              <li
                key={`linkPath_${idx + 100}`}
                style={{
                  ...listItemStyle,
                  ...(isPathActive(linkPath()) ? listItemHoverStyle : {}),
                }}
              >
                <NavLink
                  to={linkPath()}
                  style={{
                    ...linkStyle,
                    ...(isPathActive(linkPath()) ? selectedLinkStyle : {}),
                  }}
                >
                  <span onClick={() => handleLinkClick(linkHeader)}>{linkHeader}</span>
                </NavLink>
              </li>
            ))}

          {isAuthenticated && (
            <li style={{ ...listItemStyle, marginLeft: "auto" }}>
              <button onClick={handleLogout} style={{ ...buttonStyle }} onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)} onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}>
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
