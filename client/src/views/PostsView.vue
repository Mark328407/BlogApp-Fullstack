<template>
  <div class="container">
    <div class="posts-header">
      <div>
        <h1 class="page-title">All Posts</h1>
        <p class="page-sub">{{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }} published</p>
      </div>
      <router-link v-if="auth.isLoggedIn" to="/posts/create" class="btn btn-primary">+ Write Post</router-link>
    </div>

    <div v-if="postsStore.loading" class="spinner">Loading posts...</div>
    <div v-else-if="postsStore.error" class="alert alert-error">{{ postsStore.error }}</div>

    <div v-else-if="posts.length === 0" class="empty-state">
      <p>No posts yet. Be the first to write one!</p>
      <router-link v-if="auth.isLoggedIn" to="/posts/create" class="btn btn-primary" style="margin-top:1rem">Write a Post</router-link>
    </div>

    <div v-else class="posts-grid">
      <div v-for="post in posts" :key="post._id" class="post-card">
        <div class="post-card-body">
          <p class="post-author">{{ post.author?.username || 'Unknown' }}</p>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-excerpt">{{ truncate(post.content) }}</p>
        </div>
        <div class="post-card-footer">
          <span class="post-date">{{ formatDate(post.createdAt) }}</span>
          <div class="post-actions">

            <!-- Everyone can Read -->
            <router-link :to="`/posts/${post._id}`" class="btn btn-secondary btn-sm">Read</router-link>

            <!-- Owner can Edit + Delete their own post -->
            <template v-if="isOwner(post)">
              <router-link :to="`/posts/${post._id}/edit`" class="btn btn-secondary btn-sm">Edit</router-link>
              <button class="btn btn-danger btn-sm" @click="handleDelete(post._id)">Delete</button>
            </template>

            <!-- Admin can Delete any post (but not edit others) -->
            <template v-else-if="auth.isAdmin">
              <button class="btn btn-danger btn-sm" @click="handleDelete(post._id)">Delete</button>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePostsStore } from '../stores/posts'
import { useAuthStore } from '../stores/auth'

const postsStore = usePostsStore()
const auth = useAuthStore()
const posts = computed(() => postsStore.posts)

onMounted(() => postsStore.fetchAll())

// Check if the logged-in user is the owner of the post
function isOwner(post) {
  if (!auth.isLoggedIn || !auth.user) return false
  const userId = String(auth.user._id || auth.user.id || '')
  const authorId = String(post.author?._id || post.author?.id || '')
  return userId !== '' && authorId !== '' && userId === authorId
}

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this post?')) return
  await postsStore.remove(id)
}

function truncate(text, len = 120) {
  return text.length > len ? text.slice(0, len) + '…' : text
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.posts-grid {
  display: grid;
  gap: 1.2rem;
}

.post-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.post-card:hover {
  box-shadow: var(--shadow);
  border-color: var(--accent-light);
}

.post-card-body { flex: 1; }

.post-author {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.post-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

.post-excerpt {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.post-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.post-date {
  font-size: 0.8rem;
  color: var(--muted);
}

.post-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.btn-sm {
  padding: 0.35rem 0.8rem;
  font-size: 0.8rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--muted);
}
</style>
