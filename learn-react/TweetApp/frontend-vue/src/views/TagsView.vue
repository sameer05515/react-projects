<template>
	<div class="tags-view">
		<div class="header">
			<h1>Tags</h1>
			<div class="actions">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search tags..."
					class="input"
					@input="handleSearch"
				/>
				<button @click="loadTags" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCreateModal = true" class="btn btn-primary">Create Tag</button>
			</div>
		</div>

		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="loading" class="loading">Loading tags...</div>

		<div v-else class="tags-list">
			<div v-for="tag in tags" :key="tag._id || tag.uniqueId" class="tag-card">
				<div class="tag-header">
					<h3>{{ tag.name || tag.title || 'Untitled Tag' }}</h3>
					<div class="tag-actions">
						<button @click="viewTag(tag)" class="btn-small">View</button>
						<button @click="editTag(tag)" class="btn-small">Edit</button>
						<button @click="deleteTag(tag)" class="btn-small btn-danger">Delete</button>
					</div>
				</div>
				<div v-if="tag.ancestors && tag.ancestors.length > 0" class="tag-ancestors">
					Ancestors: {{ tag.ancestors.map((a: any) => a.name).join(' > ') }}
				</div>
				<div v-if="tag.children && tag.children.length > 0" class="tag-children">
					Children: {{ tag.children.length }} tag(s)
				</div>
			</div>
			<div v-if="tags.length === 0" class="empty">No tags found</div>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showCreateModal || editingTag" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<h2>{{ editingTag ? 'Edit Tag' : 'Create Tag' }}</h2>
				<form @submit.prevent="saveTag">
					<div class="form-group">
						<label>Name *</label>
						<input v-model="formData.name" type="text" required class="input" />
					</div>
					<div class="form-group">
						<label>Title</label>
						<input v-model="formData.title" type="text" class="input" />
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
		<div v-if="viewingTag" class="modal-overlay" @click="viewingTag = null">
			<div class="modal modal-large" @click.stop>
				<h2>Tag Details</h2>
				<div class="tag-details">
					<div class="detail-row">
						<strong>ID:</strong> {{ viewingTag._id || viewingTag.uniqueId }}
					</div>
					<div class="detail-row">
						<strong>Name:</strong> {{ viewingTag.name || viewingTag.title }}
					</div>
					<div v-if="viewingTag.ancestors && viewingTag.ancestors.length > 0" class="detail-row">
						<strong>Ancestors:</strong>
						<ul>
							<li v-for="ancestor in viewingTag.ancestors" :key="ancestor.uniqueId">
								{{ ancestor.name }}
							</li>
						</ul>
					</div>
					<div v-if="viewingTag.children && viewingTag.children.length > 0" class="detail-row">
						<strong>Children:</strong>
						<ul>
							<li v-for="child in viewingTag.children" :key="child.uniqueId">
								{{ child.name || child.title }}
							</li>
						</ul>
					</div>
				</div>
				<div class="form-actions">
					<button @click="viewingTag = null" class="btn">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { tagsApi } from '../services/api';
import type { Tag } from '../services/api';

const tags = ref<Tag[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const showCreateModal = ref(false);
const editingTag = ref<Tag | null>(null);
const viewingTag = ref<Tag | null>(null);
const saving = ref(false);

const formData = ref({
	name: '',
	title: '',
});

const loadTags = async () => {
	loading.value = true;
	error.value = null;
	try {
		tags.value = await tagsApi.getAll();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load tags';
	} finally {
		loading.value = false;
	}
};

const handleSearch = async () => {
	if (!searchQuery.value.trim()) {
		await loadTags();
		return;
	}

	loading.value = true;
	error.value = null;
	try {
		tags.value = await tagsApi.search(searchQuery.value);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to search tags';
	} finally {
		loading.value = false;
	}
};

const viewTag = async (tag: Tag) => {
	const id = tag._id || tag.uniqueId;
	if (!id) return;

	try {
		viewingTag.value = await tagsApi.getById(id);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load tag details';
	}
};

const editTag = (tag: Tag) => {
	editingTag.value = tag;
	formData.value = {
		name: tag.name || '',
		title: tag.title || '',
	};
};

const deleteTag = async (tag: Tag) => {
	if (!confirm('Are you sure you want to delete this tag?')) return;
	
	const id = tag._id || tag.uniqueId;
	if (!id) return;

	try {
		await tagsApi.delete(id);
		await loadTags();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete tag';
	}
};

const saveTag = async () => {
	saving.value = true;
	try {
		if (editingTag.value) {
			const id = editingTag.value._id || editingTag.value.uniqueId;
			if (id) {
				await tagsApi.update(id, formData.value);
			}
		} else {
			await tagsApi.create(formData.value);
		}
		
		closeModal();
		await loadTags();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save tag';
	} finally {
		saving.value = false;
	}
};

const closeModal = () => {
	showCreateModal.value = false;
	editingTag.value = null;
	formData.value = { name: '', title: '' };
};

onMounted(loadTags);
</script>

<style scoped>
.tags-view {
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

.tags-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.tag-card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.tag-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.tag-header h3 {
	margin: 0;
	color: #8fbaff;
}

.tag-actions {
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

.tag-ancestors,
.tag-children {
	font-size: 0.85rem;
	color: #8b949e;
	margin-top: 8px;
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

.tag-details {
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

