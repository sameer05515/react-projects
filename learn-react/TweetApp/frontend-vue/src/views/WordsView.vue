<template>
	<div class="words-view">
		<div class="header">
			<h1>Words Dictionary</h1>
			<div class="actions">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search words..."
					class="input"
					@input="handleSearch"
				/>
				<button @click="loadWords" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCreateModal = true" class="btn btn-primary">Create Word</button>
			</div>
		</div>

		<div class="pagination-info" v-if="!loading && words.length > 0">
			Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total words)
		</div>

		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="loading" class="loading">Loading words...</div>

		<div v-else class="words-list">
			<div v-for="word in words" :key="word._id || word.uniqueId" class="word-card">
				<div class="word-header">
					<h3>{{ word.word || 'Untitled Word' }}</h3>
					<div class="word-actions">
						<button @click="editWord(word)" class="btn-small">Edit</button>
						<button @click="deleteWord(word)" class="btn-small btn-danger">Delete</button>
					</div>
				</div>
				<div v-if="word.meaning" class="word-meaning">{{ word.meaning }}</div>
			</div>
			<div v-if="words.length === 0" class="empty">No words found</div>
		</div>

		<div v-if="!loading && words.length > 0" class="pagination">
			<button @click="previousPage" :disabled="currentPage === 1" class="btn">Previous</button>
			<span class="page-info">Page {{ currentPage }} / {{ totalPages }}</span>
			<button @click="nextPage" :disabled="currentPage >= totalPages" class="btn">Next</button>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showCreateModal || editingWord" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<h2>{{ editingWord ? 'Edit Word' : 'Create Word' }}</h2>
				<form @submit.prevent="saveWord">
					<div class="form-group">
						<label>Word *</label>
						<input v-model="formData.word" type="text" required class="input" />
					</div>
					<div class="form-group">
						<label>Meaning</label>
						<textarea v-model="formData.meaning" rows="4" class="input"></textarea>
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
import { wordsApi } from '../services/api';
import type { Word, PaginatedResponse } from '../services/api';

const words = ref<Word[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
const totalPages = ref(0);
const showCreateModal = ref(false);
const editingWord = ref<Word | null>(null);
const saving = ref(false);

const formData = ref({
	word: '',
	meaning: '',
});

const loadWords = async (page: number = 1) => {
	loading.value = true;
	error.value = null;
	try {
		const response: PaginatedResponse<Word> = await wordsApi.getAll(page, pageSize.value);
		words.value = response.data;
		currentPage.value = response.page;
		totalCount.value = response.totalCount;
		totalPages.value = Math.ceil(response.totalCount / response.pageSize);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load words';
	} finally {
		loading.value = false;
	}
};

const handleSearch = async () => {
	if (!searchQuery.value.trim()) {
		await loadWords(1);
		return;
	}

	loading.value = true;
	error.value = null;
	try {
		words.value = await wordsApi.search(searchQuery.value);
		totalCount.value = words.value.length;
		totalPages.value = 1;
		currentPage.value = 1;
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to search words';
	} finally {
		loading.value = false;
	}
};

const previousPage = () => {
	if (currentPage.value > 1) {
		loadWords(currentPage.value - 1);
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		loadWords(currentPage.value + 1);
	}
};

const editWord = (word: Word) => {
	editingWord.value = word;
	formData.value = {
		word: word.word || '',
		meaning: word.meaning || '',
	};
};

const deleteWord = async (word: Word) => {
	if (!confirm('Are you sure you want to delete this word?')) return;
	
	const id = word._id || word.uniqueId;
	if (!id) return;

	try {
		await wordsApi.delete(id);
		await loadWords(currentPage.value);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete word';
	}
};

const saveWord = async () => {
	saving.value = true;
	try {
		if (editingWord.value) {
			const id = editingWord.value._id || editingWord.value.uniqueId;
			if (id) {
				await wordsApi.update(id, formData.value);
			}
		} else {
			await wordsApi.create(formData.value);
		}
		
		closeModal();
		await loadWords(currentPage.value);
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save word';
	} finally {
		saving.value = false;
	}
};

const closeModal = () => {
	showCreateModal.value = false;
	editingWord.value = null;
	formData.value = { word: '', meaning: '' };
};

onMounted(() => loadWords(1));
</script>

<style scoped>
.words-view {
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

.pagination-info {
	margin-bottom: 16px;
	color: #8b949e;
	font-size: 0.9rem;
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

.words-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.word-card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.word-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.word-header h3 {
	margin: 0;
	color: #8fbaff;
}

.word-actions {
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

.word-meaning {
	color: #8b949e;
	line-height: 1.5;
}

.empty {
	padding: 48px;
	text-align: center;
	color: #8b949e;
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
	margin-top: 24px;
}

.page-info {
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

