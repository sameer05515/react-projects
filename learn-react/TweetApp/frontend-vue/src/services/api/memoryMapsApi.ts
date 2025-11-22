import { api } from '../apiClient';
import type { MemoryMap, ApiResponse } from './types';

/**
 * Memory Maps API Service
 * Handles all memory map-related API calls
 */

export const memoryMapsApi = {
  /**
   * Get all memory maps
   */
  getAll: async (): Promise<MemoryMap[]> => {
    const { data } = await api.get<MemoryMap[]>('/memory-maps');
    return data;
  },

  /**
   * Get memory map by unique ID
   */
  getById: async (uniqueId: string): Promise<MemoryMap> => {
    const { data } = await api.get<MemoryMap>(`/memory-maps/${uniqueId}`);
    return data;
  },

  /**
   * Create a new memory map
   */
  create: async (memoryMap: Partial<MemoryMap>): Promise<MemoryMap> => {
    const { data } = await api.post<MemoryMap>('/memory-maps', memoryMap);
    return data;
  },

  /**
   * Update memory map
   */
  update: async (uniqueId: string, memoryMap: Partial<MemoryMap>): Promise<MemoryMap> => {
    const { data } = await api.put<MemoryMap>(`/memory-maps/${uniqueId}`, memoryMap);
    return data;
  },

  /**
   * Delete memory map
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/memory-maps/${uniqueId}`);
  },

  /**
   * Search memory maps
   */
  search: async (query: string): Promise<MemoryMap[]> => {
    const { data } = await api.get<MemoryMap[]>(`/memory-maps/search?q=${encodeURIComponent(query)}`);
    return data;
  },
};

