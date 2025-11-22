import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { ThinkTankItem } from '../models/api.models';

/**
 * Think Tank API Service
 * Handles all think tank-related API calls
 */
@Injectable({ providedIn: 'root' })
export class ThinkTankApiService {
  private api = inject(ApiClientService);

  /**
   * Get all think tank items
   */
  getAll(): Observable<ThinkTankItem[]> {
    return this.api.get<ThinkTankItem[]>('/think-tank/v1');
  }

  /**
   * Get think tank item by unique ID
   */
  getById(uniqueId: string): Observable<ThinkTankItem> {
    return this.api.get<ThinkTankItem>(`/think-tank/v1/${uniqueId}`);
  }

  /**
   * Create a new think tank item
   */
  create(item: Partial<ThinkTankItem>): Observable<ThinkTankItem> {
    return this.api.post<ThinkTankItem>('/think-tank/v1', item);
  }

  /**
   * Update think tank item
   */
  update(uniqueId: string, item: Partial<ThinkTankItem>): Observable<ThinkTankItem> {
    return this.api.put<ThinkTankItem>(`/think-tank/v1/${uniqueId}`, item);
  }

  /**
   * Delete think tank item
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/think-tank/v1/${uniqueId}`);
  }

  /**
   * Get think tank statistics
   */
  getStats(): Observable<any> {
    return this.api.get<any>('/think-tank/v1/stats');
  }
}

