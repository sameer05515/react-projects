import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';

export interface Task {
  uniqueId: string;
  name: string;
  description?: string;
}

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

  update(task: Partial<Task> & { uniqueId: string }): Observable<Task> {
    return this.api.put<Task>(`/tasks/${task.uniqueId}`, task);
  }
}


