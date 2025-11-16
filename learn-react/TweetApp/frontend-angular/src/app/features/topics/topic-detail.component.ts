import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
	selector: 'app-topic-detail',
	standalone: true,
	imports: [CommonModule, UiCardComponent],
	template: `
		<ui-card>
			<h3 style="margin:0 0 8px;">Topic Detail</h3>
			<div>Unique Id: {{ uniqueId || '-' }}</div>
			<div>Name: {{ name || '-' }}</div>
			<div>Parent: {{ parentId || '-' }}</div>
		</ui-card>
	`
})
export class TopicDetailComponent {
	@Input() uniqueId?: string;
	@Input() name?: string;
	@Input() parentId?: string;
}


