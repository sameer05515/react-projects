import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService, Task } from './tasks.service';

@Component({
	selector: 'app-tasks-list',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<div style="padding:16px;">
			<h2>Tasks</h2>
			<div *ngIf="error" style="color:#b91c1c; margin:8px 0;">{{ error }}</div>
			<div *ngIf="loading">Loading...</div>

			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New task name" />
				<button type="submit">Create</button>
			</form>

			<table *ngIf="tasks?.length" border="1" cellpadding="6" cellspacing="0">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let t of tasks">
						<td>{{ t.uniqueId }}</td>
						<td>{{ t.name }}</td>
						<td>{{ t.description || '-' }}</td>
					</tr>
				</tbody>
			</table>

			<div *ngIf="!loading && (!tasks || tasks.length === 0)" style="margin-top:8px;">No tasks found.</div>
		</div>
	`
})
export class TasksListComponent {
	private service = inject(TasksService);
	tasks: Task[] = [];
	loading = false;
	error: string | null = null;
	newName = '';

	ngOnInit() {
		this.load();
	}

	load() {
		this.loading = true;
		this.error = null;
		this.service.list().subscribe({
			next: (data) => {
				this.tasks = data || [];
				this.loading = false;
			},
			error: () => {
				this.error = 'Failed to load tasks. Is the backend running?';
				this.loading = false;
			}
		});
	}

	create() {
		if (!this.newName.trim()) return;
		this.service.create({ name: this.newName.trim() }).subscribe({
			next: () => {
				this.newName = '';
				this.load();
			},
			error: () => {
				this.error = 'Failed to create task.';
			}
		});
	}
}


