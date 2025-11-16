import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'ui-table',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="ui-table-wrap">
			<table class="ui-table">
				<thead>
					<tr>
						<th *ngFor="let h of headers">{{ h }}</th>
					</tr>
				</thead>
				<tbody>
					<ng-content />
				</tbody>
			</table>
		</div>
	`,
	styles: [`
		.ui-table-wrap { overflow: auto; }
		.ui-table { width: 100%; border-collapse: collapse; }
		.ui-table th, .ui-table td {
			text-align: left;
			border-bottom: 1px solid #e2e8f0;
			padding: 8px;
		}
		.ui-table thead th {
			background: #f8fafc;
			font-weight: 600;
		}
	`]
})
export class UiTableComponent {
	@Input() headers: string[] = [];
}


