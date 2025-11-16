import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinksService, LinkItem } from './links.service';

@Component({
	selector: 'app-links-list',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<div style="padding:16px;">
			<h2>Links</h2>
			<div *ngIf="error" style="color:#b91c1c; margin:8px 0;">{{ error }}</div>
			<div *ngIf="loading">Loading...</div>

			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="newName" name="name" placeholder="New link name" />
				<input [(ngModel)]="newUrl" name="url" placeholder="https://example.com" />
				<button type="submit">Create</button>
			</form>

			<table *ngIf="links?.length" border="1" cellpadding="6" cellspacing="0">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let l of links">
						<td>{{ l.uniqueId }}</td>
						<td>{{ l.name }}</td>
						<td>
							<a *ngIf="l.linkUrl" [href]="l.linkUrl" target="_blank" rel="noopener">{{ l.linkUrl }}</a>
							<span *ngIf="!l.linkUrl">-</span>
						</td>
					</tr>
				</tbody>
			</table>

			<div *ngIf="!loading && (!links || links.length === 0)" style="margin-top:8px;">No links found.</div>
		</div>
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


