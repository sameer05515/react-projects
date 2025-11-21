import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import { useAuth } from '../stores/useAuth';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
		{ path: '/login', name: 'login', component: LoginView, meta: { public: true } },
		{ path: '/signup', name: 'signup', component: SignupView, meta: { public: true } },
		{ path: '/:pathMatch(.*)*', redirect: '/' }
	]
});

router.beforeEach((to) => {
	const { isAuthenticated } = useAuth();
	if (to.meta.requiresAuth && !isAuthenticated.value) {
		return { name: 'login', query: { redirect: to.fullPath } };
	}
	if ((to.name === 'login' || to.name === 'signup') && isAuthenticated.value) {
		return { name: 'home' };
	}
	return true;
});


