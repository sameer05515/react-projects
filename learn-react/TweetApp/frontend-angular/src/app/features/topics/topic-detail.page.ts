import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TopicsService } from './topics.service';
import { Topic } from '../../core/models/api.models';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiBreadcrumbsComponent } from '../../shared/ui/ui-breadcrumbs.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';

@Component({
	selector: 'app-topic-detail-page',
	standalone: true,
	imports: [CommonModule, RouterLink, UiCardComponent, UiBreadcrumbsComponent, UiButtonComponent, UiAlertComponent],
	template: `
		<ui-breadcrumbs [crumbs]="[
			{ label: 'Home', link: '/' },
			{ label: 'Topics', link: '/topics' },
			{ label: topic?.name || '...' }
		]" />
		
		<div *ngIf="loading" style="padding: 24px; text-align: center;">
			<div>Loading topic details...</div>
		</div>

		<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>

		<div *ngIf="topic && !loading" style="display: flex; flex-direction: column; gap: 16px;">
			<!-- Basic Information -->
			<ui-card>
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
					<h2 style="margin: 0;">Topic Details</h2>
					<div style="display: flex; gap: 8px;">
						<ui-button [routerLink]="['/topics', topic.uniqueId, 'edit']">Edit</ui-button>
						<ui-button (click)="deleteTopic()" style="background: #dc2626; color: white;">Delete</ui-button>
					</div>
				</div>
				
				<div style="display: grid; grid-template-columns: auto 1fr; gap: 12px 24px; align-items: start;">
					<strong>Unique ID:</strong>
					<div style="font-family: monospace; font-size: 0.9em; color: #6b7280;">{{ topic.uniqueId }}</div>
					
					<strong>Name:</strong>
					<div style="font-size: 1.1em; font-weight: 500;">{{ topic.name }}</div>
					
					<strong>Description:</strong>
					<div style="white-space: pre-wrap; color: #4b5563;">{{ topic.description || 'No description provided' }}</div>
					
					<strong>Occurrence Date:</strong>
					<div>{{ formatDate(topic.occurenceDate) || 'Not set' }}</div>
					
					<strong>Created At:</strong>
					<div>{{ formatDate(topic['createdAt']) || 'N/A' }}</div>
					
					<strong>Updated At:</strong>
					<div>{{ formatDate(topic['updatedAt']) || 'N/A' }}</div>
				</div>
			</ui-card>

			<!-- Tags -->
			<ui-card *ngIf="topic.tags && topic.tags.length > 0">
				<h3 style="margin: 0 0 12px;">Tags</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 8px;">
					<span *ngFor="let tag of topic.tags" 
						style="display: inline-block; padding: 4px 12px; background: #e5e7eb; border-radius: 16px; font-size: 0.875em;">
						{{ tag }}
					</span>
				</div>
			</ui-card>

			<!-- Sections -->
			<ui-card *ngIf="topic.sections && topic.sections.length > 0">
				<h3 style="margin: 0 0 12px;">Sections ({{ topic.sections.length }})</h3>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<div *ngFor="let section of topic.sections; let i = index" 
						style="padding: 12px; background: #f9fafb; border-radius: 8px; border-left: 3px solid #3b82f6;">
						<div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
							<strong style="color: #1f2937;">{{ section.name || ('Section ' + (i + 1)) }}</strong>
							<span *ngIf="section.uniqueId" style="font-size: 0.75em; color: #6b7280; font-family: monospace;">
								{{ section.uniqueId }}
							</span>
						</div>
						<div *ngIf="section.content" style="color: #4b5563; white-space: pre-wrap; font-size: 0.9em;">
							{{ section.content }}
						</div>
					</div>
				</div>
			</ui-card>

			<!-- Children Topics -->
			<ui-card *ngIf="topic.children && topic.children.length > 0">
				<h3 style="margin: 0 0 12px;">Child Topics ({{ topic.children.length }})</h3>
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<a *ngFor="let child of topic.children" 
						[routerLink]="['/topics', child.uniqueId]"
						style="display: block; padding: 8px 12px; background: #f9fafb; border-radius: 6px; 
							text-decoration: none; color: #2563eb; border: 1px solid #e5e7eb;
							transition: all 0.2s;"
						onmouseover="this.style.background='#f3f4f6'; this.style.borderColor='#3b82f6';"
						onmouseout="this.style.background='#f9fafb'; this.style.borderColor='#e5e7eb';">
						<div style="font-weight: 500;">{{ child.name }}</div>
						<div *ngIf="child.description" style="font-size: 0.875em; color: #6b7280; margin-top: 4px;">
							{{ child.description.length > 100 ? (child.description.substring(0, 100) + '...') : child.description }}
						</div>
					</a>
				</div>
			</ui-card>

			<!-- Ancestors (if available) -->
			<ui-card *ngIf="topic['ancestors'] && topic['ancestors'].length > 0">
				<h3 style="margin: 0 0 12px;">Ancestors</h3>
				<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
					<span *ngFor="let ancestor of topic['ancestors']; let last = last">
						<a *ngIf="ancestor.uniqueId" 
							[routerLink]="['/topics', ancestor.uniqueId]"
							style="color: #2563eb; text-decoration: none; font-weight: 500;">
							{{ ancestor.name }}
						</a>
						<span *ngIf="!ancestor.uniqueId" style="color: #6b7280;">{{ ancestor.name }}</span>
						<span *ngIf="!last" style="color: #9ca3af;">→</span>
					</span>
				</div>
			</ui-card>

			<!-- Additional Metadata -->
			<ui-card *ngIf="topic._id || topic['parentId']">
				<h3 style="margin: 0 0 12px;">Additional Information</h3>
				<div style="display: grid; grid-template-columns: auto 1fr; gap: 12px 24px;">
					<strong *ngIf="topic._id">MongoDB ID:</strong>
					<div *ngIf="topic._id" style="font-family: monospace; font-size: 0.9em; color: #6b7280;">
						{{ topic._id }}
					</div>
					
					<strong *ngIf="topic['parentId']">Parent ID:</strong>
					<div *ngIf="topic['parentId']">
						<a [routerLink]="['/topics', topic['parentId']]" style="color: #2563eb; text-decoration: none;">
							{{ topic['parentId'] }}
						</a>
					</div>
				</div>
			</ui-card>
		</div>
	`,
	styles: [`
		:host {
			display: block;
		}
	`]
})
export class TopicDetailPage {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private service = inject(TopicsService);

	topic: Topic | null = null;
	loading = false;
	error: string | null = null;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (!id) {
			this.error = 'Topic ID is required';
			return;
		}
		
		this.loading = true;
		this.service.getById(id).subscribe({
			next: (data) => { 
				this.topic = data; 
				this.loading = false; 
			},
			error: (err) => { 
				this.error = err?.error?.error || 'Failed to load topic details.'; 
				this.loading = false; 
			}
		});
	}

	formatDate(dateString?: string): string {
		if (!dateString) return '';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
		} catch {
			return dateString;
		}
	}

	deleteTopic() {
		if (!this.topic?.uniqueId) return;
		
		if (!confirm(`Are you sure you want to delete topic "${this.topic.name}"?`)) {
			return;
		}

		this.service.delete(this.topic.uniqueId).subscribe({
			next: () => {
				// Navigate back to topics list
				this.router.navigate(['/topics']);
			},
			error: (err) => {
				this.error = err?.error?.error || 'Failed to delete topic.';
			}
		});
	}
}


