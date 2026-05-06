<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">Blog Application</p>
        <h1 class="hero-title">Stories Worth<br /><em>Reading.</em></h1>
        <p class="hero-desc">A place to share ideas, write your thoughts, and discover what others have to say.</p>
        <div class="hero-actions">
          <router-link to="/posts" class="btn btn-primary">Browse Posts</router-link>
          <router-link v-if="!auth.isLoggedIn" to="/register" class="btn btn-secondary">Join Now</router-link>
          <router-link v-else to="/posts/create" class="btn btn-secondary">Write a Post</router-link>
        </div>
      </div>
      <div class="hero-deco">✦</div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.home { min-height: calc(100vh - 64px); display: flex; align-items: center; }

.hero {
  max-width: 860px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  width: 100%;
}

.hero-eyebrow {
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 1rem;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 1.2rem;
  color: var(--ink);
}

.hero-title em {
  font-style: italic;
  color: var(--accent);
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 440px;
  line-height: 1.65;
  margin-bottom: 2.2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-deco {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12rem;
  color: var(--cream);
  pointer-events: none;
  line-height: 1;
}
</style>
