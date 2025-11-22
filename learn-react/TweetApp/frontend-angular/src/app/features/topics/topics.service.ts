import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';
import { Topic } from '../../core/models/api.models';
import { TopicsApiService } from '../../core/services/topics-api.service';

/**
 * Topics Service
 * Uses the shared Topic model from api.models
 * Wraps TopicsApiService for feature-specific logic
 */
@Injectable({ providedIn: 'root' })
export class TopicsService {
  private api = inject(TopicsApiService);

  list(): Observable<Topic[]> {
    return this.api.getAll();
  }

  search(query: string): Observable<Topic[]> {
    return this.api.search(query);
  }

  getById(uniqueId: string): Observable<Topic> {
    return this.api.getById(uniqueId);
  }

  create(topic: Partial<Topic>): Observable<Topic> {
    return this.api.create(topic);
  }

  update(uniqueId: string, topic: Partial<Topic>): Observable<Topic> {
    return this.api.update(uniqueId, topic);
  }

  delete(uniqueId: string): Observable<void> {
    return this.api.delete(uniqueId);
  }
}


