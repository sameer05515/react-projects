import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TreeNode {
	id: string;
	label: string;
	children?: TreeNode[];
}

@Component({
	selector: 'ui-tree',
	standalone: true,
	imports: [CommonModule],
	template: `
		<ul class="tree">
			<li *ngFor="let n of nodes">
				<div class="row">
					<button class="toggle" *ngIf="n.children?.length" (click)="toggle(n)">
						{{ isOpen(n) ? '−' : '+' }}
					</button>
					<span>{{ n.label }}</span>
				</div>
				<ui-tree *ngIf="n.children?.length && isOpen(n)" [nodes]="n.children!" />
			</li>
		</ul>
	`,
	styles: [`
		.tree { list-style: none; padding-left: 16px; }
		.row { display: inline-flex; gap: 6px; align-items: center; }
		.toggle { width: 24px; height: 24px; border: 1px solid #e2e8f0; background:#fff; border-radius: 4px; cursor: pointer; }
	`]
})
export class UiTreeComponent {
	@Input() nodes: TreeNode[] = [];
	private openIds = new Set<string>();

	toggle(n: TreeNode) {
		if (this.openIds.has(n.id)) this.openIds.delete(n.id);
		else this.openIds.add(n.id);
	}
	isOpen(n: TreeNode) { return this.openIds.has(n.id); }
}


