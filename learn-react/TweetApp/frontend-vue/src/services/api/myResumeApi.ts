import { api } from '../apiClient';
import type { MyResume, ApiResponse } from './types';

/**
 * My Resume API Service
 * Handles all my resume-related API calls
 */

export const myResumeApi = {
  /**
   * Get my resume
   */
  get: async (): Promise<MyResume> => {
    const { data } = await api.get<MyResume>('/my-resume');
    return data;
  },

  /**
   * Create or update my resume
   */
  upsert: async (resume: Partial<MyResume>): Promise<MyResume> => {
    const { data } = await api.post<MyResume>('/my-resume', resume);
    return data;
  },

  /**
   * Update my resume
   */
  update: async (resume: Partial<MyResume>): Promise<MyResume> => {
    const { data } = await api.put<MyResume>('/my-resume', resume);
    return data;
  },

  /**
   * Delete my resume
   */
  delete: async (): Promise<void> => {
    await api.delete('/my-resume');
  },
};

