import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-alert',
	standalone: true,
	template: `
		<div class="ui-alert" [class.ui-alert-error]="type==='error'" [class.ui-alert-info]="type==='info'">
			<ng-content />
		</div>
	`,
	styles: [`
		.ui-alert {
			border: 1px solid #e2e8f0;
			background: #f8fafc;
			color: #0f172a;
			border-radius: 6px;
			padding: 8px 12px;
		}
		.ui-alert-error { border-color: #fecaca; background: #fef2f2; color: #991b1b; }
		.ui-alert-info { border-color: #bae6fd; background: #eff6ff; color: #1e3a8a; }
	`]
})
export class UiAlertComponent {
	@Input() type: 'error' | 'info' = 'info';
}


