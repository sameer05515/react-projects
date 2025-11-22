import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { InterviewCategory, InterviewQuestion, InterviewAnswer } from '../models/api.models';

/**
 * Interview Management API Service
 * Handles all interview management-related API calls
 */

// Interview Management V1 API
@Injectable({ providedIn: 'root' })
export class InterviewMgmtV1ApiService {
  private api = inject(ApiClientService);

  /**
   * Get all categories (V1)
   */
  getAllCategories(): Observable<InterviewCategory[]> {
    return this.api.get<InterviewCategory[]>('/intvw-mgmt/v1/categories');
  }

  /**
   * Get category by unique ID (V1)
   */
  getCategoryById(uniqueId: string): Observable<InterviewCategory> {
    return this.api.get<InterviewCategory>(`/intvw-mgmt/v1/categories/${uniqueId}`);
  }

  /**
   * Create a new category (V1)
   */
  createCategory(category: Partial<InterviewCategory>): Observable<InterviewCategory> {
    return this.api.post<InterviewCategory>('/intvw-mgmt/v1/categories', category);
  }

  /**
   * Update category (V1)
   */
  updateCategory(uniqueId: string, category: Partial<InterviewCategory>): Observable<InterviewCategory> {
    return this.api.put<InterviewCategory>(`/intvw-mgmt/v1/categories/${uniqueId}`, category);
  }

  /**
   * Delete category (V1)
   */
  deleteCategory(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/intvw-mgmt/v1/categories/${uniqueId}`);
  }
}

// Interview Management V2 API
@Injectable({ providedIn: 'root' })
export class InterviewMgmtV2ApiService {
  private api = inject(ApiClientService);

  // Categories
  /**
   * Get all categories (V2)
   */
  getAllCategories(): Observable<InterviewCategory[]> {
    return this.api.get<InterviewCategory[]>('/intvw-mgmt/v2/categories');
  }

  /**
   * Get category by unique ID (V2)
   */
  getCategoryById(uniqueId: string): Observable<InterviewCategory> {
    return this.api.get<InterviewCategory>(`/intvw-mgmt/v2/categories/${uniqueId}`);
  }

  /**
   * Create a new category (V2)
   */
  createCategory(category: Partial<InterviewCategory>): Observable<InterviewCategory> {
    return this.api.post<InterviewCategory>('/intvw-mgmt/v2/categories', category);
  }

  /**
   * Update category (V2)
   */
  updateCategory(uniqueId: string, category: Partial<InterviewCategory>): Observable<InterviewCategory> {
    return this.api.put<InterviewCategory>(`/intvw-mgmt/v2/categories/${uniqueId}`, category);
  }

  /**
   * Delete category (V2)
   */
  deleteCategory(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/intvw-mgmt/v2/categories/${uniqueId}`);
  }

  // Questions
  /**
   * Get all questions (V2)
   */
  getAllQuestions(): Observable<InterviewQuestion[]> {
    return this.api.get<InterviewQuestion[]>('/intvw-mgmt/v2/questions');
  }

  /**
   * Get question by unique ID (V2)
   */
  getQuestionById(uniqueId: string): Observable<InterviewQuestion> {
    return this.api.get<InterviewQuestion>(`/intvw-mgmt/v2/questions/${uniqueId}`);
  }

  /**
   * Create a new question (V2)
   */
  createQuestion(question: Partial<InterviewQuestion>): Observable<InterviewQuestion> {
    return this.api.post<InterviewQuestion>('/intvw-mgmt/v2/questions', question);
  }

  /**
   * Update question (V2)
   */
  updateQuestion(uniqueId: string, question: Partial<InterviewQuestion>): Observable<InterviewQuestion> {
    return this.api.put<InterviewQuestion>(`/intvw-mgmt/v2/questions/${uniqueId}`, question);
  }

  /**
   * Delete question (V2)
   */
  deleteQuestion(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/intvw-mgmt/v2/questions/${uniqueId}`);
  }

  /**
   * Get questions by category ID (V2)
   */
  getQuestionsByCategoryId(categoryId: string): Observable<InterviewQuestion[]> {
    return this.api.get<InterviewQuestion[]>(`/intvw-mgmt/v2/categories/${categoryId}/questions`);
  }

  // Answers
  /**
   * Get all answers (V2)
   */
  getAllAnswers(): Observable<InterviewAnswer[]> {
    return this.api.get<InterviewAnswer[]>('/intvw-mgmt/v2/answers');
  }

  /**
   * Get answer by unique ID (V2)
   */
  getAnswerById(uniqueId: string): Observable<InterviewAnswer> {
    return this.api.get<InterviewAnswer>(`/intvw-mgmt/v2/answers/${uniqueId}`);
  }

  /**
   * Create a new answer (V2)
   */
  createAnswer(answer: Partial<InterviewAnswer>): Observable<InterviewAnswer> {
    return this.api.post<InterviewAnswer>('/intvw-mgmt/v2/answers', answer);
  }

  /**
   * Update answer (V2)
   */
  updateAnswer(uniqueId: string, answer: Partial<InterviewAnswer>): Observable<InterviewAnswer> {
    return this.api.put<InterviewAnswer>(`/intvw-mgmt/v2/answers/${uniqueId}`, answer);
  }

  /**
   * Delete answer (V2)
   */
  deleteAnswer(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/intvw-mgmt/v2/answers/${uniqueId}`);
  }

  /**
   * Get answers by question ID (V2)
   */
  getAnswersByQuestionId(questionId: string): Observable<InterviewAnswer[]> {
    return this.api.get<InterviewAnswer[]>(`/intvw-mgmt/v2/questions/${questionId}/answers`);
  }
}

