import React, { useEffect, useState } from "react";
import HoverableSpan from "../hoverable-span/HoverableSpan";
import { useSelector } from "react-redux";
import { selectSelectedModuleName } from "../../../redux/slices/breadcrumbSlice";
import { useNavigate } from "react-router-dom";
import JSONDataViewer from "../json-data-viewer/JSONDataViewer";

const GlobalBreadcrumbV2 = ({
}) => {

    const selectedModuleName = useSelector(selectSelectedModuleName);
    const navigate = useNavigate();
    useEffect(() => {
        console.log('selectedModuleName: ' + selectedModuleName)
    }, [selectedModuleName])

    return (
        <div>
            {/* <JSONDataViewer metadata={{selectedModuleName}} /> */}

            <div style={breadcrumbStyle.breadcrumbsContainer}>
                <HoverableSpan
                    style={breadcrumbStyle.breadcrumbItem}
                    onClick={() => navigate('/')}
                >
                    <i>Home / </i>
                </HoverableSpan>

                {selectedModuleName && (
                    <HoverableSpan
                        style={breadcrumbStyle.breadcrumbItem}
                        onClick={() => navigate('/')}
                    >
                        <i>{selectedModuleName} / </i>
                    </HoverableSpan>
                )}
                {/* <br /> */}
                <span style={{ color: "red" }}>
                    Halting (or Stopping) all development, enhancements, and bug fixes
                    until further (or next) instructions from the CEO of SPP International
                    Pvt Ltd. 
                    Please refer below link for details:{" "}
                    <a
                        href="http://localhost:3002/notifications"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here
                    </a>
                </span>
            </div>
        </div>
    );
};

const breadcrumbStyle = {
    breadcrumbsContainer: {
        marginBottom: "5px",
        // padding: "0 .5rem",
    },
    breadcrumbList: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
    },
    breadcrumbItem: {
        display: "inline-block",
        marginRight: "5px",
    },
    breadcrumbLink: {
        color: "#007bff",
        textDecoration: "none",
    },
    breadcrumbLinkHover: {
        textDecoration: "underline",
    },
};

export default GlobalBreadcrumbV2;
