import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Topic, TopicSection } from '../models/api.models';

/**
 * Topics API Service
 * Handles all topic-related API calls
 */
@Injectable({ providedIn: 'root' })
export class TopicsApiService {
  private api = inject(ApiClientService);

  /**
   * Get all topics
   */
  getAll(): Observable<Topic[]> {
    return this.api.get<Topic[]>('/topics');
  }

  /**
   * Get topic by unique ID
   */
  getById(uniqueId: string): Observable<Topic> {
    return this.api.get<Topic>(`/topics/${uniqueId}`);
  }

  /**
   * Create a new topic
   */
  create(topic: Partial<Topic>): Observable<Topic> {
    return this.api.post<Topic>('/topics', topic);
  }

  /**
   * Update topic
   */
  update(uniqueId: string, topic: Partial<Topic>): Observable<Topic> {
    return this.api.put<Topic>(`/topics/${uniqueId}`, topic);
  }

  /**
   * Delete topic
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/topics/${uniqueId}`);
  }

  /**
   * Search topics
   */
  search(query: string): Observable<Topic[]> {
    return this.api.get<Topic[]>('/topics/search', { params: { q: query } });
  }

  /**
   * Create topic section
   */
  createSection(topicId: string, section: Partial<TopicSection>): Observable<TopicSection> {
    return this.api.post<TopicSection>(`/topics/${topicId}/sections`, section);
  }

  /**
   * Update topic section
   */
  updateSection(topicId: string, sectionId: string, section: Partial<TopicSection>): Observable<TopicSection> {
    return this.api.put<TopicSection>(`/topics/${topicId}/sections/${sectionId}`, section);
  }

  /**
   * Delete topic section
   */
  deleteSection(topicId: string, sectionId: string): Observable<void> {
    return this.api.delete<void>(`/topics/${topicId}/sections/${sectionId}`);
  }
}

