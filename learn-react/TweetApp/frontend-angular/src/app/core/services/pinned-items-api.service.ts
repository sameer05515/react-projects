import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { PinnedItem } from '../models/api.models';

/**
 * Pinned Items API Service
 * Handles all pinned item-related API calls
 */
@Injectable({ providedIn: 'root' })
export class PinnedItemsApiService {
  private api = inject(ApiClientService);

  /**
   * Get all pinned items
   */
  getAll(): Observable<PinnedItem[]> {
    return this.api.get<PinnedItem[]>('/pinned-items');
  }

  /**
   * Get pinned item by unique ID
   */
  getById(uniqueId: string): Observable<PinnedItem> {
    return this.api.get<PinnedItem>(`/pinned-items/${uniqueId}`);
  }

  /**
   * Create a new pinned item
   */
  create(pinnedItem: Partial<PinnedItem>): Observable<PinnedItem> {
    return this.api.post<PinnedItem>('/pinned-items', pinnedItem);
  }

  /**
   * Update pinned item
   */
  update(uniqueId: string, pinnedItem: Partial<PinnedItem>): Observable<PinnedItem> {
    return this.api.put<PinnedItem>(`/pinned-items/${uniqueId}`, pinnedItem);
  }

  /**
   * Delete pinned item
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/pinned-items/${uniqueId}`);
  }
}

