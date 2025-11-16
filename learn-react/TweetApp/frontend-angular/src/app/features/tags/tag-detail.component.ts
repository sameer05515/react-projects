import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
	selector: 'app-tag-detail',
	standalone: true,
	imports: [CommonModule, UiCardComponent],
	template: `
		<ui-card>
			<h3 style="margin:0 0 8px;">Tag Detail</h3>
			<div>Unique Id: {{ uniqueId || '-' }}</div>
			<div>Name: {{ name || '-' }}</div>
			<div>Parent: {{ parentId || '-' }}</div>
		</ui-card>
	`
})
export class TagDetailComponent {
	@Input() uniqueId?: string;
	@Input() name?: string;
	@Input() parentId?: string;
}


