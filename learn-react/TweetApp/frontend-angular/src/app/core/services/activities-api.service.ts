import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Activity } from '../models/api.models';

/**
 * Activities API Service
 * Handles all activity-related API calls
 */
@Injectable({ providedIn: 'root' })
export class ActivitiesApiService {
  private api = inject(ApiClientService);

  /**
   * Get all activities
   */
  getAll(): Observable<Activity[]> {
    return this.api.get<Activity[]>('/activities');
  }

  /**
   * Get activity by ID
   */
  getById(id: string): Observable<Activity> {
    return this.api.get<Activity>(`/activities/${id}`);
  }

  /**
   * Create a new activity
   */
  create(activity: Partial<Activity>): Observable<Activity> {
    return this.api.post<Activity>('/activities', activity);
  }

  /**
   * Update activity
   */
  update(id: string, activity: Partial<Activity>): Observable<Activity> {
    return this.api.put<Activity>(`/activities/${id}`, activity);
  }

  /**
   * Delete activity
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/activities/${id}`);
  }
}

