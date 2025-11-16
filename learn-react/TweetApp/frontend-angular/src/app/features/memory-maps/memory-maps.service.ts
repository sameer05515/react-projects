import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/services/api-client.service';

export interface MemoryMap {
  uniqueId: string;
  name: string;
  skeleton?: string;
}

@Injectable({ providedIn: 'root' })
export class MemoryMapsService {
  private api = inject(ApiClientService);

  list(): Observable<MemoryMap[]> {
    return this.api.get<MemoryMap[]>('/memory-maps');
  }

  getById(uniqueId: string): Observable<MemoryMap> {
    return this.api.get<MemoryMap>(`/memory-maps/${uniqueId}`);
  }

  create(mm: Partial<MemoryMap>): Observable<MemoryMap> {
    return this.api.post<MemoryMap>('/memory-maps', mm);
  }

  update(mm: Partial<MemoryMap> & { uniqueId: string }): Observable<MemoryMap> {
    return this.api.put<MemoryMap>(`/memory-maps/${mm.uniqueId}`, mm);
  }
}


