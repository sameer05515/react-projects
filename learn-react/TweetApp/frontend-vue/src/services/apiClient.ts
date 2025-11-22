import axios from 'axios';
import { useAuth } from '../stores/useAuth';
import { router } from '../router';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3003';

export const api = axios.create({
	baseURL,
	withCredentials: false
});

api.interceptors.request.use((config) => {
	const { token } = useAuth();
	if (token.value) {
		config.headers = config.headers ?? {};
		config.headers['Authorization'] = `Bearer ${token.value}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error?.response?.status === 401) {
			const { logout } = useAuth();
			logout();
			if (router.currentRoute.value.name !== 'login') {
				await router.replace({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
			}
		}
		return Promise.reject(error);
	}
);

// Re-export types and functions from usersApi for backward compatibility
export type { LoginRequest, RegisterRequest, LoginResponse } from './api/types';
export { usersApi } from './api/usersApi';

// Legacy functions - kept for backward compatibility
// Use usersApi.login() and usersApi.register() instead
export async function login(request: { username: string; password: string }): Promise<{ token: string }> {
	const { usersApi } = await import('./api/usersApi');
	return usersApi.login(request);
}

export async function register(request: { username: string; password: string; email?: string }): Promise<void> {
	const { usersApi } = await import('./api/usersApi');
	await usersApi.register(request);
}


