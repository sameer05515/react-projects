import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { RelatedNode } from '../models/api.models';

/**
 * Related Nodes API Service
 * Handles all related node-related API calls
 */
@Injectable({ providedIn: 'root' })
export class RelatedNodesApiService {
  private api = inject(ApiClientService);

  /**
   * Get all related nodes
   */
  getAll(): Observable<RelatedNode[]> {
    return this.api.get<RelatedNode[]>('/node-story');
  }

  /**
   * Get related node by unique ID
   */
  getById(uniqueId: string): Observable<RelatedNode> {
    return this.api.get<RelatedNode>(`/node-story/${uniqueId}`);
  }

  /**
   * Create a new related node
   */
  create(node: Partial<RelatedNode>): Observable<RelatedNode> {
    return this.api.post<RelatedNode>('/node-story', node);
  }

  /**
   * Update related node
   */
  update(uniqueId: string, node: Partial<RelatedNode>): Observable<RelatedNode> {
    return this.api.put<RelatedNode>(`/node-story/${uniqueId}`, node);
  }

  /**
   * Delete related node
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/node-story/${uniqueId}`);
  }
}

