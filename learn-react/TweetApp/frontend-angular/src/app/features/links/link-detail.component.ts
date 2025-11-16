import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
	selector: 'app-link-detail',
	standalone: true,
	imports: [CommonModule, UiCardComponent],
	template: `
		<ui-card>
			<h3 style="margin:0 0 8px;">Link Detail</h3>
			<div>Unique Id: {{ uniqueId || '-' }}</div>
			<div>Name: {{ name || '-' }}</div>
			<div>URL: <a *ngIf="linkUrl" [href]="linkUrl" target="_blank" rel="noopener">{{ linkUrl }}</a><span *ngIf="!linkUrl">-</span></div>
		</ui-card>
	`
})
export class LinkDetailComponent {
	@Input() uniqueId?: string;
	@Input() name?: string;
	@Input() linkUrl?: string;
}


