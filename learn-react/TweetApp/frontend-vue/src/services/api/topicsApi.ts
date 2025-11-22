import { api } from '../apiClient';
import type { Topic, TopicSection, ApiResponse } from './types';

/**
 * Topics API Service
 * Handles all topic-related API calls
 */

export const topicsApi = {
  /**
   * Get all topics
   */
  getAll: async (): Promise<Topic[]> => {
    const { data } = await api.get<Topic[]>('/topics');
    return data;
  },

  /**
   * Get topic by unique ID
   */
  getById: async (uniqueId: string): Promise<Topic> => {
    const { data } = await api.get<Topic>(`/topics/${uniqueId}`);
    return data;
  },

  /**
   * Create a new topic
   */
  create: async (topic: Partial<Topic>): Promise<Topic> => {
    const { data } = await api.post<Topic>('/topics', topic);
    return data;
  },

  /**
   * Update topic
   */
  update: async (uniqueId: string, topic: Partial<Topic>): Promise<Topic> => {
    const { data } = await api.put<Topic>(`/topics/${uniqueId}`, topic);
    return data;
  },

  /**
   * Delete topic
   */
  delete: async (uniqueId: string): Promise<void> => {
    await api.delete(`/topics/${uniqueId}`);
  },

  /**
   * Search topics
   */
  search: async (query: string): Promise<Topic[]> => {
    const { data } = await api.get<Topic[]>(`/topics/search?q=${encodeURIComponent(query)}`);
    return data;
  },

  /**
   * Create topic section
   */
  createSection: async (topicId: string, section: Partial<TopicSection>): Promise<TopicSection> => {
    const { data } = await api.post<TopicSection>(`/topics/${topicId}/sections`, section);
    return data;
  },

  /**
   * Update topic section
   */
  updateSection: async (topicId: string, sectionId: string, section: Partial<TopicSection>): Promise<TopicSection> => {
    const { data } = await api.put<TopicSection>(`/topics/${topicId}/sections/${sectionId}`, section);
    return data;
  },

  /**
   * Delete topic section
   */
  deleteSection: async (topicId: string, sectionId: string): Promise<void> => {
    await api.delete(`/topics/${topicId}/sections/${sectionId}`);
  },
};

