import { api } from '../apiClient';
import type { RelatedNode, ApiResponse } from './types';

/**
 * Related Nodes API Service
 * Handles all related node-related API calls
 */

export const relatedNodesApi = {
  /**
   * Get all related nodes
   */
  getAll: async (): Promise<RelatedNode[]> => {
    const { data } = await api.get<RelatedNode[]>('/node-story');
    return data;
  },

  /**
   * Get related node by unique ID
   */
  getById: async (uniqueId: string): Promise<RelatedNode> => {
    const { data } = await api.get<RelatedNode>(`/node-story/${uniqueId}`);
    return data;
  },

  /**
   * Create a new related node
   */
  create: async (node: Partial<RelatedNode>): Promise<RelatedNode> => {
    const { data } = await api.post<RelatedNode>('/node-story', node);
    return data;
  },

  /**
   * Update related node
   */
  update: async (uniqueId: string, node: Partial<RelatedNode>): Promise<RelatedNode> => {
    const { data } = await api.put<RelatedNode>(`/node-story/${uniqueId}`, node);
    return data;
  },

  /**
   * Delete related node
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/node-story/${uniqueId}`);
  },
};

