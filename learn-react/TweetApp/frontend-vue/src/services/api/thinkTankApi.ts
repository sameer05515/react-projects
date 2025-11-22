import { api } from '../apiClient';
import type { ThinkTankItem, ApiResponse } from './types';

/**
 * Think Tank API Service
 * Handles all think tank-related API calls
 */

export const thinkTankApi = {
  /**
   * Get all think tank items
   */
  getAll: async (): Promise<ThinkTankItem[]> => {
    const { data } = await api.get<ThinkTankItem[]>('/think-tank/v1');
    return data;
  },

  /**
   * Get think tank item by unique ID
   */
  getById: async (uniqueId: string): Promise<ThinkTankItem> => {
    const { data } = await api.get<ThinkTankItem>(`/think-tank/v1/${uniqueId}`);
    return data;
  },

  /**
   * Create a new think tank item
   */
  create: async (item: Partial<ThinkTankItem>): Promise<ThinkTankItem> => {
    const { data } = await api.post<ThinkTankItem>('/think-tank/v1', item);
    return data;
  },

  /**
   * Update think tank item
   */
  update: async (uniqueId: string, item: Partial<ThinkTankItem>): Promise<ThinkTankItem> => {
    const { data } = await api.put<ThinkTankItem>(`/think-tank/v1/${uniqueId}`, item);
    return data;
  },

  /**
   * Delete think tank item
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/think-tank/v1/${uniqueId}`);
  },

  /**
   * Get think tank statistics
   */
  getStats: async (): Promise<any> => {
    const { data } = await api.get<any>('/think-tank/v1/stats');
    return data;
  },
};

