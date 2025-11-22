import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Link } from '../models/api.models';

/**
 * Links API Service
 * Handles all link-related API calls
 */
@Injectable({ providedIn: 'root' })
export class LinksApiService {
  private api = inject(ApiClientService);

  /**
   * Get all links
   */
  getAll(): Observable<Link[]> {
    return this.api.get<Link[]>('/links');
  }

  /**
   * Get link by unique ID
   */
  getById(uniqueId: string): Observable<Link> {
    return this.api.get<Link>(`/links/${uniqueId}`);
  }

  /**
   * Create a new link
   */
  create(link: Partial<Link>): Observable<Link> {
    return this.api.post<Link>('/links', link);
  }

  /**
   * Update link
   */
  update(uniqueId: string, link: Partial<Link>): Observable<Link> {
    return this.api.put<Link>(`/links/${uniqueId}`, link);
  }

  /**
   * Delete link
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/links/${uniqueId}`);
  }

  /**
   * Get links by parent ID
   */
  getByParentId(parentId: string): Observable<Link[]> {
    return this.api.get<Link[]>(`/links/parent/${parentId}`);
  }
}

