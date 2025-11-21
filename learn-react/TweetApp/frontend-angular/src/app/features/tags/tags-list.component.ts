import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsService, Tag } from './tags.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiTableComponent } from '../../shared/ui/ui-table.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';

@Component({
	selector: 'app-tags-list',
	standalone: true,
	imports: [CommonModule, FormsModule, UiCardComponent, UiButtonComponent, UiTableComponent, UiAlertComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Tags</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New tag name" />
				<ui-button (click)="create()">Create</ui-button>
			</form>
			<ui-table *ngIf="tags?.length" [headers]="['Id','Name','Parent']">
				<tr *ngFor="let t of tags">
					<td>{{ t.uniqueId }}</td>
					<td>{{ t.name }}</td>
					<td>{{ t.parentId || '-' }}</td>
				</tr>
			</ui-table>
			<div *ngIf="!loading && (!tags || tags.length === 0)" style="margin-top:8px;">No tags found.</div>
		</ui-card>
	`
})
export class TagsListComponent {
	private service = inject(TagsService);
	tags: Tag[] = [];
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
				this.tags = data || [];
				this.loading = false;
			},
			error: () => {
				this.error = 'Failed to load tags. Is the backend running?';
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
				this.error = 'Failed to create tag.';
			}
		});
	}
}


