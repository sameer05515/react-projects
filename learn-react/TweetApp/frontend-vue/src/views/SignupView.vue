<template>
	<div class="card">
		<h2>Sign up</h2>
		<form @submit.prevent="onSubmit" class="form">
			<label>
				<span>Username</span>
				<input v-model.trim="form.username" type="text" required autocomplete="username" />
			</label>
			<label>
				<span>Email</span>
				<input v-model.trim="form.email" type="email" autocomplete="email" />
			</label>
			<label>
				<span>Password</span>
				<input v-model.trim="form.password" type="password" required autocomplete="new-password" />
			</label>
			<button :disabled="loading" class="btn">{{ loading ? 'Creating…' : 'Create account' }}</button>
			<p v-if="error" class="error">{{ error }}</p>
		</form>
		<p class="alt">
			Already have an account?
			<router-link to="/login">Log in</router-link>
		</p>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register, login } from '../services/apiClient';
import { useAuth } from '../stores/useAuth';

const router = useRouter();
const { setToken } = useAuth();

const form = reactive({ username: '', email: '', password: '' });
const loading = ref(false);
const error = ref('');

async function onSubmit() {
	error.value = '';
	loading.value = true;
	try {
		// Register user (returns 201 with empty body per docs)
		await register({ username: form.username, email: form.email || undefined, password: form.password });
		// Immediately login to obtain token
		const auth = await login({ username: form.username, password: form.password });
		setToken(auth.token, { username: form.username, email: form.email || undefined });
		router.replace('/');
	} catch (e: any) {
		error.value = e?.response?.data?.error || 'Signup failed';
	} finally {
		loading.value = false;
	}
}
</script>

<style scoped>
.card {
	background: #0f1520;
	border: 1px solid #1f2a35;
	border-radius: 10px;
	padding: 20px;
	max-width: 420px;
	margin: 0 auto;
}
.form {
	display: grid;
	gap: 12px;
}
label {
	display: grid;
	gap: 6px;
}
input {
	background: #0b0f14;
	border: 1px solid #1f2a35;
	border-radius: 8px;
	padding: 10px 12px;
	color: #e6edf3;
}
.btn {
	background: #2266e3;
	color: white;
	border: none;
	border-radius: 8px;
	padding: 10px 12px;
	cursor: pointer;
}
.btn[disabled] { opacity: .6; cursor: default; }
.error { color: #ff7b7b; }
.alt { margin-top: 10px; }
</style>


