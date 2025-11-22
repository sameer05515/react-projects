import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';
import { Task } from '../../core/models/api.models';

/**
 * Tasks Service
 * Uses the shared Task model from api.models
 * Additional methods can be added here for task-specific logic
 */
@Injectable({ providedIn: 'root' })
export class TasksService {
  private api = inject(ApiClientService);

  list(): Observable<Task[]> {
    return this.api.get<Task[]>('/tasks');
  }

  getById(uniqueId: string): Observable<Task> {
    return this.api.get<Task>(`/tasks/${uniqueId}`);
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.api.post<Task>('/tasks', task);
  }

  update(uniqueId: string, task: Partial<Task>): Observable<Task> {
    return this.api.put<Task>(`/tasks/${uniqueId}`, task);
  }

  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/tasks/${uniqueId}`);
  }

  search(query: string): Observable<Task[]> {
    return this.api.get<Task[]>('/tasks/search', { params: { q: query } });
  }
}


