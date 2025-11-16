import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';

export interface Topic {
  uniqueId: string;
  name: string;
  parentId?: string;
}

@Injectable({ providedIn: 'root' })
export class TopicsService {
  private api = inject(ApiClientService);

  list(): Observable<Topic[]> {
    return this.api.get<Topic[]>('/topics');
  }

  getById(uniqueId: string): Observable<Topic> {
    return this.api.get<Topic>(`/topics/${uniqueId}`);
  }

  create(topic: Partial<Topic>): Observable<Topic> {
    return this.api.post<Topic>('/topics', topic);
  }

  update(topic: Partial<Topic> & { uniqueId: string }): Observable<Topic> {
    return this.api.put<Topic>(`/topics/${topic.uniqueId}`, topic);
  }
}


