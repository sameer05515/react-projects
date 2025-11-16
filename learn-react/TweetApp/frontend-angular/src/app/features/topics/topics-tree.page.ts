import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService, Topic } from './topics.service';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';
import { UiTreeComponent, TreeNode } from '../../shared/ui/ui-tree.component';

@Component({
	selector: 'app-topics-tree-page',
	standalone: true,
	imports: [CommonModule, UiCardComponent, UiAlertComponent, UiTreeComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Topics Tree</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<ui-tree *ngIf="tree?.length" [nodes]="tree" />
			<div *ngIf="!loading && (!tree || tree.length===0)">No topics found.</div>
		</ui-card>
	`
})
export class TopicsTreePage {
	private service = inject(TopicsService);
	loading = false;
	error: string | null = null;
	tree: TreeNode[] = [];

	ngOnInit() {
		this.loading = true;
		this.service.list().subscribe({
			next: (topics) => {
				this.tree = this.buildTree(topics || []);
				this.loading = false;
			},
			error: () => { this.error = 'Failed to load topics.'; this.loading = false; }
		});
	}

	private buildTree(items: Topic[]): TreeNode[] {
		const idToChildren = new Map<string, Topic[]>();
		const roots: Topic[] = [];
		for (const t of items) {
			if (t.parentId) {
				const arr = idToChildren.get(t.parentId) || [];
				arr.push(t);
				idToChildren.set(t.parentId, arr);
			} else {
				roots.push(t);
			}
		}
		const toNode = (t: Topic): TreeNode => ({
			id: t.uniqueId,
			label: t.name,
			children: (idToChildren.get(t.uniqueId) || []).map(toNode)
		});
		return roots.map(toNode);
	}
}


