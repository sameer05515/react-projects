import { api } from '../apiClient';
import type { ComparableObject, ApiResponse } from './types';

/**
 * Comparable Objects API Service
 * Handles all comparable object-related API calls
 */

export const comparableObjectsApi = {
  /**
   * Get all comparable objects
   */
  getAll: async (): Promise<ComparableObject[]> => {
    const { data } = await api.get<ComparableObject[]>('/c-objects');
    return data;
  },

  /**
   * Get comparable object by ID
   */
  getById: async (id: string): Promise<ComparableObject> => {
    const { data } = await api.get<ComparableObject>(`/c-objects/${id}`);
    return data;
  },

  /**
   * Create a new comparable object
   */
  create: async (obj: Partial<ComparableObject>): Promise<ComparableObject> => {
    const { data } = await api.post<ComparableObject>('/c-objects', obj);
    return data;
  },

  /**
   * Update comparable object
   */
  update: async (id: string, obj: Partial<ComparableObject>): Promise<ComparableObject> => {
    const { data } = await api.put<ComparableObject>(`/c-objects/${id}`, obj);
    return data;
  },

  /**
   * Delete comparable object
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/c-objects/${id}`);
  },
};

