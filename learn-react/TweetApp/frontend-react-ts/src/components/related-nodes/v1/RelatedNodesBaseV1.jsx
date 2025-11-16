import React, { useEffect, useMemo } from "react";
import {
    SharedConfigurationsProvider,
    useSharedConfigurations,
} from "../util/RelatedNodeUtil";
import { Outlet, useNavigate } from "react-router-dom";
import { Select } from "./util";

const RelatedNodesBaseV1 = () => {
  const navigate = useNavigate();

  const {
    SharedService: { refreshNodes },
    sharedData: { allNodes,selectedNode },
  } = useSharedConfigurations();

  useEffect(() => {
    refreshNodes();
  }, [refreshNodes]);

  const nodeOptions = useMemo(
    () => allNodes?.map((node) => ({ label: node.name, value: node.uniqueId })) || [],
    [allNodes]
  );

  const handleLanguageChange = (event) => {
    const selectedLang = allNodes.find((lang) => lang.uniqueId === event.target.value);
    // setSelectedLanguage(selectedLang);
    // setSelectedNode(selectedLang); // Update the selected node in the shared state
    navigate(`${selectedLang.uniqueId}`);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <Select options={nodeOptions} value={selectedNode?.uniqueId || ""} onChange={handleLanguageChange} />
      </div>
      <div className="rounded border border-gray-100 bg-gray-50 p-3">
        <Outlet/>
      </div>
    </div>
  );
};

const WithContext = () => (
  <SharedConfigurationsProvider>
    <RelatedNodesBaseV1 />
  </SharedConfigurationsProvider>
);

export default WithContext;
