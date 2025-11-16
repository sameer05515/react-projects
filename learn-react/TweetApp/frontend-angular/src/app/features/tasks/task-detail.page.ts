import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TasksService, Task } from './tasks.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiBreadcrumbsComponent } from '../../shared/ui/ui-breadcrumbs.component';

@Component({
	selector: 'app-task-detail-page',
	standalone: true,
	imports: [CommonModule, RouterLink, UiCardComponent, UiBreadcrumbsComponent],
	template: `
		<ui-breadcrumbs [crumbs]="[
			{ label: 'Home', link: '/' },
			{ label: 'Tasks', link: '/tasks' },
			{ label: task?.name || '...' }
		]" />
		<ui-card>
			<h2 style="margin:0 0 8px;">Task Detail</h2>
			<div *ngIf="loading">Loading...</div>
			<div *ngIf="error" style="color:#b91c1c">{{ error }}</div>
			<div *ngIf="task">
				<div><strong>Id:</strong> {{ task.uniqueId }}</div>
				<div><strong>Name:</strong> {{ task.name }}</div>
				<div><strong>Description:</strong> {{ task.description || '-' }}</div>
			</div>
		</ui-card>
	`
})
export class TaskDetailPage {
	private route = inject(ActivatedRoute);
	private service = inject(TasksService);

	task: Task | null = null;
	loading = false;
	error: string | null = null;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.loading = true;
		this.service.getById(id).subscribe({
			next: (data) => { this.task = data; this.loading = false; },
			error: () => { this.error = 'Failed to load task.'; this.loading = false; }
		});
	}
}


