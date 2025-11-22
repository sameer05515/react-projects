<template>
	<div class="tasks-view">
		<div class="header">
			<h1>Tasks</h1>
			<div class="actions">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search tasks..."
					class="input"
					@input="handleSearch"
				/>
				<button @click="loadTasks" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCreateModal = true" class="btn btn-primary">Create Task</button>
			</div>
		</div>

		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="loading" class="loading">Loading tasks...</div>

		<div v-else class="tasks-list">
			<div v-for="task in tasks" :key="task._id || task.uniqueId" class="task-card">
				<div class="task-header">
					<h3>{{ task.title || 'Untitled Task' }}</h3>
					<div class="task-actions">
						<button @click="editTask(task)" class="btn-small">Edit</button>
						<button @click="deleteTask(task)" class="btn-small btn-danger">Delete</button>
					</div>
				</div>
				<div v-if="task.description" class="task-description">{{ task.description }}</div>
				<div class="task-meta">
					<span v-if="task.status" class="status" :class="`status-${task.status}`">
						{{ task.status }}
					</span>
					<span v-if="task.createdAt">{{ formatDate(task.createdAt) }}</span>
					<span v-if="task.tags && task.tags.length > 0" class="tags">
						Tags: {{ task.tags.join(', ') }}
					</span>
				</div>
			</div>
			<div v-if="tasks.length === 0" class="empty">No tasks found</div>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showCreateModal || editingTask" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<h2>{{ editingTask ? 'Edit Task' : 'Create Task' }}</h2>
				<form @submit.prevent="saveTask">
					<div class="form-group">
						<label>Title *</label>
						<input v-model="formData.title" type="text" required class="input" />
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea v-model="formData.description" rows="4" class="input"></textarea>
					</div>
					<div class="form-group">
						<label>Status</label>
						<select v-model="formData.status" class="input">
							<option value="">Select status</option>
							<option value="pending">Pending</option>
							<option value="in-progress">In Progress</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>
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
import { ref, onMounted } from 'vue';
import { tasksApi } from '../services/api';
import type { Task } from '../services/api';

const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const showCreateModal = ref(false);
const editingTask = ref<Task | null>(null);
const saving = ref(false);

const formData = ref({
	title: '',
	description: '',
	status: '',
});

const loadTasks = async () => {
	loading.value = true;
	error.value = null;
	try {
		tasks.value = await tasksApi.getAll();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load tasks';
	} finally {
		loading.value = false;
	}
};

const handleSearch = async () => {
	if (!searchQuery.value.trim()) {
		await loadTasks();
		return;
	}

	loading.value = true;
	error.value = null;
	try {
		tasks.value = await tasksApi.search(searchQuery.value);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to search tasks';
	} finally {
		loading.value = false;
	}
};

const editTask = (task: Task) => {
	editingTask.value = task;
	formData.value = {
		title: task.title || '',
		description: task.description || '',
		status: task.status || '',
	};
};

const deleteTask = async (task: Task) => {
	if (!confirm('Are you sure you want to delete this task?')) return;
	
	const id = task._id || task.uniqueId;
	if (!id) return;

	try {
		await tasksApi.delete(id);
		await loadTasks();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete task';
	}
};

const saveTask = async () => {
	saving.value = true;
	try {
		if (editingTask.value) {
			const id = editingTask.value._id || editingTask.value.uniqueId;
			if (id) {
				await tasksApi.update(id, formData.value);
			}
		} else {
			await tasksApi.create(formData.value);
		}
		
		closeModal();
		await loadTasks();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save task';
	} finally {
		saving.value = false;
	}
};

const closeModal = () => {
	showCreateModal.value = false;
	editingTask.value = null;
	formData.value = { title: '', description: '', status: '' };
};

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleString();
};

onMounted(loadTasks);
</script>

<style scoped>
.tasks-view {
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

.tasks-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.task-card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.task-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.task-header h3 {
	margin: 0;
	color: #8fbaff;
}

.task-actions {
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

.task-description {
	margin-bottom: 8px;
	color: #8b949e;
	line-height: 1.5;
}

.task-meta {
	display: flex;
	gap: 16px;
	align-items: center;
	font-size: 0.85rem;
	color: #8b949e;
	flex-wrap: wrap;
}

.status {
	padding: 2px 8px;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 500;
}

.status-pending {
	background: #bb8009;
	color: #fff;
}

.status-in-progress {
	background: #1f6feb;
	color: #fff;
}

.status-completed {
	background: #238636;
	color: #fff;
}

.status-cancelled {
	background: #da3633;
	color: #fff;
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
</style>

