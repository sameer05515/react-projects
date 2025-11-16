import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinksService, LinkItem } from './links.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiTableComponent } from '../../shared/ui/ui-table.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';

@Component({
	selector: 'app-links-list',
	standalone: true,
	imports: [CommonModule, FormsModule, UiCardComponent, UiButtonComponent, UiTableComponent, UiAlertComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Links</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New link name" />
				<input [(ngModel)]="newUrl" name="url" placeholder="https://example.com" />
				<ui-button (click)="create()">Create</ui-button>
			</form>
			<ui-table *ngIf="links?.length" [headers]="['Id','Name','URL']">
				<tr *ngFor="let l of links">
					<td>{{ l.uniqueId }}</td>
					<td>{{ l.name }}</td>
					<td>
						<a *ngIf="l.linkUrl" [href]="l.linkUrl" target="_blank" rel="noopener">{{ l.linkUrl }}</a>
						<span *ngIf="!l.linkUrl">-</span>
					</td>
				</tr>
			</ui-table>
			<div *ngIf="!loading && (!links || links.length === 0)" style="margin-top:8px;">No links found.</div>
		</ui-card>
	`
})
export class LinksListComponent {
	private service = inject(LinksService);
	links: LinkItem[] = [];
	loading = false;
	error: string | null = null;
	newName = '';
	newUrl = '';

	ngOnInit() {
		this.load();
	}

	load() {
		this.loading = true;
		this.error = null;
		this.service.list().subscribe({
			next: (data) => {
				this.links = data || [];
				this.loading = false;
			},
			error: () => {
				this.error = 'Failed to load links. Is the backend running?';
				this.loading = false;
			}
		});
	}

	create() {
		const name = this.newName.trim();
		if (!name) return;
		this.service.create({ name, linkUrl: this.newUrl.trim() || undefined }).subscribe({
			next: () => {
				this.newName = '';
				this.newUrl = '';
				this.load();
			},
			error: () => {
				this.error = 'Failed to create link.';
			}
		});
	}
}


