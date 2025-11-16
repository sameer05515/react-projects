<template>
	<div class="wrap">
		<h2>Welcome, {{ username }}!</h2>
		<p>You are authenticated. This is a placeholder Home page.</p>
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
</style>


