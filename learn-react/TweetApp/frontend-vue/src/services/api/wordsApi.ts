import { api } from '../apiClient';
import type { Word, PaginatedResponse, ApiResponse } from './types';

/**
 * Words API Service
 * Handles all word-related API calls
 */

export const wordsApi = {
  /**
   * Get paginated list of words
   */
  getAll: async (page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Word>> => {
    const { data } = await api.get<PaginatedResponse<Word>>('/api/words', {
      params: { page, pageSize },
    });
    return data;
  },

  /**
   * Get word by ID
   */
  getById: async (id: string): Promise<Word> => {
    const { data } = await api.get<Word>(`/api/words/${id}`);
    return data;
  },

  /**
   * Create a new word
   */
  create: async (word: Partial<Word>): Promise<Word> => {
    const { data } = await api.post<Word>('/api/words', word);
    return data;
  },

  /**
   * Update word
   */
  update: async (id: string, word: Partial<Word>): Promise<Word> => {
    const { data } = await api.put<Word>(`/api/words/${id}`, word);
    return data;
  },

  /**
   * Delete word
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/words/${id}`);
  },

  /**
   * Search words
   */
  search: async (query: string): Promise<Word[]> => {
    const { data } = await api.get<Word[]>(`/api/words/search?q=${encodeURIComponent(query)}`);
    return data;
  },
};

