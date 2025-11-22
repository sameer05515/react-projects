import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { MemoryMap } from '../models/api.models';

/**
 * Memory Maps API Service
 * Handles all memory map-related API calls
 */
@Injectable({ providedIn: 'root' })
export class MemoryMapsApiService {
  private api = inject(ApiClientService);

  /**
   * Get all memory maps
   */
  getAll(): Observable<MemoryMap[]> {
    return this.api.get<MemoryMap[]>('/memory-maps');
  }

  /**
   * Get memory map by unique ID
   */
  getById(uniqueId: string): Observable<MemoryMap> {
    return this.api.get<MemoryMap>(`/memory-maps/${uniqueId}`);
  }

  /**
   * Create a new memory map
   */
  create(memoryMap: Partial<MemoryMap>): Observable<MemoryMap> {
    return this.api.post<MemoryMap>('/memory-maps', memoryMap);
  }

  /**
   * Update memory map
   */
  update(uniqueId: string, memoryMap: Partial<MemoryMap>): Observable<MemoryMap> {
    return this.api.put<MemoryMap>(`/memory-maps/${uniqueId}`, memoryMap);
  }

  /**
   * Delete memory map
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/memory-maps/${uniqueId}`);
  }

  /**
   * Search memory maps
   */
  search(query: string): Observable<MemoryMap[]> {
    return this.api.get<MemoryMap[]>('/memory-maps/search', { params: { q: query } });
  }
}

