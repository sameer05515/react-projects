import { api } from '../apiClient';
import type { Link, ApiResponse } from './types';

/**
 * Links API Service
 * Handles all link-related API calls
 */

export const linksApi = {
  /**
   * Get all links
   */
  getAll: async (): Promise<Link[]> => {
    const { data } = await api.get<Link[]>('/links');
    return data;
  },

  /**
   * Get link by unique ID
   */
  getById: async (uniqueId: string): Promise<Link> => {
    const { data } = await api.get<Link>(`/links/${uniqueId}`);
    return data;
  },

  /**
   * Create a new link
   */
  create: async (link: Partial<Link>): Promise<Link> => {
    const { data } = await api.post<Link>('/links', link);
    return data;
  },

  /**
   * Update link
   */
  update: async (uniqueId: string, link: Partial<Link>): Promise<Link> => {
    const { data } = await api.put<Link>(`/links/${uniqueId}`, link);
    return data;
  },

  /**
   * Delete link
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/links/${uniqueId}`);
  },

  /**
   * Get links by parent ID
   */
  getByParentId: async (parentId: string): Promise<Link[]> => {
    const { data } = await api.get<Link[]>(`/links/parent/${parentId}`);
    return data;
  },
};

