import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';
import { TopicsService } from './topics.service';

@Component({
	selector: 'app-topic-edit-page',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, UiCardComponent, UiButtonComponent, UiAlertComponent],
	template: `
		<ui-card>
			<h2 style="margin:0 0 8px;">Edit Topic</h2>
			<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
			<form [formGroup]="form" (ngSubmit)="save()" novalidate aria-label="Edit Topic Form">
				<div style="display:flex; flex-direction:column; gap:8px; max-width:480px;">
					<label>
						<span>Name</span><br />
						<input formControlName="name" [attr.aria-required]="true" [attr.aria-invalid]="form.controls.name.invalid" />
					</label>
					<div *ngIf="form.controls.name.touched && form.controls.name.invalid" style="color:#b91c1c;">
						Name is required and must be at least 2 characters.
					</div>
					<div style="display:flex; gap:8px;">
						<ui-button [disabled]="form.invalid" (click)="save()">Save</ui-button>
						<ui-button (click)="cancel()">Cancel</ui-button>
					</div>
				</div>
			</form>
		</ui-card>
	`
})
export class TopicEditPage {
	private route = inject(ActivatedRoute);
	private fb = inject(FormBuilder);
	private service = inject(TopicsService);
	private router = inject(Router);

	form = this.fb.group({
		uniqueId: [''],
		name: ['', [Validators.required, Validators.minLength(2)]],
	});
	originalValue = '';
	error: string | null = null;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.service.getById(id).subscribe({
			next: (t) => {
				this.form.patchValue({ uniqueId: t.uniqueId, name: t.name });
				this.originalValue = t.name || '';
			},
			error: () => { this.error = 'Failed to load topic.'; }
		});
	}

	save() {
		if (this.form.invalid) return;
		const value = this.form.value;
		const uniqueId = value.uniqueId!;
		this.service.update(uniqueId, { name: value.name! }).subscribe({
			next: () => { this.router.navigate(['/topics', uniqueId]); },
			error: () => { this.error = 'Failed to save topic.'; }
		});
	}

	cancel() {
		this.router.navigate(['/topics']);
	}

	hasUnsavedChanges(): boolean {
		return this.form.touched && this.form.value.name !== this.originalValue;
	}
}


