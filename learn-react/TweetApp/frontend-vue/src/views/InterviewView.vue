<template>
	<div class="interview-view">
		<div class="header">
			<h1>Interview Management</h1>
			<div class="tabs">
				<button
					:class="['tab', { active: activeTab === 'categories' }]"
					@click="activeTab = 'categories'"
				>
					Categories
				</button>
				<button
					:class="['tab', { active: activeTab === 'questions' }]"
					@click="activeTab = 'questions'"
				>
					Questions
				</button>
				<button
					:class="['tab', { active: activeTab === 'answers' }]"
					@click="activeTab = 'answers'"
				>
					Answers
				</button>
			</div>
		</div>

		<!-- Categories Tab -->
		<div v-if="activeTab === 'categories'" class="tab-content">
			<div class="actions-bar">
				<button @click="loadCategories" class="btn" :disabled="loading">Refresh</button>
				<button @click="showCategoryModal = true" class="btn btn-primary">Create Category</button>
			</div>
			<div v-if="error" class="error">{{ error }}</div>
			<div v-if="loading" class="loading">Loading categories...</div>
			<div v-else class="list">
				<div v-for="cat in categories" :key="cat._id || cat.uniqueId" class="card">
					<div class="card-header">
						<h3>{{ cat.name || 'Untitled Category' }}</h3>
						<div class="card-actions">
							<button @click="editCategory(cat)" class="btn-small">Edit</button>
							<button @click="deleteCategory(cat)" class="btn-small btn-danger">Delete</button>
						</div>
					</div>
					<div v-if="cat.description" class="card-body">{{ cat.description }}</div>
				</div>
				<div v-if="categories.length === 0" class="empty">No categories found</div>
			</div>
		</div>

		<!-- Questions Tab -->
		<div v-if="activeTab === 'questions'" class="tab-content">
			<div class="actions-bar">
				<select v-model="selectedCategoryId" class="input" @change="loadQuestions">
					<option value="">All Categories</option>
					<option v-for="cat in categories" :key="cat._id || cat.uniqueId" :value="cat._id || cat.uniqueId">
						{{ cat.name }}
					</option>
				</select>
				<button @click="loadQuestions" class="btn" :disabled="loading">Refresh</button>
				<button @click="showQuestionModal = true" class="btn btn-primary">Create Question</button>
			</div>
			<div v-if="error" class="error">{{ error }}</div>
			<div v-if="loading" class="loading">Loading questions...</div>
			<div v-else class="list">
				<div v-for="q in questions" :key="q._id || q.uniqueId" class="card">
					<div class="card-header">
						<h3>{{ q.question || 'Untitled Question' }}</h3>
						<div class="card-actions">
							<button @click="editQuestion(q)" class="btn-small">Edit</button>
							<button @click="deleteQuestion(q)" class="btn-small btn-danger">Delete</button>
						</div>
					</div>
					<div class="card-body">
						<div v-if="q.categoryId">Category ID: {{ q.categoryId }}</div>
						<div v-if="q.tags && q.tags.length > 0">Tags: {{ q.tags.join(', ') }}</div>
					</div>
				</div>
				<div v-if="questions.length === 0" class="empty">No questions found</div>
			</div>
		</div>

		<!-- Answers Tab -->
		<div v-if="activeTab === 'answers'" class="tab-content">
			<div class="actions-bar">
				<select v-model="selectedQuestionId" class="input" @change="loadAnswers">
					<option value="">All Questions</option>
					<option v-for="q in questions" :key="q._id || q.uniqueId" :value="q._id || q.uniqueId">
						{{ q.question }}
					</option>
				</select>
				<button @click="loadAnswers" class="btn" :disabled="loading">Refresh</button>
				<button @click="showAnswerModal = true" class="btn btn-primary">Create Answer</button>
			</div>
			<div v-if="error" class="error">{{ error }}</div>
			<div v-if="loading" class="loading">Loading answers...</div>
			<div v-else class="list">
				<div v-for="a in answers" :key="a._id || a.uniqueId" class="card">
					<div class="card-header">
						<h3>Answer</h3>
						<div class="card-actions">
							<button @click="editAnswer(a)" class="btn-small">Edit</button>
							<button @click="deleteAnswer(a)" class="btn-small btn-danger">Delete</button>
						</div>
					</div>
					<div class="card-body">{{ a.answer || 'No answer text' }}</div>
					<div v-if="a.questionId" class="card-footer">Question ID: {{ a.questionId }}</div>
				</div>
				<div v-if="answers.length === 0" class="empty">No answers found</div>
			</div>
		</div>

		<!-- Category Modal -->
		<div v-if="showCategoryModal || editingCategory" class="modal-overlay" @click="closeCategoryModal">
			<div class="modal" @click.stop>
				<h2>{{ editingCategory ? 'Edit Category' : 'Create Category' }}</h2>
				<form @submit.prevent="saveCategory">
					<div class="form-group">
						<label>Name *</label>
						<input v-model="categoryForm.name" type="text" required class="input" />
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea v-model="categoryForm.description" rows="4" class="input"></textarea>
					</div>
					<div class="form-actions">
						<button type="button" @click="closeCategoryModal" class="btn">Cancel</button>
						<button type="submit" class="btn btn-primary" :disabled="saving">Save</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Question Modal -->
		<div v-if="showQuestionModal || editingQuestion" class="modal-overlay" @click="closeQuestionModal">
			<div class="modal" @click.stop>
				<h2>{{ editingQuestion ? 'Edit Question' : 'Create Question' }}</h2>
				<form @submit.prevent="saveQuestion">
					<div class="form-group">
						<label>Question *</label>
						<textarea v-model="questionForm.question" rows="3" required class="input"></textarea>
					</div>
					<div class="form-group">
						<label>Category</label>
						<select v-model="questionForm.categoryId" class="input">
							<option value="">Select category</option>
							<option v-for="cat in categories" :key="cat._id || cat.uniqueId" :value="cat._id || cat.uniqueId">
								{{ cat.name }}
							</option>
						</select>
					</div>
					<div class="form-actions">
						<button type="button" @click="closeQuestionModal" class="btn">Cancel</button>
						<button type="submit" class="btn btn-primary" :disabled="saving">Save</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Answer Modal -->
		<div v-if="showAnswerModal || editingAnswer" class="modal-overlay" @click="closeAnswerModal">
			<div class="modal" @click.stop>
				<h2>{{ editingAnswer ? 'Edit Answer' : 'Create Answer' }}</h2>
				<form @submit.prevent="saveAnswer">
					<div class="form-group">
						<label>Answer *</label>
						<textarea v-model="answerForm.answer" rows="5" required class="input"></textarea>
					</div>
					<div class="form-group">
						<label>Question</label>
						<select v-model="answerForm.questionId" class="input">
							<option value="">Select question</option>
							<option v-for="q in questions" :key="q._id || q.uniqueId" :value="q._id || q.uniqueId">
								{{ q.question }}
							</option>
						</select>
					</div>
					<div class="form-actions">
						<button type="button" @click="closeAnswerModal" class="btn">Cancel</button>
						<button type="submit" class="btn btn-primary" :disabled="saving">Save</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { interviewMgmtV2Api } from '../services/api';
