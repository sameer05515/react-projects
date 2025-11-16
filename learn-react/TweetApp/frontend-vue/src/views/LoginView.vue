<template>
	<div class="card">
		<h2>Login</h2>
		<form @submit.prevent="onSubmit" class="form">
			<label>
				<span>Username</span>
				<input v-model.trim="form.username" type="text" required autocomplete="username" />
			</label>
			<label>
				<span>Password</span>
				<input v-model.trim="form.password" type="password" required autocomplete="current-password" />
			</label>
			<button :disabled="loading" class="btn">{{ loading ? 'Signing in…' : 'Login' }}</button>
			<p v-if="error" class="error">{{ error }}</p>
		</form>
		<p class="alt">
			Don't have an account?
			<router-link to="/signup">Sign up</router-link>
		</p>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { login } from '../services/apiClient';
import { useAuth } from '../stores/useAuth';

const route = useRoute();
const router = useRouter();
const { setToken } = useAuth();

const form = reactive({ username: '', password: '' });
const loading = ref(false);
const error = ref('');

async function onSubmit() {
	error.value = '';
	loading.value = true;
	try {
		const auth = await login({ username: form.username, password: form.password });
		setToken(auth.token);
		const redirect = (route.query.redirect as string) || '/';
		router.replace(redirect);
	} catch (e: any) {
		error.value = e?.response?.data?.error || 'Login failed';
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


