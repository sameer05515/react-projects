import React, { useEffect } from "react";
import HoverableSpan from "../hoverable-span/HoverableSpan";
import { useSelector } from "react-redux";
import { selectSelectedModuleName } from "../../../redux/slices/breadcrumbSlice";
import { useNavigate } from "react-router-dom";
// import JSONDataViewer from "../json-data-viewer/JSONDataViewer";

const GlobalBreadcrumbV2 = () => {
  const selectedModuleName = useSelector(selectSelectedModuleName);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("selectedModuleName: " + selectedModuleName);
  }, [selectedModuleName]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-700">
        <HoverableSpan className="bg-transparent px-0 py-0 text-blue-600" onClick={() => navigate("/")}>
          <i>Home / </i>
        </HoverableSpan>

        {selectedModuleName && (
          <HoverableSpan className="bg-transparent px-0 py-0 text-blue-600" onClick={() => navigate("/")}>
            <i>{selectedModuleName} / </i>
          </HoverableSpan>
        )}
      </div>

      <p className="text-sm font-semibold text-red-600">
        Halting (or Stopping) all development, enhancements, and bug fixes until further (or next) instructions from the CEO of SPP
        International Pvt Ltd. Please refer below link for details:&nbsp;
        <a
          className="underline decoration-dotted text-blue-700 hover:text-blue-900"
          href="http://localhost:3002/notifications"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>
      </p>
    </div>
  );
};

export default GlobalBreadcrumbV2;
