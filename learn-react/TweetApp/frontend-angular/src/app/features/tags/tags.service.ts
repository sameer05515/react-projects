import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';

export interface Tag {
  uniqueId: string;
  name: string;
  parentId?: string;
}

@Injectable({ providedIn: 'root' })
export class TagsService {
  private api = inject(ApiClientService);

  list(): Observable<Tag[]> {
    return this.api.get<Tag[]>('/tags');
  }

  getById(uniqueId: string): Observable<Tag> {
    return this.api.get<Tag>(`/tags/${uniqueId}`);
  }

  create(tag: Partial<Tag>): Observable<Tag> {
    return this.api.post<Tag>('/tags', tag);
  }

  update(tag: Partial<Tag> & { uniqueId: string }): Observable<Tag> {
    return this.api.put<Tag>(`/tags/${tag.uniqueId}`, tag);
  }
}


