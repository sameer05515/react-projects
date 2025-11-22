import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import DashboardView from '../views/DashboardView.vue';
import TweetsView from '../views/TweetsView.vue';
import TasksView from '../views/TasksView.vue';
import TagsView from '../views/TagsView.vue';
import TopicsView from '../views/TopicsView.vue';
import InterviewView from '../views/InterviewView.vue';
import LinksView from '../views/LinksView.vue';
import WordsView from '../views/WordsView.vue';
import { useAuth } from '../stores/useAuth';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
		{ path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
		{ path: '/tweets', name: 'tweets', component: TweetsView, meta: { requiresAuth: true } },
		{ path: '/tasks', name: 'tasks', component: TasksView, meta: { requiresAuth: true } },
		{ path: '/tags', name: 'tags', component: TagsView, meta: { requiresAuth: true } },
		{ path: '/topics', name: 'topics', component: TopicsView, meta: { requiresAuth: true } },
		{ path: '/interview', name: 'interview', component: InterviewView, meta: { requiresAuth: true } },
		{ path: '/links', name: 'links', component: LinksView, meta: { requiresAuth: true } },
		{ path: '/words', name: 'words', component: WordsView, meta: { requiresAuth: true } },
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


