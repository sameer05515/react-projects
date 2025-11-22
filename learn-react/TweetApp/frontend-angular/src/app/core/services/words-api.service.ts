import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Word, PaginatedResponse } from '../models/api.models';

/**
 * Words API Service
 * Handles all word-related API calls
 */
@Injectable({ providedIn: 'root' })
export class WordsApiService {
  private api = inject(ApiClientService);

  /**
   * Get paginated list of words
   */
  getAll(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Word>> {
    return this.api.get<PaginatedResponse<Word>>('/api/words', {
      params: { page: String(page), pageSize: String(pageSize) }
    });
  }

  /**
   * Get word by ID
   */
  getById(id: string): Observable<Word> {
    return this.api.get<Word>(`/api/words/${id}`);
  }

  /**
   * Create a new word
   */
  create(word: Partial<Word>): Observable<Word> {
    return this.api.post<Word>('/api/words', word);
  }

  /**
   * Update word
   */
  update(id: string, word: Partial<Word>): Observable<Word> {
    return this.api.put<Word>(`/api/words/${id}`, word);
  }

  /**
   * Delete word
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/api/words/${id}`);
  }

  /**
   * Search words
   */
  search(query: string): Observable<Word[]> {
    return this.api.get<Word[]>('/api/words/search', { params: { q: query } });
  }
}

