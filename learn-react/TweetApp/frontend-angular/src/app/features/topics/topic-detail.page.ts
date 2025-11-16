import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TopicsService, Topic } from './topics.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiBreadcrumbsComponent } from '../../shared/ui/ui-breadcrumbs.component';

@Component({
	selector: 'app-topic-detail-page',
	standalone: true,
	imports: [CommonModule, RouterLink, UiCardComponent, UiBreadcrumbsComponent],
	template: `
		<ui-breadcrumbs [crumbs]="[
			{ label: 'Home', link: '/' },
			{ label: 'Topics', link: '/topics' },
			{ label: topic?.name || '...' }
		]" />
		<ui-card>
			<h2 style="margin:0 0 8px;">Topic Detail</h2>
			<div *ngIf="loading">Loading...</div>
			<div *ngIf="error" style="color:#b91c1c">{{ error }}</div>
			<div *ngIf="topic">
				<div><strong>Id:</strong> {{ topic.uniqueId }}</div>
				<div><strong>Name:</strong> {{ topic.name }}</div>
				<div><strong>Parent:</strong> {{ topic.parentId || '-' }}</div>
			</div>
		</ui-card>
	`
})
export class TopicDetailPage {
	private route = inject(ActivatedRoute);
	private service = inject(TopicsService);

	topic: Topic | null = null;
	loading = false;
	error: string | null = null;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.loading = true;
		this.service.getById(id).subscribe({
			next: (data) => { this.topic = data; this.loading = false; },
			error: () => { this.error = 'Failed to load topic.'; this.loading = false; }
		});
	}
}


