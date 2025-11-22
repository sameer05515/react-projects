import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from './tasks.service';
import { Task } from '../../core/models/api.models';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiTableComponent } from '../../shared/ui/ui-table.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';

@Component({
	selector: 'app-tasks-list',
	standalone: true,
	imports: [CommonModule, FormsModule, UiCardComponent, UiButtonComponent, UiTableComponent, UiAlertComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Tasks</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New task name" />
				<ui-button (click)="create()">Create</ui-button>
			</form>
			<ui-table *ngIf="tasks?.length" [headers]="['Id','Name','Description']">
				<tr *ngFor="let t of tasks">
					<td>{{ t.uniqueId }}</td>
					<td>{{ t.name }}</td>
					<td>{{ t.description || '-' }}</td>
				</tr>
			</ui-table>
			<div *ngIf="!loading && (!tasks || tasks.length === 0)" style="margin-top:8px;">No tasks found.</div>
		</ui-card>
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


