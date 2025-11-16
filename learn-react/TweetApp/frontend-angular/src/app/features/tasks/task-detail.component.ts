import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from '../../shared/ui/ui-card.component';

@Component({
	selector: 'app-task-detail',
	standalone: true,
	imports: [CommonModule, UiCardComponent],
	template: `
		<ui-card>
			<h3 style="margin:0 0 8px;">Task Detail</h3>
			<div>Unique Id: {{ uniqueId || '-' }}</div>
			<div>Name: {{ name || '-' }}</div>
			<div>Description: {{ description || '-' }}</div>
		</ui-card>
	`
})
export class TaskDetailComponent {
	@Input() uniqueId?: string;
	@Input() name?: string;
	@Input() description?: string;
}


