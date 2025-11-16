import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsService, Tag } from './tags.service';

@Component({
	selector: 'app-tags-list',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<div style="padding:16px;">
			<h2>Tags</h2>
			<div *ngIf="error" style="color:#b91c1c; margin:8px 0;">{{ error }}</div>
			<div *ngIf="loading">Loading...</div>

			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New tag name" />
				<button type="submit">Create</button>
			</form>

			<table *ngIf="tags?.length" border="1" cellpadding="6" cellspacing="0">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Parent</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let t of tags">
						<td>{{ t.uniqueId }}</td>
						<td>{{ t.name }}</td>
						<td>{{ t.parentId || '-' }}</td>
					</tr>
				</tbody>
			</table>

			<div *ngIf="!loading && (!tags || tags.length === 0)" style="margin-top:8px;">No tags found.</div>
		</div>
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


