import { api } from '../apiClient';
import type { Activity, ApiResponse } from './types';

/**
 * Activities API Service
 * Handles all activity-related API calls
 */

export const activitiesApi = {
  /**
   * Get all activities
   */
  getAll: async (): Promise<Activity[]> => {
    const { data } = await api.get<Activity[]>('/activities');
    return data;
  },

  /**
   * Get activity by ID
   */
  getById: async (id: string): Promise<Activity> => {
    const { data } = await api.get<Activity>(`/activities/${id}`);
    return data;
  },

  /**
   * Create a new activity
   */
  create: async (activity: Partial<Activity>): Promise<Activity> => {
    const { data } = await api.post<Activity>('/activities', activity);
    return data;
  },

  /**
   * Update activity
   */
  update: async (id: string, activity: Partial<Activity>): Promise<Activity> => {
    const { data } = await api.put<Activity>(`/activities/${id}`, activity);
    return data;
  },

  /**
   * Delete activity
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/activities/${id}`);
  },
};

