import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
	token: string;
	user?: unknown;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);
	private baseUrl = environment.apiBaseUrl;

	login(email: string, password: string): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.baseUrl}/api/users/login`, { email, password }).pipe(
			tap((res) => {
				if (res?.token) {
					localStorage.setItem('auth_token', res.token);
				}
			})
		);
	}

	logout() {
		localStorage.removeItem('auth_token');
	}

	getToken(): string | null {
		return localStorage.getItem('auth_token');
	}
}


