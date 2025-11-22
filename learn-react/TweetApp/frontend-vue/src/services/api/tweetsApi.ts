import { api } from '../apiClient';
import type { Tweet, ApiResponse } from './types';

/**
 * Tweets API Service
 * Handles all tweet-related API calls
 */

// Tweet V1 API
export const tweetsV1Api = {
  /**
   * Get all tweets (V1)
   */
  getAll: async (): Promise<Tweet[]> => {
    const { data } = await api.get<Tweet[]>('/tweets/v1');
    return data;
  },

  /**
   * Get tweet by ID (V1)
   */
  getById: async (id: string): Promise<Tweet> => {
    const { data } = await api.get<Tweet>(`/tweets/v1/${id}`);
    return data;
  },

  /**
   * Create a new tweet (V1)
   */
  create: async (tweet: Partial<Tweet>): Promise<Tweet> => {
    const { data } = await api.post<Tweet>('/tweets/v1', tweet);
    return data;
  },

  /**
   * Update tweet (V1)
   */
  update: async (id: string, tweet: Partial<Tweet>): Promise<Tweet> => {
    const { data } = await api.put<Tweet>(`/tweets/v1/${id}`, tweet);
    return data;
  },

  /**
   * Delete tweet (V1)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tweets/v1/${id}`);
  },
};

// Tweet V2 API
export const tweetsV2Api = {
  /**
   * Get all tweets (V2)
   */
  getAll: async (): Promise<Tweet[]> => {
    const { data } = await api.get<Tweet[]>('/tweets/v2');
    return data;
  },

  /**
   * Get tweet by ID (V2)
   */
  getById: async (id: string): Promise<Tweet> => {
    const { data } = await api.get<Tweet>(`/tweets/v2/${id}`);
    return data;
  },

  /**
   * Create a new tweet (V2)
   */
  create: async (tweet: Partial<Tweet>): Promise<Tweet> => {
    const { data } = await api.post<Tweet>('/tweets/v2', tweet);
    return data;
  },

  /**
   * Update tweet (V2)
   */
  update: async (id: string, tweet: Partial<Tweet>): Promise<Tweet> => {
    const { data } = await api.put<Tweet>(`/tweets/v2/${id}`, tweet);
    return data;
  },

  /**
   * Delete tweet (V2)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tweets/v2/${id}`);
  },
};

