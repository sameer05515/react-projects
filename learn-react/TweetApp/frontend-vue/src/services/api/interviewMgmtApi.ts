import { api } from '../apiClient';
import type { InterviewCategory, InterviewQuestion, InterviewAnswer, ApiResponse } from './types';

/**
 * Interview Management API Service
 * Handles all interview management-related API calls
 */

// Interview Management V1 API
export const interviewMgmtV1Api = {
  /**
   * Get all categories (V1)
   */
  getAllCategories: async (): Promise<InterviewCategory[]> => {
    const { data } = await api.get<InterviewCategory[]>('/intvw-mgmt/v1/categories');
    return data;
  },

  /**
   * Get category by unique ID (V1)
   */
  getCategoryById: async (uniqueId: string): Promise<InterviewCategory> => {
    const { data } = await api.get<InterviewCategory>(`/intvw-mgmt/v1/categories/${uniqueId}`);
    return data;
  },

  /**
   * Create a new category (V1)
   */
  createCategory: async (category: Partial<InterviewCategory>): Promise<InterviewCategory> => {
    const { data } = await api.post<InterviewCategory>('/intvw-mgmt/v1/categories', category);
    return data;
  },

  /**
   * Update category (V1)
   */
  updateCategory: async (uniqueId: string, category: Partial<InterviewCategory>): Promise<InterviewCategory> => {
    const { data } = await api.put<InterviewCategory>(`/intvw-mgmt/v1/categories/${uniqueId}`, category);
    return data;
  },

  /**
   * Delete category (V1)
   */
  deleteCategory: async (uniqueId: string): Promise<void> => {
    await api.delete(`/intvw-mgmt/v1/categories/${uniqueId}`);
  },
};

// Interview Management V2 API
export const interviewMgmtV2Api = {
  // Categories
  /**
   * Get all categories (V2)
   */
  getAllCategories: async (): Promise<InterviewCategory[]> => {
    const { data } = await api.get<InterviewCategory[]>('/intvw-mgmt/v2/categories');
    return data;
  },

  /**
   * Get category by unique ID (V2)
   */
  getCategoryById: async (uniqueId: string): Promise<InterviewCategory> => {
    const { data } = await api.get<InterviewCategory>(`/intvw-mgmt/v2/categories/${uniqueId}`);
    return data;
  },

  /**
   * Create a new category (V2)
   */
  createCategory: async (category: Partial<InterviewCategory>): Promise<InterviewCategory> => {
    const { data } = await api.post<InterviewCategory>('/intvw-mgmt/v2/categories', category);
    return data;
  },

  /**
   * Update category (V2)
   */
  updateCategory: async (uniqueId: string, category: Partial<InterviewCategory>): Promise<InterviewCategory> => {
    const { data } = await api.put<InterviewCategory>(`/intvw-mgmt/v2/categories/${uniqueId}`, category);
    return data;
  },

  // Questions
  /**
   * Get all questions (V2)
   */
  getAllQuestions: async (): Promise<InterviewQuestion[]> => {
    const { data } = await api.get<InterviewQuestion[]>('/intvw-mgmt/v2/questions');
    return data;
  },

  /**
   * Get question by unique ID (V2)
   */
  getQuestionById: async (uniqueId: string): Promise<InterviewQuestion> => {
    const { data } = await api.get<InterviewQuestion>(`/intvw-mgmt/v2/questions/${uniqueId}`);
    return data;
  },

  /**
   * Create a new question (V2)
   */
  createQuestion: async (question: Partial<InterviewQuestion>): Promise<InterviewQuestion> => {
    const { data } = await api.post<InterviewQuestion>('/intvw-mgmt/v2/questions', question);
    return data;
  },

  /**
   * Update question (V2)
   */
  updateQuestion: async (uniqueId: string, question: Partial<InterviewQuestion>): Promise<InterviewQuestion> => {
    const { data } = await api.put<InterviewQuestion>(`/intvw-mgmt/v2/questions/${uniqueId}`, question);
    return data;
  },

  /**
   * Delete question (V2)
   */
  deleteQuestion: async (uniqueId: string): Promise<void> => {
    await api.delete(`/intvw-mgmt/v2/questions/${uniqueId}`);
  },

  /**
   * Get questions by category ID (V2)
   */
  getQuestionsByCategoryId: async (categoryId: string): Promise<InterviewQuestion[]> => {
    const { data } = await api.get<InterviewQuestion[]>(`/intvw-mgmt/v2/categories/${categoryId}/questions`);
    return data;
  },

  // Answers
  /**
   * Get all answers (V2)
   */
  getAllAnswers: async (): Promise<InterviewAnswer[]> => {
    const { data } = await api.get<InterviewAnswer[]>('/intvw-mgmt/v2/answers');
    return data;
  },

  /**
   * Get answer by unique ID (V2)
   */
  getAnswerById: async (uniqueId: string): Promise<InterviewAnswer> => {
    const { data } = await api.get<InterviewAnswer>(`/intvw-mgmt/v2/answers/${uniqueId}`);
    return data;
  },

  /**
   * Create a new answer (V2)
   */
  createAnswer: async (answer: Partial<InterviewAnswer>): Promise<InterviewAnswer> => {
    const { data } = await api.post<InterviewAnswer>('/intvw-mgmt/v2/answers', answer);
    return data;
  },

  /**
   * Update answer (V2)
   */
  updateAnswer: async (uniqueId: string, answer: Partial<InterviewAnswer>): Promise<InterviewAnswer> => {
    const { data } = await api.put<InterviewAnswer>(`/intvw-mgmt/v2/answers/${uniqueId}`, answer);
    return data;
  },

  /**
   * Delete answer (V2)
   */
  deleteAnswer: async (uniqueId: string): Promise<void> => {
    await api.delete(`/intvw-mgmt/v2/answers/${uniqueId}`);
  },

  /**
   * Get answers by question ID (V2)
   */
  getAnswersByQuestionId: async (questionId: string): Promise<InterviewAnswer[]> => {
    const { data } = await api.get<InterviewAnswer[]>(`/intvw-mgmt/v2/questions/${questionId}/answers`);
    return data;
  },
};

