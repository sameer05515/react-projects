<template>
	<div class="tweets-view">
		<div class="header">
			<h1>Tweets</h1>
			<div class="actions">
				<select v-model="selectedVersion" class="select">
					<option value="v1">Version 1</option>
					<option value="v2">Version 2</option>
				</select>
				<button @click="loadTweets" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCreateModal = true" class="btn btn-primary">Create Tweet</button>
			</div>
		</div>

		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="loading" class="loading">Loading tweets...</div>

		<div v-else class="tweets-list">
			<div v-for="tweet in tweets" :key="tweet._id || tweet.uniqueId" class="tweet-card">
				<div class="tweet-header">
					<span class="tweet-id">ID: {{ tweet._id || tweet.uniqueId }}</span>
					<div class="tweet-actions">
						<button @click="editTweet(tweet)" class="btn-small">Edit</button>
						<button @click="deleteTweet(tweet)" class="btn-small btn-danger">Delete</button>
					</div>
				</div>
				<div class="tweet-content">{{ tweet.content || 'No content' }}</div>
				<div class="tweet-meta">
					<span v-if="tweet.author">Author: {{ tweet.author }}</span>
					<span v-if="tweet.createdAt">{{ formatDate(tweet.createdAt) }}</span>
				</div>
			</div>
			<div v-if="tweets.length === 0" class="empty">No tweets found</div>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showCreateModal || editingTweet" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<h2>{{ editingTweet ? 'Edit Tweet' : 'Create Tweet' }}</h2>
				<form @submit.prevent="saveTweet">
					<div class="form-group">
						<label>Content</label>
						<textarea v-model="formData.content" required rows="4" class="input"></textarea>
					</div>
					<div class="form-group">
						<label>Author</label>
						<input v-model="formData.author" type="text" class="input" />
					</div>
					<div class="form-actions">
						<button type="button" @click="closeModal" class="btn">Cancel</button>
						<button type="submit" class="btn btn-primary" :disabled="saving">
							{{ saving ? 'Saving...' : 'Save' }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { tweetsV1Api, tweetsV2Api } from '../services/api';
import type { Tweet } from '../services/api';

const selectedVersion = ref<'v1' | 'v2'>('v2');
const tweets = ref<Tweet[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const showCreateModal = ref(false);
const editingTweet = ref<Tweet | null>(null);
const saving = ref(false);

const formData = ref({
	content: '',
	author: '',
});

const loadTweets = async () => {
	loading.value = true;
	error.value = null;
	try {
		const api = selectedVersion.value === 'v1' ? tweetsV1Api : tweetsV2Api;
		tweets.value = await api.getAll();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load tweets';
	} finally {
		loading.value = false;
	}
};

const editTweet = (tweet: Tweet) => {
	editingTweet.value = tweet;
	formData.value = {
		content: tweet.content || '',
		author: tweet.author || '',
	};
};

const deleteTweet = async (tweet: Tweet) => {
	if (!confirm('Are you sure you want to delete this tweet?')) return;
	
	const id = tweet._id || tweet.uniqueId;
	if (!id) return;

	try {
		const api = selectedVersion.value === 'v1' ? tweetsV1Api : tweetsV2Api;
		await api.delete(id);
		await loadTweets();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete tweet';
	}
};

const saveTweet = async () => {
	saving.value = true;
	try {
		const api = selectedVersion.value === 'v1' ? tweetsV1Api : tweetsV2Api;
		
		if (editingTweet.value) {
			const id = editingTweet.value._id || editingTweet.value.uniqueId;
			if (id) {
				await api.update(id, formData.value);
			}
		} else {
			await api.create(formData.value);
		}
		
		closeModal();
		await loadTweets();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save tweet';
	} finally {
		saving.value = false;
	}
};

const closeModal = () => {
	showCreateModal.value = false;
	editingTweet.value = null;
	formData.value = { content: '', author: '' };
};

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleString();
};

watch(selectedVersion, loadTweets);
onMounted(loadTweets);
</script>

<style scoped>
.tweets-view {
	max-width: 1000px;
	margin: 0 auto;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
	flex-wrap: wrap;
	gap: 12px;
}

.actions {
	display: flex;
	gap: 8px;
}

.select, .btn {
	padding: 8px 16px;
	border: 1px solid #1f2a35;
	background: #0f1520;
	color: #e6edf3;
	border-radius: 6px;
	cursor: pointer;
	font-size: 14px;
}

.btn:hover:not(:disabled) {
	background: #132031;
	border-color: #8fbaff;
}

.btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.btn-primary {
	background: #238636;
	border-color: #238636;
}

.btn-primary:hover:not(:disabled) {
	background: #2ea043;
}

.error {
	padding: 12px;
	background: #da3633;
	border-radius: 6px;
	margin-bottom: 16px;
}

.loading {
	padding: 24px;
	text-align: center;
	color: #8b949e;
}

.tweets-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.tweet-card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.tweet-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.tweet-id {
	font-size: 0.85rem;
	color: #8b949e;
}

.tweet-actions {
	display: flex;
	gap: 8px;
}

.btn-small {
	padding: 4px 8px;
	font-size: 0.85rem;
}

.btn-danger {
	background: #da3633;
	border-color: #da3633;
}

.btn-danger:hover {
	background: #f85149;
}

.tweet-content {
	margin-bottom: 8px;
	line-height: 1.5;
}

.tweet-meta {
	display: flex;
	gap: 16px;
	font-size: 0.85rem;
	color: #8b949e;
}

.empty {
	padding: 48px;
	text-align: center;
	color: #8b949e;
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal {
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
	padding: 24px;
	width: 90%;
	max-width: 500px;
}

.modal h2 {
	margin: 0 0 20px 0;
}

.form-group {
	margin-bottom: 16px;
}

.form-group label {
	display: block;
	margin-bottom: 6px;
	color: #8b949e;
	font-size: 0.9rem;
}

.input {
	width: 100%;
	padding: 8px 12px;
	background: #0b0f14;
	border: 1px solid #1f2a35;
	border-radius: 6px;
	color: #e6edf3;
	font-family: inherit;
	font-size: 14px;
}

.input:focus {
	outline: none;
	border-color: #8fbaff;
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 20px;
}
</style>

