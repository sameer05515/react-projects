import { api } from '../apiClient';
import type { Tag, ApiResponse } from './types';

/**
 * Tags API Service
 * Handles all tag-related API calls
 */

export const tagsApi = {
  /**
   * Get all tags
   */
  getAll: async (): Promise<Tag[]> => {
    const { data } = await api.get<Tag[]>('/tags');
    return data;
  },

  /**
   * Get tag by unique ID
   */
  getById: async (uniqueId: string): Promise<Tag> => {
    const { data } = await api.get<Tag>(`/tags/${uniqueId}`);
    return data;
  },

  /**
   * Create a new tag
   */
  create: async (tag: Partial<Tag>): Promise<Tag> => {
    const { data } = await api.post<Tag>('/tags', tag);
    return data;
  },

  /**
   * Update tag
   */
  update: async (uniqueId: string, tag: Partial<Tag>): Promise<Tag> => {
    const { data } = await api.put<Tag>(`/tags/${uniqueId}`, tag);
    return data;
  },

  /**
   * Delete tag
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/tags/${uniqueId}`);
  },

  /**
   * Search tags
   */
  search: async (query: string): Promise<Tag[]> => {
    const { data } = await api.get<Tag[]>(`/tags/search?q=${encodeURIComponent(query)}`);
    return data;
  },
};

