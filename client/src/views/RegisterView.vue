<template>
  <div class="container">
    <div class="auth-wrap">
      <div class="auth-header">
        <p class="auth-eyebrow">Get started</p>
        <h1 class="page-title">Create Account</h1>
        <p class="page-sub">Join the community and start writing.</p>
      </div>

      <div class="card">
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Username</label>
            <input v-model="form.username" type="text" placeholder="johndoe" required minlength="3" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="form.password" type="password" placeholder="At least 6 characters" required minlength="6" />
          </div>
          <button type="submit" class="btn btn-primary btn-full" :disabled="auth.loading">
            {{ auth.loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="auth-footer">
          Already have an account?
          <router-link to="/login">Sign in</router-link>
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
const form = ref({ username: '', email: '', password: '' })

async function handleRegister() {
  const result = await auth.register(form.value)
  if (result.success) {
    notyf.success('Account created successfully! Welcome!')
    router.push('/posts')
  } else {
    notyf.error(result.message || 'Registration failed.')
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