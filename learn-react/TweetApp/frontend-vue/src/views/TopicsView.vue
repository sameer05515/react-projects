<template>
	<div class="topics-view">
		<div class="header">
			<h1>Topics</h1>
			<div class="actions">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search topics..."
					class="input"
					@input="handleSearch"
				/>
				<button @click="loadTopics" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCreateModal = true" class="btn btn-primary">Create Topic</button>
			</div>
		</div>

		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="loading" class="loading">Loading topics...</div>

		<div v-else class="topics-list">
			<div v-for="topic in topics" :key="topic._id || topic.uniqueId" class="topic-card">
				<div class="topic-header">
					<h3>{{ topic.name || 'Untitled Topic' }}</h3>
					<div class="topic-actions">
						<button @click="viewTopic(topic)" class="btn-small">View</button>
						<button @click="editTopic(topic)" class="btn-small">Edit</button>
						<button @click="deleteTopic(topic)" class="btn-small btn-danger">Delete</button>
					</div>
				</div>
				<div v-if="topic.description" class="topic-description">{{ topic.description }}</div>
				<div class="topic-meta">
					<span v-if="topic.occurenceDate">{{ formatDate(topic.occurenceDate) }}</span>
					<span v-if="topic.sections && topic.sections.length > 0">
						{{ topic.sections.length }} section(s)
					</span>
					<span v-if="topic.tags && topic.tags.length > 0" class="tags">
						Tags: {{ topic.tags.length }}
					</span>
				</div>
			</div>
			<div v-if="topics.length === 0" class="empty">No topics found</div>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showCreateModal || editingTopic" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<h2>{{ editingTopic ? 'Edit Topic' : 'Create Topic' }}</h2>
				<form @submit.prevent="saveTopic">
					<div class="form-group">
						<label>Name *</label>
						<input v-model="formData.name" type="text" required class="input" />
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea v-model="formData.description" rows="4" class="input"></textarea>
					</div>
					<div class="form-group">
						<label>Occurrence Date</label>
						<input v-model="formData.occurenceDate" type="date" class="input" />
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

		<!-- View Modal -->
		<div v-if="viewingTopic" class="modal-overlay" @click="viewingTopic = null">
			<div class="modal modal-large" @click.stop>
				<h2>Topic Details</h2>
				<div class="topic-details">
					<div class="detail-row">
						<strong>ID:</strong> {{ viewingTopic._id || viewingTopic.uniqueId }}
					</div>
					<div class="detail-row">
						<strong>Name:</strong> {{ viewingTopic.name }}
					</div>
					<div v-if="viewingTopic.description" class="detail-row">
						<strong>Description:</strong> {{ viewingTopic.description }}
					</div>
					<div v-if="viewingTopic.occurenceDate" class="detail-row">
						<strong>Occurrence Date:</strong> {{ formatDate(viewingTopic.occurenceDate) }}
					</div>
					<div v-if="viewingTopic.sections && viewingTopic.sections.length > 0" class="detail-row">
						<strong>Sections:</strong>
						<ul>
							<li v-for="section in viewingTopic.sections" :key="section.uniqueId">
								{{ section.name }}
							</li>
						</ul>
					</div>
				</div>
				<div class="form-actions">
					<button @click="viewingTopic = null" class="btn">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { topicsApi } from '../services/api';
import type { Topic } from '../services/api';

const topics = ref<Topic[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const showCreateModal = ref(false);
const editingTopic = ref<Topic | null>(null);
const viewingTopic = ref<Topic | null>(null);
const saving = ref(false);

const formData = ref({
	name: '',
	description: '',
	occurenceDate: '',
});

const loadTopics = async () => {
	loading.value = true;
	error.value = null;
	try {
		topics.value = await topicsApi.getAll();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load topics';
	} finally {
		loading.value = false;
	}
};

const handleSearch = async () => {
	if (!searchQuery.value.trim()) {
		await loadTopics();
		return;
	}

	loading.value = true;
	error.value = null;
	try {
		topics.value = await topicsApi.search(searchQuery.value);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to search topics';
	} finally {
		loading.value = false;
	}
};

const viewTopic = async (topic: Topic) => {
	const id = topic._id || topic.uniqueId;
	if (!id) return;

	try {
		viewingTopic.value = await topicsApi.getById(id);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load topic details';
	}
};

const editTopic = (topic: Topic) => {
	editingTopic.value = topic;
	formData.value = {
		name: topic.name || '',
		description: topic.description || '',
		occurenceDate: topic.occurenceDate || '',
	};
};

const deleteTopic = async (topic: Topic) => {
	if (!confirm('Are you sure you want to delete this topic?')) return;
	
	const id = topic._id || topic.uniqueId;
	if (!id) return;

	try {
		await topicsApi.delete(id);
		await loadTopics();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete topic';
	}
};

const saveTopic = async () => {
	saving.value = true;
	try {
		if (editingTopic.value) {
			const id = editingTopic.value._id || editingTopic.value.uniqueId;
			if (id) {
				await topicsApi.update(id, formData.value);
			}
		} else {
			await topicsApi.create(formData.value);
		}
		
		closeModal();
		await loadTopics();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save topic';
	} finally {
		saving.value = false;
	}
};

const closeModal = () => {
	showCreateModal.value = false;
	editingTopic.value = null;
	formData.value = { name: '', description: '', occurenceDate: '' };
};

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString();
};

onMounted(loadTopics);
</script>

<style scoped>
.topics-view {
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
	align-items: center;
}

.input {
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

.btn {
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

.topics-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.topic-card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.topic-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.topic-header h3 {
	margin: 0;
	color: #8fbaff;
}

.topic-actions {
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

.topic-description {
	margin-bottom: 8px;
	color: #8b949e;
	line-height: 1.5;
}

.topic-meta {
	display: flex;
	gap: 16px;
	font-size: 0.85rem;
	color: #8b949e;
	flex-wrap: wrap;
}

.tags {
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
	max-height: 90vh;
	overflow-y: auto;
}

.modal-large {
	max-width: 700px;
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

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 20px;
}

.topic-details {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.detail-row {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.detail-row strong {
	color: #8fbaff;
}

.detail-row ul {
	margin: 4px 0 0 20px;
	padding: 0;
	color: #8b949e;
}
</style>

