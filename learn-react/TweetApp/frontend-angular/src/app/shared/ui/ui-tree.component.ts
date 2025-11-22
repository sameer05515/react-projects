import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface TreeNode {
	id: string;
	label: string;
	children?: TreeNode[];
	route?: string; // Optional route for navigation
}

@Component({
	selector: 'ui-tree',
	standalone: true,
	imports: [CommonModule, RouterLink],
	template: `
		<ul class="tree">
			<li *ngFor="let n of nodes">
				<div class="row">
					<button class="toggle" *ngIf="n.children?.length" (click)="toggle(n); $event.stopPropagation()">
						{{ isOpen(n) ? '−' : '+' }}
					</button>
					<a *ngIf="n.route" [routerLink]="n.route" class="tree-link">{{ n.label }}</a>
					<span *ngIf="!n.route" class="tree-label">{{ n.label }}</span>
				</div>
				<ui-tree *ngIf="n.children?.length && isOpen(n)" [nodes]="n.children!" [routePattern]="routePattern" />
			</li>
		</ul>
	`,
	styles: [`
		.tree { list-style: none; padding-left: 16px; }
		.row { display: inline-flex; gap: 6px; align-items: center; }
		.toggle { width: 24px; height: 24px; border: 1px solid #e2e8f0; background:#fff; border-radius: 4px; cursor: pointer; }
		.tree-link { color: #2563eb; text-decoration: none; cursor: pointer; }
		.tree-link:hover { text-decoration: underline; }
		.tree-label { color: #1f2937; }
	`]
})
export class UiTreeComponent {
	@Input() nodes: TreeNode[] = [];
	@Input() routePattern?: string; // Pattern like '/topics/:id' where :id will be replaced with node.id
	private openIds = new Set<string>();

	toggle(n: TreeNode) {
		if (this.openIds.has(n.id)) this.openIds.delete(n.id);
		else this.openIds.add(n.id);
	}
	isOpen(n: TreeNode) { return this.openIds.has(n.id); }
}


