<template>
  <div class="container">
    <div class="auth-wrap">
      <div class="auth-header">
        <p class="auth-eyebrow">Welcome back</p>
        <h1 class="page-title">Sign In</h1>
        <p class="page-sub">Enter your credentials to continue.</p>
      </div>

      <div class="card">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="form.password" type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary btn-full" :disabled="auth.loading">
            {{ auth.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="auth-footer">
          Don't have an account?
          <router-link to="/register">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { notyf } from '../main'

const auth = useAuthStore()
const router = useRouter()
const form = ref({ email: '', password: '' })

async function handleLogin() {
  const result = await auth.login(form.value)
  if (result.success) {
    notyf.success('Welcome back! Logged in successfully.')
    router.push('/posts')
  } else {
    notyf.error(result.message || 'Login failed.')
  }
}
</script>

<style scoped>
.auth-wrap { max-width: 420px; margin: 0 auto; }
.auth-header { margin-bottom: 1.8rem; }
.auth-eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.4rem;
}
.btn-full { width: 100%; margin-top: 0.5rem; }
.auth-footer {
  margin-top: 1.2rem;
  text-align: center;
  font-size: 0.88rem;
  color: var(--muted);
}
.auth-footer a { color: var(--accent); font-weight: 500; }
</style>