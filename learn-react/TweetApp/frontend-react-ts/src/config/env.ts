export const BACKEND_APPLICATION_BASE_URL: string =
	(typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_BACKEND_APPLICATION_BASE_URL) ||
	'http://localhost:3003'


