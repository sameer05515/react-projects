<template>
	<div class="dashboard">
		<h1>API Dashboard</h1>
		<p class="subtitle">Navigate to different API sections</p>

		<div class="grid">
			<router-link v-for="item in apiSections" :key="item.path" :to="item.path" class="card">
				<h3>{{ item.title }}</h3>
				<p>{{ item.description }}</p>
				<span class="badge">{{ item.count }} endpoints</span>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
const apiSections = [
	{ path: '/tweets', title: 'Tweets', description: 'Manage tweets (V1 & V2)', count: 10 },
	{ path: '/tasks', title: 'Tasks', description: 'Task management', count: 6 },
	{ path: '/tags', title: 'Tags', description: 'Tag operations', count: 6 },
	{ path: '/topics', title: 'Topics', description: 'Topic management', count: 8 },
	{ path: '/links', title: 'Links', description: 'Link management', count: 6 },
	{ path: '/words', title: 'Words', description: 'Word dictionary with pagination', count: 6 },
	{ path: '/interview', title: 'Interview Management', description: 'Categories, Questions, Answers', count: 15 },
	{ path: '/memory-maps', title: 'Memory Maps', description: 'Memory map operations', count: 6 },
	{ path: '/pinned-items', title: 'Pinned Items', description: 'Manage pinned items', count: 5 },
	{ path: '/think-tank', title: 'Think Tank', description: 'Think tank items', count: 6 },
	{ path: '/chatgpt', title: 'ChatGPT', description: 'ChatGPT conversations', count: 5 },
	{ path: '/activities', title: 'Activities', description: 'Activity tracking', count: 5 },
];
</script>

<style scoped>
.dashboard {
	max-width: 1200px;
	margin: 0 auto;
}

h1 {
	font-size: 2rem;
	margin-bottom: 8px;
}

.subtitle {
	color: #8b949e;
	margin-bottom: 32px;
}

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 16px;
}

.card {
	display: block;
	padding: 20px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
	text-decoration: none;
	color: inherit;
	transition: all 0.2s;
}

.card:hover {
	border-color: #8fbaff;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(143, 186, 255, 0.1);
}

.card h3 {
	margin: 0 0 8px 0;
	color: #8fbaff;
	font-size: 1.25rem;
}

.card p {
	margin: 0 0 12px 0;
	color: #8b949e;
	font-size: 0.9rem;
}

.badge {
	display: inline-block;
	padding: 4px 8px;
	background: #1f2a35;
	border-radius: 4px;
	font-size: 0.75rem;
	color: #8b949e;
}
</style>

