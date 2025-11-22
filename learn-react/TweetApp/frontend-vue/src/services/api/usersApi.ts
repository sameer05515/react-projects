import { api } from '../apiClient';
import type { User, LoginRequest, RegisterRequest, LoginResponse, ApiResponse } from './types';

/**
 * Users API Service
 * Handles all user-related API calls
 */

export const usersApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/api/users/login', credentials);
    return data;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<User> => {
    const { data } = await api.post<User>('/api/users/register', userData);
    return data;
  },

  /**
   * Get current user
   */
  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>('/api/users/me');
    return data;
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/api/users/${id}`);
    return data;
  },

  /**
   * Update user
   */
  update: async (id: string, userData: Partial<User>): Promise<User> => {
    const { data } = await api.put<User>(`/api/users/${id}`, userData);
    return data;
  },

  /**
   * Delete user
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  },
};

