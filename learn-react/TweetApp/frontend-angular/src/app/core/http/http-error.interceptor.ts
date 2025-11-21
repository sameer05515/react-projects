import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const auth = inject(AuthService);
	const token = auth.getToken();
	const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
	return next(authReq).pipe(
		tap({
			error: (err) => {
				if (err instanceof HttpErrorResponse) {
					// Central place to log/transform errors if needed
					// console.error('HTTP error', err.status, err.message);
				}
			}
		})
	);
};


