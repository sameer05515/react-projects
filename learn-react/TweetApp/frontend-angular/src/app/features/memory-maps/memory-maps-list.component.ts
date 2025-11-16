import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemoryMapsService, MemoryMap } from './memory-maps.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiTableComponent } from '../../shared/ui/ui-table.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';

@Component({
	selector: 'app-memory-maps-list',
	standalone: true,
	imports: [CommonModule, FormsModule, UiCardComponent, UiButtonComponent, UiTableComponent, UiAlertComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Memory Maps</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New memory map name" />
				<ui-button (click)="create()">Create</ui-button>
			</form>
			<ui-table *ngIf="items?.length" [headers]="['Id','Name']">
				<tr *ngFor="let m of items">
					<td>{{ m.uniqueId }}</td>
					<td>{{ m.name }}</td>
				</tr>
			</ui-table>
			<div *ngIf="!loading && (!items || items.length === 0)" style="margin-top:8px;">No memory maps found.</div>
		</ui-card>
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


