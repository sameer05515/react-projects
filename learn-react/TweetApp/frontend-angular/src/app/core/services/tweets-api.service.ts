import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Tweet } from '../models/api.models';

/**
 * Tweets API Service
 * Handles all tweet-related API calls
 */
@Injectable({ providedIn: 'root' })
export class TweetsV1ApiService {
  private api = inject(ApiClientService);

  /**
   * Get all tweets (V1)
   */
  getAll(): Observable<Tweet[]> {
    return this.api.get<Tweet[]>('/tweets/v1');
  }

  /**
   * Get tweet by ID (V1)
   */
  getById(id: string): Observable<Tweet> {
    return this.api.get<Tweet>(`/tweets/v1/${id}`);
  }

  /**
   * Create a new tweet (V1)
   */
  create(tweet: Partial<Tweet>): Observable<Tweet> {
    return this.api.post<Tweet>('/tweets/v1', tweet);
  }

  /**
   * Update tweet (V1)
   */
  update(id: string, tweet: Partial<Tweet>): Observable<Tweet> {
    return this.api.put<Tweet>(`/tweets/v1/${id}`, tweet);
  }

  /**
   * Delete tweet (V1)
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/tweets/v1/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class TweetsV2ApiService {
  private api = inject(ApiClientService);

  /**
   * Get all tweets (V2)
   */
  getAll(): Observable<Tweet[]> {
    return this.api.get<Tweet[]>('/tweets/v2');
  }

  /**
   * Get tweet by ID (V2)
   */
  getById(id: string): Observable<Tweet> {
    return this.api.get<Tweet>(`/tweets/v2/${id}`);
  }

  /**
   * Create a new tweet (V2)
   */
  create(tweet: Partial<Tweet>): Observable<Tweet> {
    return this.api.post<Tweet>('/tweets/v2', tweet);
  }

  /**
   * Update tweet (V2)
   */
  update(id: string, tweet: Partial<Tweet>): Observable<Tweet> {
    return this.api.put<Tweet>(`/tweets/v2/${id}`, tweet);
  }

  /**
   * Delete tweet (V2)
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/tweets/v2/${id}`);
  }
}

