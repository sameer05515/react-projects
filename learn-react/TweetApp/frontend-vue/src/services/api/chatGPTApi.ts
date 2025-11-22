import { api } from '../apiClient';
import type { ChatGPTConversation, ApiResponse } from './types';

/**
 * ChatGPT API Service
 * Handles all ChatGPT conversation-related API calls
 */

export const chatGPTApi = {
  /**
   * Get all ChatGPT conversations
   */
  getAll: async (): Promise<ChatGPTConversation[]> => {
    const { data } = await api.get<ChatGPTConversation[]>('/cgpt');
    return data;
  },

  /**
   * Get ChatGPT conversation by unique ID
   */
  getById: async (uniqueId: string): Promise<ChatGPTConversation> => {
    const { data } = await api.get<ChatGPTConversation>(`/cgpt/${uniqueId}`);
    return data;
  },

  /**
   * Create a new ChatGPT conversation
   */
  create: async (conversation: Partial<ChatGPTConversation>): Promise<ChatGPTConversation> => {
    const { data } = await api.post<ChatGPTConversation>('/cgpt', conversation);
    return data;
  },

  /**
   * Update ChatGPT conversation
   */
  update: async (uniqueId: string, conversation: Partial<ChatGPTConversation>): Promise<ChatGPTConversation> => {
    const { data } = await api.put<ChatGPTConversation>(`/cgpt/${uniqueId}`, conversation);
    return data;
  },

  /**
   * Delete ChatGPT conversation
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/cgpt/${uniqueId}`);
  },
};

