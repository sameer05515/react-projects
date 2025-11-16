import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
  body?: unknown;
}

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private toHttpParams(params?: RequestOptions['params']): HttpParams | undefined {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  private toHttpHeaders(headers?: RequestOptions['headers']): HttpHeaders | undefined {
    if (!headers) return undefined;
    let httpHeaders = new HttpHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      httpHeaders = httpHeaders.set(key, value);
    });
    return httpHeaders;
  }

  get<T>(path: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      params: this.toHttpParams(options?.params),
      headers: this.toHttpHeaders(options?.headers),
    });
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, {
      params: this.toHttpParams(options?.params),
      headers: this.toHttpHeaders(options?.headers),
    });
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, {
      params: this.toHttpParams(options?.params),
      headers: this.toHttpHeaders(options?.headers),
    });
  }

  delete<T>(path: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, {
      params: this.toHttpParams(options?.params),
      headers: this.toHttpHeaders(options?.headers),
    });
  }
}


