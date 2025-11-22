<template>
	<div class="links-view">
		<div class="header">
			<h1>Links</h1>
			<div class="actions">
				<button @click="loadLinks" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCreateModal = true" class="btn btn-primary">Create Link</button>
			</div>
		</div>

		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="loading" class="loading">Loading links...</div>

		<div v-else class="links-list">
			<div v-for="link in links" :key="link._id || link.uniqueId" class="link-card">
				<div class="link-header">
					<h3>{{ link.name || 'Untitled Link' }}</h3>
					<div class="link-actions">
						<button @click="editLink(link)" class="btn-small">Edit</button>
						<button @click="deleteLink(link)" class="btn-small btn-danger">Delete</button>
					</div>
				</div>
				<div v-if="link.url" class="link-url">
					<a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.url }}</a>
				</div>
				<div v-if="link.description" class="link-description">{{ link.description }}</div>
				<div v-if="link.ancestors && link.ancestors.length > 0" class="link-ancestors">
					Ancestors: {{ link.ancestors.map((a: any) => a.name).join(' > ') }}
				</div>
			</div>
			<div v-if="links.length === 0" class="empty">No links found</div>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showCreateModal || editingLink" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<h2>{{ editingLink ? 'Edit Link' : 'Create Link' }}</h2>
				<form @submit.prevent="saveLink">
					<div class="form-group">
						<label>Name *</label>
						<input v-model="formData.name" type="text" required class="input" />
					</div>
					<div class="form-group">
						<label>URL</label>
						<input v-model="formData.url" type="url" class="input" />
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea v-model="formData.description" rows="4" class="input"></textarea>
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
import { linksApi } from '../services/api';
import type { Link } from '../services/api';

const links = ref<Link[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const showCreateModal = ref(false);
const editingLink = ref<Link | null>(null);
const saving = ref(false);

const formData = ref({
	name: '',
	url: '',
	description: '',
});

const loadLinks = async () => {
	loading.value = true;
	error.value = null;
	try {
		links.value = await linksApi.getAll();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load links';
	} finally {
		loading.value = false;
	}
};

const editLink = (link: Link) => {
	editingLink.value = link;
	formData.value = {
		name: link.name || '',
		url: link.url || '',
		description: link.description || '',
	};
};

const deleteLink = async (link: Link) => {
	if (!confirm('Are you sure you want to delete this link?')) return;
	
	const id = link._id || link.uniqueId;
	if (!id) return;

	try {
		await linksApi.delete(id);
		await loadLinks();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete link';
	}
};

const saveLink = async () => {
	saving.value = true;
	try {
		if (editingLink.value) {
			const id = editingLink.value._id || editingLink.value.uniqueId;
			if (id) {
				await linksApi.update(id, formData.value);
			}
		} else {
			await linksApi.create(formData.value);
		}
		
		closeModal();
		await loadLinks();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save link';
	} finally {
		saving.value = false;
	}
};

const closeModal = () => {
	showCreateModal.value = false;
	editingLink.value = null;
	formData.value = { name: '', url: '', description: '' };
};

onMounted(loadLinks);
</script>

<style scoped>
.links-view {
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

.input, .btn {
	padding: 8px 12px;
	background: #0b0f14;
	border: 1px solid #1f2a35;
	border-radius: 6px;
	color: #e6edf3;
	font-family: inherit;
	font-size: 14px;
}

.btn {
	cursor: pointer;
}

.btn:hover:not(:disabled) {
	background: #132031;
	border-color: #8fbaff;
}

.btn:disabled {
	opacity: 0.5;
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

.links-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.link-card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.link-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.link-header h3 {
	margin: 0;
	color: #8fbaff;
}

.link-actions {
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

.link-url {
	margin-bottom: 8px;
}

.link-url a {
	color: #8fbaff;
	text-decoration: none;
	word-break: break-all;
}

.link-url a:hover {
	text-decoration: underline;
}

.link-description {
	margin-bottom: 8px;
	color: #8b949e;
	line-height: 1.5;
}

.link-ancestors {
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

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 20px;
}
</style>

