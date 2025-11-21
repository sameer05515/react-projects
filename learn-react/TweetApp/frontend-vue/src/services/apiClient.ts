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

export type LoginRequest = { username: string; password: string };
export type RegisterRequest = { username: string; password: string; email?: string };
export type LoginResponse = { token: string };

export async function login(request: LoginRequest): Promise<LoginResponse> {
	const { data } = await api.post<LoginResponse>('/users/login', request);
	return data;
}

export async function register(request: RegisterRequest): Promise<void> {
	await api.post('/users/register', request);
}

// No /me endpoint in docs; user info is not returned by login/register


