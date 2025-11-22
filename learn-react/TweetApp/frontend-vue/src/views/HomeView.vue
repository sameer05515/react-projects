<template>
	<div class="wrap">
		<h2>Welcome, {{ username }}!</h2>
		<p>You are authenticated. Navigate to the API Dashboard to explore available APIs.</p>
		<router-link to="/dashboard" class="btn-link">Go to API Dashboard</router-link>
		<div class="panel">
			<p><strong>Token (stored in localStorage):</strong></p>
			<code class="code">{{ tokenPreview }}</code>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '../stores/useAuth';

const { user, token } = useAuth();
const username = computed(() => user.value?.username ?? 'User');
const tokenPreview = computed(() => (token.value ? token.value : '(none)'));
</script>

<style scoped>
.wrap { display: grid; gap: 10px; }
.panel {
	border: 1px solid #1f2a35;
	background: #0f1520;
	padding: 12px;
	border-radius: 8px;
}
.code {
	display: block;
	white-space: pre-wrap;
	background: #0b0f14;
	padding: 8px;
	border-radius: 6px;
}
.btn-link {
	display: inline-block;
	margin: 16px 0;
	padding: 10px 20px;
	background: #238636;
	color: #fff;
	text-decoration: none;
	border-radius: 6px;
	transition: background 0.2s;
}
.btn-link:hover {
	background: #2ea043;
}
</style>


