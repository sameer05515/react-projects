import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
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


