import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Tag } from '../models/api.models';

/**
 * Tags API Service
 * Handles all tag-related API calls
 */
@Injectable({ providedIn: 'root' })
export class TagsApiService {
  private api = inject(ApiClientService);

  /**
   * Get all tags
   */
  getAll(): Observable<Tag[]> {
    return this.api.get<Tag[]>('/tags');
  }

  /**
   * Get tag by unique ID
   */
  getById(uniqueId: string): Observable<Tag> {
    return this.api.get<Tag>(`/tags/${uniqueId}`);
  }

  /**
   * Create a new tag
   */
  create(tag: Partial<Tag>): Observable<Tag> {
    return this.api.post<Tag>('/tags', tag);
  }

  /**
   * Update tag
   */
  update(uniqueId: string, tag: Partial<Tag>): Observable<Tag> {
    return this.api.put<Tag>(`/tags/${uniqueId}`, tag);
  }

  /**
   * Delete tag
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/tags/${uniqueId}`);
  }

  /**
   * Search tags
   */
  search(query: string): Observable<Tag[]> {
    return this.api.get<Tag[]>('/tags/search', { params: { q: query } });
  }
}

