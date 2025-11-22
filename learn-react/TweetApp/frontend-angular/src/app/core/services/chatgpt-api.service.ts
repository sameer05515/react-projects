import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { ChatGPTConversation } from '../models/api.models';

/**
 * ChatGPT API Service
 * Handles all ChatGPT conversation-related API calls
 */
@Injectable({ providedIn: 'root' })
export class ChatGPTApiService {
  private api = inject(ApiClientService);

  /**
   * Get all ChatGPT conversations
   */
  getAll(): Observable<ChatGPTConversation[]> {
    return this.api.get<ChatGPTConversation[]>('/cgpt');
  }

  /**
   * Get ChatGPT conversation by unique ID
   */
  getById(uniqueId: string): Observable<ChatGPTConversation> {
    return this.api.get<ChatGPTConversation>(`/cgpt/${uniqueId}`);
  }

  /**
   * Create a new ChatGPT conversation
   */
  create(conversation: Partial<ChatGPTConversation>): Observable<ChatGPTConversation> {
    return this.api.post<ChatGPTConversation>('/cgpt', conversation);
  }

  /**
   * Update ChatGPT conversation
   */
  update(uniqueId: string, conversation: Partial<ChatGPTConversation>): Observable<ChatGPTConversation> {
    return this.api.put<ChatGPTConversation>(`/cgpt/${uniqueId}`, conversation);
  }

  /**
   * Delete ChatGPT conversation
   */
  delete(uniqueId: string): Observable<void> {
    return this.api.delete<void>(`/cgpt/${uniqueId}`);
  }
}

