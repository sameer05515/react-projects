import React, { useState, useCallback } from "react";
import CollapsibleMenu from "./common/components/CollapsibleMenu";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedModuleName } from "./redux/slices/breadcrumbSlice";

const HorizontalMenu = ({ isAuthenticated, handleLogout }) => {
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const menuStyle = {
        backgroundColor: "#333",
        color: "white",
    };

    const selectedLinkStyle = {
        color: "white",
        fontSize: "18px",
    };

    const listItemStyle = {
        padding: "3px",
    };

    const isPathActive = (path) => {
        const currentPath = window.location.pathname;
        return currentPath === path || currentPath.startsWith(path);
    };

    const links = [
        { linkHeader: "Tweets", linkPath: () => "/tweet-base", isModule: true },
        { linkHeader: "Task Container", linkPath: () => "/task-mgmt", isModule: true },
        { linkHeader: "User Mgmt", linkPath: () => "/user-mgmt", isModule: true },
        { linkHeader: "Resume Mgmt", linkPath: () => "/resume-mgmt", isModule: true },
        { linkHeader: "My Resume", linkPath: () => "/my-resume", isModule: true },
        { linkHeader: "Topic Mgmt", linkPath: () => "/topic-mgmt", isModule: true },
        { linkHeader: "Words", linkPath: () => "/words", isModule: true },
        { linkHeader: "Interview-Mgmt", linkPath: () => "/interview-mgmt", isModule: true },
        { linkHeader: "Links", linkPath: () => "/links-mgmt", isModule: true },
        { linkHeader: "Tags", linkPath: () => "/tags", isModule: true },
        { linkHeader: "Memory Maps", linkPath: () => "/memory-maps", isModule: true },
        { linkHeader: "Node Story- Distorted Style", linkPath: () => "/node-story", isModule: true },
        { linkHeader: "Node Story V1", linkPath: () => "/node_story_v1", isModule: true },
        { linkHeader: "Settings", linkPath: () => "/settings", isModule: true },
    ];

    const handleLinkClick = useCallback((linkHeader) => {
        console.log("Going to Register Module: " + linkHeader);
        dispatch(setSelectedModuleName(linkHeader));
        setIsCollapsed(true);
    }, [dispatch]);

    return (
        <div>
            <CollapsibleMenu isCollapsed={isCollapsed}>
                <ul style={{ listStyle: "none", ...menuStyle }}>
                    {links
                        .filter((l) => l.isModule)
                        .map(({ linkPath, linkHeader }, idx) => (
                            <li key={`linkPath_${idx + 100}`} style={listItemStyle}>
                                <NavLink
                                    to={linkPath()}
                                    style={isPathActive(linkPath()) ? selectedLinkStyle : {}}
                                >
                                    <span onClick={() => handleLinkClick(linkHeader)}>
                                        {linkHeader}
                                    </span>
                                </NavLink>
                            </li>
                        ))}

                    {isAuthenticated && (
                        <li style={{ ...listItemStyle, marginLeft: "auto" }}>
                            <button
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                }}
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
