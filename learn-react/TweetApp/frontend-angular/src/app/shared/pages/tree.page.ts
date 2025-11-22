import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UiCardComponent } from '../ui/ui-card.component';
import { UiAlertComponent } from '../ui/ui-alert.component';
import { UiTreeComponent, TreeNode } from '../ui/ui-tree.component';

/**
 * Configuration for building a tree from flat data
 */
export interface TreeConfig<T> {
	/**
	 * Function to get the unique ID from an item
	 */
	getId: (item: T) => string | undefined;
	
	/**
	 * Function to get the parent ID from an item (returns undefined for root items)
	 */
	getParentId: (item: T) => string | undefined;
	
	/**
	 * Function to get the label/name to display for an item
	 */
	getLabel: (item: T) => string;
	
	/**
	 * Optional: Function to get children directly from item (if already structured)
	 */
	getChildren?: (item: T) => T[] | undefined;
	
	/**
	 * Optional: Route pattern for navigation (e.g., '/topics/:id')
	 * The :id placeholder will be replaced with the item's ID
	 */
	getRoute?: (item: T) => string | undefined;
}

/**
 * Generic Tree Page Component
 * Displays hierarchical data in a tree structure
 * 
 * @example
 * ```typescript
 * <app-tree-page
 *   [title]="'Topics Tree'"
 *   [data$]="topicsService.list()"
 *   [config]="{
 *     getId: (t) => t.uniqueId,
 *     getParentId: (t) => t['parentId'],
 *     getLabel: (t) => t.name
 *   }"
 * />
 * ```
 */
@Component({
	selector: 'app-tree-page',
	standalone: true,
	imports: [CommonModule, UiCardComponent, UiAlertComponent, UiTreeComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">{{ title || 'Tree View' }}</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<div *ngIf="loading">Loading...</div>
			<ui-tree *ngIf="tree?.length" [nodes]="tree" [routePattern]="routePattern" />
			<div *ngIf="!loading && (!tree || tree.length === 0)">{{ emptyMessage || 'No items found.' }}</div>
		</ui-card>
	`
})
export class TreePageComponent<T = any> implements OnInit {
	/**
	 * Title to display at the top of the tree
	 */
	@Input() title: string = 'Tree View';

	/**
	 * Observable that emits an array of items to build the tree from
	 */
	@Input() data$!: Observable<T[]>;

	/**
	 * Configuration for how to extract tree structure from items
	 */
	@Input() config!: TreeConfig<T>;

	/**
	 * Message to display when tree is empty
	 */
	@Input() emptyMessage: string = 'No items found.';

	/**
	 * Route pattern for navigation (e.g., '/topics/:id')
	 * The :id placeholder will be replaced with the item's ID
	 */
	@Input() routePattern?: string;

	loading = false;
	error: string | null = null;
	tree: TreeNode[] = [];

	ngOnInit() {
		if (!this.data$) {
			this.error = 'Data observable is required';
			return;
		}

		if (!this.config) {
			this.error = 'Tree configuration is required';
			return;
		}

		this.loading = true;
		this.data$.subscribe({
			next: (items) => {
				this.tree = this.buildTree(items || []);
				this.loading = false;
			},
			error: (err) => {
				this.error = err?.error?.error || 'Failed to load data.';
				this.loading = false;
			}
		});
	}

	/**
	 * Builds a tree structure from a flat array of items
	 */
	private buildTree(items: T[]): TreeNode[] {
		const idToChildren = new Map<string, T[]>();
		const roots: T[] = [];
		const { getId, getParentId, getChildren } = this.config;

		// If items already have children structure, use that
		if (getChildren) {
			const toNode = (item: T): TreeNode | null => {
				const id = getId(item);
				if (!id) return null;

				const children = getChildren(item);
				const childNodes = children
					?.map(child => toNode(child))
					.filter((node): node is TreeNode => node !== null) || [];

				const route = this.config.getRoute 
					? this.config.getRoute(item)
					: this.routePattern 
						? this.routePattern.replace(':id', id)
						: undefined;

				return {
					id,
					label: this.config.getLabel(item),
					children: childNodes.length > 0 ? childNodes : undefined,
					route
				};
			};

			return items
				.map(item => toNode(item))
				.filter((node): node is TreeNode => node !== null);
		}

		// Otherwise, build tree from parent-child relationships
		for (const item of items) {
			const id = getId(item);
			if (!id) continue; // Skip items without ID

			const parentId = getParentId(item);
			if (parentId) {
				const arr = idToChildren.get(parentId) || [];
				arr.push(item);
				idToChildren.set(parentId, arr);
			} else {
				roots.push(item);
			}
		}

		const toNode = (item: T): TreeNode => {
			const id = getId(item);
			if (!id) {
				throw new Error('Item must have an ID to create tree node');
			}

			const route = this.config.getRoute 
				? this.config.getRoute(item)
				: this.routePattern 
					? this.routePattern.replace(':id', id)
					: undefined;

			return {
				id,
				label: this.config.getLabel(item),
				children: (idToChildren.get(id) || []).map(toNode),
				route
			};
		};

		return roots.map(toNode);
	}
}

