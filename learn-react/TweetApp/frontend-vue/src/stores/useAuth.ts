import { ref, computed } from 'vue';

type User = { id?: string; username?: string; email?: string } | null;

const tokenRef = ref<string | null>(localStorage.getItem('auth_token'));
const userRef = ref<User>(JSON.parse(localStorage.getItem('auth_user') || 'null'));

export function useAuth() {
	const token = tokenRef;
	const user = userRef;
	const isAuthenticated = computed(() => !!token.value);

	function setToken(authToken: string, userData?: User) {
		token.value = authToken;
		if (userData !== undefined) {
			user.value = userData ?? null;
			if (userData) {
				localStorage.setItem('auth_user', JSON.stringify(userData));
			} else {
				localStorage.removeItem('auth_user');
			}
		}
		localStorage.setItem('auth_token', authToken);
	}

	function logout() {
		token.value = null;
		user.value = null;
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_user');
	}

	return {
		token,
		user,
		isAuthenticated,
		setToken,
		logout
	};
}


