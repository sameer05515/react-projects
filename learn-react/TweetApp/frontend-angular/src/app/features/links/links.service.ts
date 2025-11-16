import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';

export interface LinkItem {
  uniqueId: string;
  name: string;
  linkUrl?: string;
  parentId?: string;
}

@Injectable({ providedIn: 'root' })
export class LinksService {
  private api = inject(ApiClientService);

  list(): Observable<LinkItem[]> {
    return this.api.get<LinkItem[]>('/links');
  }

  getById(uniqueId: string): Observable<LinkItem> {
    return this.api.get<LinkItem>(`/links/${uniqueId}`);
  }

  create(link: Partial<LinkItem>): Observable<LinkItem> {
    return this.api.post<LinkItem>('/links', link);
  }

  update(link: Partial<LinkItem> & { uniqueId: string }): Observable<LinkItem> {
    return this.api.put<LinkItem>(`/links/${link.uniqueId}`, link);
  }
}


