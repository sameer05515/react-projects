import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-button',
	standalone: true,
	template: `
		<button [disabled]="disabled" class="ui-btn" type="button">
			<ng-content />
		</button>
	`,
	styles: [`
		.ui-btn {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			padding: 8px 12px;
			border-radius: 6px;
			border: 1px solid #e2e8f0;
			background: #ffffff;
			color: #0f172a;
			cursor: pointer;
		}
		.ui-btn:hover { background: #f1f5f9; }
		.ui-btn:disabled { opacity: 0.6; cursor: not-allowed; }
	`]
})
export class UiButtonComponent {
	@Input() disabled = false;
}


