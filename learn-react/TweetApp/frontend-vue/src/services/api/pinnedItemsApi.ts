import { api } from '../apiClient';
import type { PinnedItem, ApiResponse } from './types';

/**
 * Pinned Items API Service
 * Handles all pinned item-related API calls
 */

export const pinnedItemsApi = {
  /**
   * Get all pinned items
   */
  getAll: async (): Promise<PinnedItem[]> => {
    const { data } = await api.get<PinnedItem[]>('/pinned-items');
    return data;
  },

  /**
   * Get pinned item by unique ID
   */
  getById: async (uniqueId: string): Promise<PinnedItem> => {
    const { data } = await api.get<PinnedItem>(`/pinned-items/${uniqueId}`);
    return data;
  },

  /**
   * Create a new pinned item
   */
  create: async (pinnedItem: Partial<PinnedItem>): Promise<PinnedItem> => {
    const { data } = await api.post<PinnedItem>('/pinned-items', pinnedItem);
    return data;
  },

  /**
   * Update pinned item
   */
  update: async (uniqueId: string, pinnedItem: Partial<PinnedItem>): Promise<PinnedItem> => {
    const { data } = await api.put<PinnedItem>(`/pinned-items/${uniqueId}`, pinnedItem);
    return data;
  },

  /**
   * Delete pinned item
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/pinned-items/${uniqueId}`);
  },
};

