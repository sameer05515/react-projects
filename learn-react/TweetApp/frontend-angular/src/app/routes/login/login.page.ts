import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UiCardComponent } from '../../shared/ui/ui-card.component';
import { UiButtonComponent } from '../../shared/ui/ui-button.component';
import { UiAlertComponent } from '../../shared/ui/ui-alert.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink, UiCardComponent, UiButtonComponent, UiAlertComponent],
	template: `
		<div style="display:flex; justify-content:center; padding:32px;">
			<ui-card style="width:min(420px, 92vw);">
				<h2 style="margin:0 0 8px; text-align:center;">Sign in</h2>
				<ui-alert *ngIf="error" type="error">{{ error }}</ui-alert>
				<form [formGroup]="form" (ngSubmit)="submit()" novalidate>
					<div style="display:flex; flex-direction:column; gap:12px;">
						<label>
							<span>Email</span><br />
							<input formControlName="email" type="email" placeholder="you@example.com" />
						</label>
						<label>
							<span>Password</span><br />
							<input formControlName="password" type="password" placeholder="••••••••" />
						</label>
						<ui-button [disabled]="form.invalid" (click)="submit()">Sign in</ui-button>
					</div>
				</form>
			</ui-card>
		</div>
	`
})
export class LoginPage {
	private fb = inject(FormBuilder);
	private auth = inject(AuthService);
	private router = inject(Router);

	error: string | null = null;
	form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(4)]],
	});

	submit() {
		if (this.form.invalid) return;
		const { email, password } = this.form.value;
		this.auth.login(email!, password!).subscribe({
			next: () => this.router.navigate(['/']),
			error: () => this.error = 'Invalid credentials or server error.'
		});
	}
}


