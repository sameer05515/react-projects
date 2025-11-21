import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicsService, Topic } from './topics.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiTableComponent } from '../../shared/ui/ui-table.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-topics-list',
	standalone: true,
	imports: [CommonModule, FormsModule, UiCardComponent, UiButtonComponent, UiTableComponent, UiAlertComponent, RouterLink],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Topics</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<form (ngSubmit)="create()" style="margin:12px 0; display:flex; gap:8px; align-items:center;">
				<input [(ngModel)]="search" name="search" placeholder="Search..." (keyup.enter)="applySearch()" />
				<ui-button (click)="applySearch()">Search</ui-button>
				<input [(ngModel)]="newName" name="name" placeholder="New topic name" />
				<ui-button (click)="create()">Create</ui-button>
			</form>
			<ui-table *ngIf="topics?.length" [headers]="['Id','Name','Parent']">
				<tr *ngFor="let t of topics" role="row">
					<td><a [routerLink]="['/topics', t.uniqueId]">{{ t.uniqueId }}</a></td>
					<td><a [routerLink]="['/topics', t.uniqueId]">{{ t.name }}</a></td>
					<td>{{ t.parentId || '-' }}</td>
				</tr>
			</ui-table>
			<div *ngIf="!loading && (!topics || topics.length === 0)" style="margin-top:8px;">No topics found.</div>
		</ui-card>
	`
})
export class TopicsListComponent {
	private service = inject(TopicsService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	topics: Topic[] = [];
	loading = false;
	error: string | null = null;
	newName = '';
	search = '';

	ngOnInit() {
		const q = this.route.snapshot.queryParamMap.get('q') || '';
		this.search = q;
		this.load();
	}

	load() {
		this.loading = true;
		this.error = null;
		const query = this.search?.trim();
		const obs = query ? this.service.search?.(query) ?? this.service.list() : this.service.list();
		obs.subscribe({
			next: (data) => {
				this.topics = data || [];
				this.loading = false;
			},
			error: (err) => {
				this.error = 'Failed to load topics. Is the backend running?';
				this.loading = false;
			}
		});
	}

	applySearch() {
		this.router.navigate([], { queryParams: { q: this.search || null }, queryParamsHandling: 'merge' });
		this.load();
	}

	create() {
		if (!this.newName.trim()) return;
		this.service.create({ name: this.newName.trim() }).subscribe({
			next: () => {
				this.newName = '';
				this.load();
			},
			error: () => {
				this.error = 'Failed to create topic.';
			}
		});
	}
}


