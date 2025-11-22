import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { MyResume } from '../models/api.models';

/**
 * My Resume API Service
 * Handles all my resume-related API calls
 */
@Injectable({ providedIn: 'root' })
export class MyResumeApiService {
  private api = inject(ApiClientService);

  /**
   * Get my resume
   */
  get(): Observable<MyResume> {
    return this.api.get<MyResume>('/my-resume');
  }

  /**
   * Create or update my resume
   */
  upsert(resume: Partial<MyResume>): Observable<MyResume> {
    return this.api.post<MyResume>('/my-resume', resume);
  }

  /**
   * Update my resume
   */
  update(resume: Partial<MyResume>): Observable<MyResume> {
    return this.api.put<MyResume>('/my-resume', resume);
  }

  /**
   * Delete my resume
   */
  delete(): Observable<void> {
    return this.api.delete<void>('/my-resume');
  }
}

