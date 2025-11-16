import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'ui-modal',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="ui-modal-overlay" *ngIf="open" (click)="onBackdrop()">
			<div class="ui-modal" (click)="$event.stopPropagation()">
				<div class="ui-modal-header">
					<div class="title">{{ title }}</div>
					<button class="close" (click)="close.emit()">✕</button>
				</div>
				<div class="ui-modal-body">
					<ng-content />
				</div>
			</div>
		</div>
	`,
	styles: [`
		.ui-modal-overlay {
			position: fixed; inset: 0; background: rgba(0,0,0,0.5);
			display: flex; align-items: center; justify-content: center;
		}
		.ui-modal {
			width: min(640px, 92vw);
			background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;
			box-shadow: 0 10px 30px rgba(0,0,0,0.2);
		}
		.ui-modal-header {
			display: flex; align-items: center; justify-content: space-between;
			padding: 12px 16px; border-bottom: 1px solid #e2e8f0;
		}
		.ui-modal-body { padding: 16px; }
		.close {
			border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; cursor: pointer; padding: 4px 8px;
		}
	`]
})
export class UiModalComponent {
	@Input() open = false;
	@Input() title = '';
	@Output() close = new EventEmitter<void>();
	onBackdrop() { this.close.emit(); }
}


