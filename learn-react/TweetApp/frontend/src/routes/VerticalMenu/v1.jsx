import React from "react";
import { NavLink } from "react-router-dom";

const VerticalMenu = ({ isAuthenticated, handleLogout }) => {
  const menuStyle = {
    //width: "200px", // Set the width of the menu
    backgroundColor: "#333", // Set the background color
    color: "white", // Set the text color
  };

  const selectedLinkStyle = {
    color: "white",
    fontSize: "18px",
  };

  const listItemStyle = {
    padding: "10px",
  };

  const isPathStartsWith = (path) => {
    return window.location.pathname === path || window.location.pathname.startsWith(path);
  };

  const links = [
    { linkPath: "/tweet-base", linkHeader: "Tweets" },
    { linkPath: "/task-mgmt", linkHeader: "Task Container" },
    { linkPath: "/user-mgmt", linkHeader: "User Mgmt" },
    { linkPath: "/resume-mgmt", linkHeader: "Resume Mgmt" },
    { linkPath: "/my-resume", linkHeader: "My Resume" },
    { linkPath: "/topic-mgmt", linkHeader: "Topic Mgmt" },
    { linkPath: "/words", linkHeader: "Words" },
    { linkPath: "/interview-mgmt", linkHeader: "Interview-Mgmt" },
    { linkPath: "/links-mgmt", linkHeader: "Links" },
    { linkPath: "/tags", linkHeader: "Tags" },
    { linkPath: "/memory-maps", linkHeader: "Memory Maps" },
    { linkPath: "/settings", linkHeader: "Settings" },
  ];

  return (
    <nav style={menuStyle}>
      <ul>
        {links.map(({ linkPath, linkHeader }) => (
          <li key={linkPath} style={listItemStyle}>
            <NavLink to={linkPath} style={isPathStartsWith(linkPath) ? selectedLinkStyle : {}}>
              {linkHeader}
            </NavLink>
          </li>
        ))}

        {/* Add a Logout button */}
        {isAuthenticated && (
          <li style={{ ...listItemStyle, marginLeft: "auto" }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "red", // Set the background color of the button
                color: "white", // Set the text color of the button
                border: "none", // Remove the button border
                padding: "5px 10px", // Add some padding
                cursor: "pointer", // Change the cursor to a hand pointer
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default VerticalMenu;
