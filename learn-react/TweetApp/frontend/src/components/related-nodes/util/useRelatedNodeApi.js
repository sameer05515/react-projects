import { useCallback } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../../common/constants/globalConstants";



const useRelatedNodeApi = () => {
    const createNode = useCallback(async (nodeData) => {
        try {
            const response = await axios.post(`${BACKEND_APPLICATION_BASE_URL}/node-story`, nodeData);
            return response.data;
        } catch (error) {
            console.error("Error creating node", error);
            throw error;
        }
    }, []);

    const getNodeByUniqueId = useCallback(async (nodeId) => {
        if(!nodeId) return null;
        try {
            const response = await axios.get(`${BACKEND_APPLICATION_BASE_URL}/node-story/${nodeId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching node", error);
            throw error;
        }
    }, []);

    const getAllNodes = useCallback(async () => {
        try {
            const response = await axios.get(`${BACKEND_APPLICATION_BASE_URL}/node-story`);
            return response.data;
        } catch (error) {
            console.error("Error fetching node", error);
            throw error;
        }
    }, []);

    const updateNodeByUniqueId = useCallback(async (nodeId, nodeData) => {
        try {
            const response = await axios.put(`${BACKEND_APPLICATION_BASE_URL}/node-story/${nodeId}`, nodeData);
            return response.data;
        } catch (error) {
            console.error("Error updating node", error);
            throw error;
        }
    }, []);

    const updateRelationInConnectedNodes = useCallback(async (nodeData) => {
        try {
            const response = await axios.put(`${BACKEND_APPLICATION_BASE_URL}/node-story/upsert-relation`, nodeData);
            return response.data;
        } catch (error) {
            console.error("Error updating node relation", error);
            throw error;
        }
    }, []);



    return {
        createNode,
        getNodeByUniqueId,
        updateNodeByUniqueId,
        getAllNodes,
        updateRelationInConnectedNodes
    };
};

export default useRelatedNodeApi;
