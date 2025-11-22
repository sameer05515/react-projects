import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { ComparableObject } from '../models/api.models';

/**
 * Comparable Objects API Service
 * Handles all comparable object-related API calls
 */
@Injectable({ providedIn: 'root' })
export class ComparableObjectsApiService {
  private api = inject(ApiClientService);

  /**
   * Get all comparable objects
   */
  getAll(): Observable<ComparableObject[]> {
    return this.api.get<ComparableObject[]>('/c-objects');
  }

  /**
   * Get comparable object by ID
   */
  getById(id: string): Observable<ComparableObject> {
    return this.api.get<ComparableObject>(`/c-objects/${id}`);
  }

  /**
   * Create a new comparable object
   */
  create(obj: Partial<ComparableObject>): Observable<ComparableObject> {
    return this.api.post<ComparableObject>('/c-objects', obj);
  }

  /**
   * Update comparable object
   */
  update(id: string, obj: Partial<ComparableObject>): Observable<ComparableObject> {
    return this.api.put<ComparableObject>(`/c-objects/${id}`, obj);
  }

  /**
   * Delete comparable object
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/c-objects/${id}`);
  }
}

