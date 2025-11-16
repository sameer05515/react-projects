import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemoryMapsService, MemoryMap } from './memory-maps.service';

@Component({
	selector: 'app-memory-maps-list',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<div style="padding:16px;">
			<h2>Memory Maps</h2>
			<div *ngIf="error" style="color:#b91c1c; margin:8px 0;">{{ error }}</div>
			<div *ngIf="loading">Loading...</div>

			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New memory map name" />
				<button type="submit">Create</button>
			</form>

			<table *ngIf="items?.length" border="1" cellpadding="6" cellspacing="0">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let m of items">
						<td>{{ m.uniqueId }}</td>
						<td>{{ m.name }}</td>
					</tr>
				</tbody>
			</table>

			<div *ngIf="!loading && (!items || items.length === 0)" style="margin-top:8px;">No memory maps found.</div>
		</div>
	`
})
export class MemoryMapsListComponent {
	private service = inject(MemoryMapsService);
	items: MemoryMap[] = [];
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
				this.items = data || [];
				this.loading = false;
			},
			error: () => {
				this.error = 'Failed to load memory maps. Is the backend running?';
				this.loading = false;
			}
		});
	}

	create() {
		const name = this.newName.trim();
		if (!name) return;
		this.service.create({ name }).subscribe({
			next: () => {
				this.newName = '';
				this.load();
			},
			error: () => {
				this.error = 'Failed to create memory map.';
			}
		});
	}
}


