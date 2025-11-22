import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { User, LoginRequest, RegisterRequest, LoginResponse } from '../models/api.models';

/**
 * Users API Service
 * Handles all user-related API calls
 */
@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private api = inject(ApiClientService);

  /**
   * Login user
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('/api/users/login', credentials);
  }

  /**
   * Register new user
   */
  register(userData: RegisterRequest): Observable<User> {
    return this.api.post<User>('/api/users/register', userData);
  }

  /**
   * Get current user
   */
  getMe(): Observable<User> {
    return this.api.get<User>('/api/users/me');
  }

  /**
   * Get user by ID
   */
  getById(id: string): Observable<User> {
    return this.api.get<User>(`/api/users/${id}`);
  }

  /**
   * Update user
   */
  update(id: string, userData: Partial<User>): Observable<User> {
    return this.api.put<User>(`/api/users/${id}`, userData);
  }

  /**
   * Delete user
   */
  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/api/users/${id}`);
  }
}

