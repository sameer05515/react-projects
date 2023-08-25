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

  return (
    <nav style={menuStyle}>
      <ul>
        <li style={listItemStyle}>
          <NavLink
            to="/tweet-base"
            style={
              window.location.pathname === "/tweet-base" ? selectedLinkStyle : {}
            }
          >
            Tweets
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/task-container"
            style={
              window.location.pathname === "/task-container"
                ? selectedLinkStyle
                : {}
            }
          >
            TaskContainer
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/user-mgmt"
            style={
              window.location.pathname === "/user-mgmt" ? selectedLinkStyle : {}
            }
          >
            User Mgmt
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/resume-mgmt"
            style={
              window.location.pathname === "/resume-mgmt" ? selectedLinkStyle : {}
            }
          >
            Resume Mgmt
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/my-resume"
            style={
              window.location.pathname === "/my-resume" ? selectedLinkStyle : {}
            }
          >
            My Resume
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/topic-dashboard"
            style={
              window.location.pathname === "/topic-dashboard" ? selectedLinkStyle : {}
            }
          >
            Topic Dashboard
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/words"
            style={
              window.location.pathname === "/words" ? selectedLinkStyle : {}
            }
          >
            Words
          </NavLink>
        </li>
        <li style={listItemStyle}>
          <NavLink
            to="/settings"
            style={
              window.location.pathname === "/settings" ? selectedLinkStyle : {}
            }
          >
            Settings
          </NavLink>
        </li>
        
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
