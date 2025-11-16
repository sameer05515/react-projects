import React, { createContext, useContext, useState } from "react";
import useRelatedNodeApi from "./useRelatedNodeApi";

const defaultStyles = {
  greenBorder: { border: "1px solid green" },
};

// Initial shared data
const initialSharedData = {
  selectedNode: null,
  allNodes: [],
  showPlaygroundSection: false,
  showPreviousRelations: false,
  showNextRelations: false,
  styles: defaultStyles,
};

// Create a context for shared configurations and data
type SharedContextShape = {
  sharedData: typeof initialSharedData;
  SharedService: {
    setSelectedNode: (n: any) => void;
    refreshNodes: () => Promise<void>;
    createNode: (d: any) => Promise<void>;
    getNodeByUniqueId: (id: string) => Promise<void>;
    updateNodeByUniqueId: (id: string, d: any) => Promise<void>;
    updateRelationInConnectedNodes: (d: any) => Promise<void>;
  };
};

const SharedConfigurationsContext = createContext<SharedContextShape>({} as any);

// Create a provider component
const SharedConfigurationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedData, setSharedData] = useState(initialSharedData);
  const {
    createNode: apiCreateNode,
    getNodeByUniqueId: apiGetNodeByUniqueId,
    updateNodeByUniqueId: apiUpdateNodeByUniqueId,
    getAllNodes: apiGetAllNodes,
    updateRelationInConnectedNodes: apiUpdateRelationInConnectedNodes,
  } = useRelatedNodeApi();

  const setSelectedNode = (selectedNode) => {
    setSharedData((prev) => ({ ...prev, selectedNode }));
  };

  const refreshNodes = async () => {
    try {
      const nodes = await apiGetAllNodes();
      setSharedData((prev) => ({ ...prev, allNodes: nodes }));
      // if(sharedData?.selectedNode?.uniqueId){
      //   const node = nodes.find(node=> node.uniqueId===sharedData?.selectedNode?.uniqueId);
      //   setSelectedNode(node);
      // }
    } catch (error) {
      console.error("Error refreshing nodes:", error);
    }
  };

  const createNode = async (nodeData) => {
    try {
      await apiCreateNode(nodeData);
      await refreshNodes(); // Refresh nodes on successful creation
    } catch (error) {
      console.error("Error creating node:", error);
    }
  };

  const getNodeByUniqueId = async (nodeId) => {
    try {
      const node = await apiGetNodeByUniqueId(nodeId);
      await refreshNodes(); // Refresh nodes on successful creation
      setSelectedNode(node); // Update selectedNode in sharedData
    } catch (error) {
      console.error("Error fetching node by ID:", error);
    }
  };

  const updateNodeByUniqueId = async (nodeId, nodeData) => {
    try {
      const updatedNode = await apiUpdateNodeByUniqueId(nodeId, nodeData);
      await refreshNodes(); // Refresh nodes on successful creation
      setSelectedNode(updatedNode); // Update selectedNode in sharedData
    } catch (error) {
      console.error("Error updating node:", error);
    }
  };

  const updateRelationInConnectedNodes= async (relationData) => {
    try {
      const {message} = await apiUpdateRelationInConnectedNodes(relationData);
      await refreshNodes(); // Refresh nodes on successful creation
      console.log(message)
      //setSelectedNode(updatedNode); // Update selectedNode in sharedData
    } catch (error) {
      console.error("Error updating node relation:", error);
    }
  }

  const SharedService = {
    setSelectedNode,
    refreshNodes,
    createNode,
    getNodeByUniqueId,
    updateNodeByUniqueId,
    updateRelationInConnectedNodes
  };

  return (
    <SharedConfigurationsContext.Provider value={{ sharedData, SharedService }}>
      {children}
    </SharedConfigurationsContext.Provider>
  );
};

// Custom hook to use shared configurations and data
const useSharedConfigurations = () => useContext(SharedConfigurationsContext);

export { SharedConfigurationsProvider, useSharedConfigurations };
