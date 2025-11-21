import React from "react";
import { NavLink } from "react-router-dom";

type VerticalMenuProps = {
  isAuthenticated: boolean;
  handleLogout: () => void;
};

const VerticalMenu: React.FC<VerticalMenuProps> = ({ isAuthenticated, handleLogout }) => {
  const isPathStartsWith = (path: string) => {
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
    <nav className="bg-gray-800 text-white">
      <ul className="flex flex-col">
        {links.map(({ linkPath, linkHeader }) => (
          <li key={linkPath} className="p-2.5">
            <NavLink 
              to={linkPath} 
              className={isPathStartsWith(linkPath) ? "text-white text-lg font-semibold" : "text-gray-300 hover:text-white"}
            >
              {linkHeader}
            </NavLink>
          </li>
        ))}

        {/* Add a Logout button */}
        {isAuthenticated && (
          <li className="p-2.5 ml-auto">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white border-none py-1.5 px-2.5 cursor-pointer rounded hover:bg-red-700 transition-colors"
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
