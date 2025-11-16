import { Component } from '@angular/core';

@Component({
	selector: 'ui-card',
	standalone: true,
	template: `
		<div class="ui-card">
			<ng-content />
		</div>
	`,
	styles: [`
		.ui-card {
			background: #ffffff;
			border: 1px solid #e2e8f0;
			border-radius: 6px;
			padding: 16px;
		}
	`]
})
export class UiCardComponent {}


