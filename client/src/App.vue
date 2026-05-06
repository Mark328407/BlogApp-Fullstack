<template>
  <div id="app-wrapper">
    <nav class="navbar">
      <router-link to="/" class="nav-brand">✦ BlogApp</router-link>
      <div class="nav-links">
        <router-link to="/posts">Posts</router-link>
        <template v-if="auth.isLoggedIn">
          <router-link to="/posts/create">Write</router-link>
          <span class="nav-user">{{ auth.user?.username }}</span>
          <button class="btn-logout" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/register" class="btn-register">Register</router-link>
        </template>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { notyf } from './main'

const auth = useAuthStore()
const router = useRouter()

onMounted(() => auth.fetchMe())

function handleLogout() {
  auth.logout()
  notyf.success('Logged out successfully.')
  router.push('/')
}
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink: #1a1208;
  --paper: #faf7f2;
  --cream: #f0ebe0;
  --accent: #c8602a;
  --accent-light: #e8845a;
  --muted: #8a7f72;
  --border: #ddd5c8;
  --card: #ffffff;
  --shadow: 0 2px 12px rgba(26,18,8,0.08);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
}

a { color: inherit; text-decoration: none; }

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  background: var(--ink);
  color: var(--paper);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--paper);
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.nav-links a { color: var(--cream); transition: color 0.2s; }
.nav-links a:hover, .nav-links a.router-link-active { color: var(--accent-light); }

.nav-user { color: var(--muted); font-size: 0.85rem; }

.btn-register {
  background: var(--accent);
  color: white !important;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  transition: background 0.2s !important;
}
.btn-register:hover { background: var(--accent-light) !important; }

.btn-logout {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--cream);
  padding: 0.35rem 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}
.btn-logout:hover { border-color: var(--accent-light); color: var(--accent-light); }

.main-content { min-height: calc(100vh - 64px); }

.container { max-width: 860px; margin: 0 auto; padding: 2.5rem 1.5rem; }

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.6rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.page-sub { color: var(--muted); font-size: 0.95rem; margin-bottom: 2rem; }

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.form-group { margin-bottom: 1.2rem; }

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-bottom: 0.4rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  background: var(--paper);
  color: var(--ink);
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus { outline: none; border-color: var(--accent); }

.form-group textarea { resize: vertical; min-height: 120px; }

.btn {
  display: inline-block;
  padding: 0.65rem 1.4rem;
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary { background: var(--accent); color: white; }
.btn-primary:hover:not(:disabled) { background: var(--accent-light); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--ink); }
.btn-secondary:hover { border-color: var(--ink); }

.btn-danger { background: transparent; border: 1px solid #e05252; color: #e05252; }
.btn-danger:hover { background: #e05252; color: white; }

.alert { padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.9rem; margin-bottom: 1rem; }
.alert-error { background: #fef2f2; color: #c0392b; border: 1px solid #f5c6c6; }
.alert-success { background: #f0fdf4; color: #2e7d52; border: 1px solid #bbf7d0; }

.spinner { display: flex; justify-content: center; padding: 3rem; color: var(--muted); font-size: 0.9rem; }
</style>