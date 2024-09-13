import React, { useEffect, useMemo } from "react";
import {
    SharedConfigurationsProvider,
    useSharedConfigurations,
} from "../util/RelatedNodeUtil";
import { Outlet, useNavigate } from "react-router-dom";
import { styles, Select } from "./util";

const RelatedNodesBaseV1 = () => {
  const navigate = useNavigate();

  const {
    SharedService: { refreshNodes },
    sharedData: { allNodes,selectedNode },
  } = useSharedConfigurations();

  useEffect(() => {
    refreshNodes();
  }, []);

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
    <div style={styles.container}>
      <div style={styles.columnDiv}>
        <Select options={nodeOptions} value={selectedNode?.uniqueId || ""} onChange={handleLanguageChange} />
      </div>
      <div>
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
