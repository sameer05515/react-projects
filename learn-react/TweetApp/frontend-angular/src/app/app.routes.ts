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
import { AppShellComponent } from './layout/app-shell.component';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';

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
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'topics', loadComponent: () => import('./features/topics/topics-list.component').then(m => m.TopicsListComponent) },
      { path: 'topics/:id', loadComponent: () => import('./features/topics/topic-detail.page').then(m => m.TopicDetailPage) },
      { path: 'topics/:id/edit', canDeactivate: [unsavedChangesGuard], loadComponent: () => import('./features/topics/topic-edit.page').then(m => m.TopicEditPage) },

      { path: 'tasks', loadComponent: () => import('./features/tasks/tasks-list.component').then(m => m.TasksListComponent) },
      { path: 'tasks/:id', loadComponent: () => import('./features/tasks/task-detail.page').then(m => m.TaskDetailPage) },

      { path: 'tags', loadComponent: () => import('./features/tags/tags-list.component').then(m => m.TagsListComponent) },
      { path: 'links', loadComponent: () => import('./features/links/links-list.component').then(m => m.LinksListComponent) },
      { path: 'memory-maps', loadComponent: () => import('./features/memory-maps/memory-maps-list.component').then(m => m.MemoryMapsListComponent) },
    ]
  }
];