import type { InterviewCategory, InterviewQuestion, InterviewAnswer } from '../services/api';

const activeTab = ref<'categories' | 'questions' | 'answers'>('categories');
const categories = ref<InterviewCategory[]>([]);
const questions = ref<InterviewQuestion[]>([]);
const answers = ref<InterviewAnswer[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedCategoryId = ref('');
const selectedQuestionId = ref('');

const showCategoryModal = ref(false);
const showQuestionModal = ref(false);
const showAnswerModal = ref(false);
const editingCategory = ref<InterviewCategory | null>(null);
const editingQuestion = ref<InterviewQuestion | null>(null);
const editingAnswer = ref<InterviewAnswer | null>(null);
const saving = ref(false);

const categoryForm = ref({ name: '', description: '' });
const questionForm = ref({ question: '', categoryId: '' });
const answerForm = ref({ answer: '', questionId: '' });

const loadCategories = async () => {
	loading.value = true;
	error.value = null;
	try {
		categories.value = await interviewMgmtV2Api.getAllCategories();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load categories';
	} finally {
		loading.value = false;
	}
};

const loadQuestions = async () => {
	loading.value = true;
	error.value = null;
	try {
		if (selectedCategoryId.value) {
			questions.value = await interviewMgmtV2Api.getQuestionsByCategoryId(selectedCategoryId.value);
		} else {
			questions.value = await interviewMgmtV2Api.getAllQuestions();
		}
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load questions';
	} finally {
		loading.value = false;
	}
};

const loadAnswers = async () => {
	loading.value = true;
	error.value = null;
	try {
		if (selectedQuestionId.value) {
			answers.value = await interviewMgmtV2Api.getAnswersByQuestionId(selectedQuestionId.value);
		} else {
			answers.value = await interviewMgmtV2Api.getAllAnswers();
		}
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to load answers';
	} finally {
		loading.value = false;
	}
};

watch(activeTab, () => {
	if (activeTab.value === 'questions' && categories.value.length === 0) {
		loadCategories();
	}
	if (activeTab.value === 'questions') {
		loadQuestions();
	}
	if (activeTab.value === 'answers' && questions.value.length === 0) {
		loadQuestions();
	}
	if (activeTab.value === 'answers') {
		loadAnswers();
	}
});

const editCategory = (cat: InterviewCategory) => {
	editingCategory.value = cat;
	categoryForm.value = { name: cat.name || '', description: cat.description || '' };
};

const deleteCategory = async (cat: InterviewCategory) => {
	if (!confirm('Delete this category?')) return;
	const id = cat._id || cat.uniqueId;
	if (!id) return;
	try {
		await interviewMgmtV2Api.deleteCategory(id);
		await loadCategories();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete category';
	}
};

const saveCategory = async () => {
	saving.value = true;
	try {
		if (editingCategory.value) {
			const id = editingCategory.value._id || editingCategory.value.uniqueId;
			if (id) await interviewMgmtV2Api.updateCategory(id, categoryForm.value);
		} else {
			await interviewMgmtV2Api.createCategory(categoryForm.value);
		}
		closeCategoryModal();
		await loadCategories();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save category';
	} finally {
		saving.value = false;
	}
};

const closeCategoryModal = () => {
	showCategoryModal.value = false;
	editingCategory.value = null;
	categoryForm.value = { name: '', description: '' };
};

const editQuestion = (q: InterviewQuestion) => {
	editingQuestion.value = q;
	questionForm.value = { question: q.question || '', categoryId: q.categoryId || '' };
};

const deleteQuestion = async (q: InterviewQuestion) => {
	if (!confirm('Delete this question?')) return;
	const id = q._id || q.uniqueId;
	if (!id) return;
	try {
		await interviewMgmtV2Api.deleteQuestion(id);
		await loadQuestions();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete question';
	}
};

const saveQuestion = async () => {
	saving.value = true;
	try {
		if (editingQuestion.value) {
			const id = editingQuestion.value._id || editingQuestion.value.uniqueId;
			if (id) await interviewMgmtV2Api.updateQuestion(id, questionForm.value);
		} else {
			await interviewMgmtV2Api.createQuestion(questionForm.value);
		}
		closeQuestionModal();
		await loadQuestions();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save question';
	} finally {
		saving.value = false;
	}
};

const closeQuestionModal = () => {
	showQuestionModal.value = false;
	editingQuestion.value = null;
	questionForm.value = { question: '', categoryId: '' };
};

const editAnswer = (a: InterviewAnswer) => {
	editingAnswer.value = a;
	answerForm.value = { answer: a.answer || '', questionId: a.questionId || '' };
};

const deleteAnswer = async (a: InterviewAnswer) => {
	if (!confirm('Delete this answer?')) return;
	const id = a._id || a.uniqueId;
	if (!id) return;
	try {
		await interviewMgmtV2Api.deleteAnswer(id);
		await loadAnswers();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to delete answer';
	}
};

const saveAnswer = async () => {
	saving.value = true;
	try {
		if (editingAnswer.value) {
			const id = editingAnswer.value._id || editingAnswer.value.uniqueId;
			if (id) await interviewMgmtV2Api.updateAnswer(id, answerForm.value);
		} else {
			await interviewMgmtV2Api.createAnswer(answerForm.value);
		}
		closeAnswerModal();
		await loadAnswers();
	} catch (err: any) {
		error.value = err.response?.data?.error || err.message || 'Failed to save answer';
	} finally {
		saving.value = false;
	}
};

const closeAnswerModal = () => {
	showAnswerModal.value = false;
	editingAnswer.value = null;
	answerForm.value = { answer: '', questionId: '' };
};

onMounted(() => {
	loadCategories();
	if (activeTab.value === 'questions') loadQuestions();
	if (activeTab.value === 'answers') {
		loadQuestions();
		loadAnswers();
	}
});
</script>

<style scoped>
.interview-view {
	max-width: 1200px;
	margin: 0 auto;
}

.header {
	margin-bottom: 24px;
}

.tabs {
	display: flex;
	gap: 8px;
	margin-top: 16px;
}

.tab {
	padding: 8px 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	color: #8b949e;
	border-radius: 6px;
	cursor: pointer;
}

.tab.active {
	background: #238636;
	border-color: #238636;
	color: #fff;
}

.tab-content {
	margin-top: 24px;
}

.actions-bar {
	display: flex;
	gap: 8px;
	margin-bottom: 16px;
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

.list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.card {
	padding: 16px;
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 8px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.card-header h3 {
	margin: 0;
	color: #8fbaff;
}

.card-actions {
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

.card-body {
	color: #8b949e;
	line-height: 1.5;
}

.card-footer {
	margin-top: 8px;
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

