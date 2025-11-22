import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';

/**
 * Consolidated Reporting API Service
 * Handles consolidated reporting API calls
 */
@Injectable({ providedIn: 'root' })
export class ConsolidatedReportingApiService {
  private api = inject(ApiClientService);

  /**
   * Get consolidated report
   */
  getReport(params?: Record<string, string | number | boolean>): Observable<any> {
    return this.api.get<any>('/consolidated-reporting', { params });
  }
}

