import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Crumb {
	label: string;
	link?: string;
}

@Component({
	selector: 'ui-breadcrumbs',
	standalone: true,
	imports: [CommonModule, RouterLink],
	template: `
		<nav aria-label="Breadcrumb">
			<ol class="bc">
				<li *ngFor="let c of crumbs; let last = last">
					<a *ngIf="!last && c.link" [routerLink]="c.link">{{ c.label }}</a>
					<span *ngIf="last || !c.link">{{ c.label }}</span>
				</li>
			</ol>
		</nav>
	`,
	styles: [`
		.bc { list-style: none; display: flex; gap: 8px; padding: 0; margin: 0 0 8px; }
		.bc li { color: #0f172a; }
		.bc li:not(:last-child)::after { content: '/'; margin-left: 8px; color: #64748b; }
		a { color: #0f172a; text-decoration: none; }
		a:hover { text-decoration: underline; }
	`]
})
export class UiBreadcrumbsComponent {
	@Input() crumbs: Crumb[] = [];
}


