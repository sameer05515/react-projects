<template>
	<div class="container">
		<nav class="nav">
			<router-link to="/" class="brand-link">
				<h1 class="brand">TweetApp</h1>
			</router-link>
			<div class="spacer"></div>
			<template v-if="isAuthenticated">
				<router-link to="/dashboard" class="nav-link">Dashboard</router-link>
				<span class="user">{{ userDisplay }}</span>
				<button class="link" @click="logout">Logout</button>
			</template>
		</nav>
		<main class="main">
			<router-view />
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from './stores/useAuth';

const { isAuthenticated, logout, user } = useAuth();
const userDisplay = computed(() => user.value?.username ?? 'User');
</script>

<style>
html, body, #app {
	height: 100%;
	margin: 0;
}
.container {
	min-height: 100%;
	display: flex;
	flex-direction: column;
	font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	background: #0b0f14;
	color: #e6edf3;
}
.nav {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 16px;
	border-bottom: 1px solid #1f2a35;
	background: #0f1520;
	position: sticky;
	top: 0;
}
.brand {
	font-size: 18px;
	margin: 0;
}
.spacer { flex: 1; }
.main {
	padding: 24px 16px;
	max-width: 880px;
	margin: 0 auto;
	width: 100%;
}
.link {
	background: transparent;
	color: #8fbaff;
	border: 1px solid #274060;
	padding: 6px 10px;
	border-radius: 6px;
	cursor: pointer;
}
.link:hover {
	background: #132031;
}
.user { opacity: 0.8; }
.brand-link {
	text-decoration: none;
	color: inherit;
}
.nav-link {
	padding: 6px 10px;
	color: #8fbaff;
	text-decoration: none;
	border: 1px solid #274060;
	border-radius: 6px;
	transition: all 0.2s;
}
.nav-link:hover {
	background: #132031;
	border-color: #8fbaff;
}
</style>


