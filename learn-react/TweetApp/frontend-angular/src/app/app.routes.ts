import { Routes } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TopicsService } from './features/topics/topics.service';
import { TasksService } from './features/tasks/tasks.service';
import { TopicsListComponent } from './features/topics/topics-list.component';
import { TasksListComponent } from './features/tasks/tasks-list.component';
import { TagsListComponent } from './features/tags/tags-list.component';
import { LinksListComponent } from './features/links/links-list.component';
import { MemoryMapsListComponent } from './features/memory-maps/memory-maps-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div style="padding: 16px;">
      <h2>Angular API Smoke Test</h2>
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <a routerLink="/topics">Topics</a>
        <a routerLink="/tasks">Tasks</a>
        <a routerLink="/tags">Tags</a>
        <a routerLink="/links">Links</a>
        <a routerLink="/memory-maps">Memory Maps</a>
      </div>
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <button (click)="loadTopics()">Ping Topics</button>
        <button (click)="loadTasks()">Ping Tasks</button>
      </div>
      <pre>{{ data | json }}</pre>
    </div>
  `
})
export class HomeComponent {
  private topics = inject(TopicsService);
  private tasks = inject(TasksService);
  data: unknown = null;
  loadTopics() { this.topics.list().subscribe(d => this.data = d); }
  loadTasks() { this.tasks.list().subscribe(d => this.data = d); }
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'topics', component: TopicsListComponent },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tags', component: TagsListComponent },
  { path: 'links', component: LinksListComponent },
  { path: 'memory-maps', component: MemoryMapsListComponent },
];
