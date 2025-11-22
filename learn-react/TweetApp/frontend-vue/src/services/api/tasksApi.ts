import { api } from '../apiClient';
import type { Task, ApiResponse } from './types';

/**
 * Tasks API Service
 * Handles all task-related API calls
 */

export const tasksApi = {
  /**
   * Get all tasks
   */
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  /**
   * Get task by ID
   */
  getById: async (id: string): Promise<Task> => {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  /**
   * Create a new task
   */
  create: async (task: Partial<Task>): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  /**
   * Update task
   */
  update: async (id: string, task: Partial<Task>): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, task);
    return data;
  },

  /**
   * Delete task
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  /**
   * Search tasks
   */
  search: async (query: string): Promise<Task[]> => {
    const { data } = await api.get<Task[]>(`/tasks/search?q=${encodeURIComponent(query)}`);
    return data;
  },
};

