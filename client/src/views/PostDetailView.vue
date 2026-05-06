<template>
  <div class="container">
    <div v-if="postsStore.loading" class="spinner">Loading post...</div>
    <div v-else-if="postsStore.error" class="alert alert-error">{{ postsStore.error }}</div>

    <template v-else-if="post">
      <router-link to="/posts" class="back-link">← Back to Posts</router-link>

      <article class="post-detail">
        <header class="post-header">
          <p class="post-meta">
            <span class="post-author">{{ post.author?.username }}</span>
            <span class="dot">·</span>
            <span>{{ formatDate(post.createdAt) }}</span>
          </p>
          <h1 class="post-title">{{ post.title }}</h1>
        </header>

        <div class="post-content">{{ post.content }}</div>

        <footer class="post-footer">
          <!-- Owner: can Edit + Delete -->
          <template v-if="isOwner">
            <router-link :to="`/posts/${post._id}/edit`" class="btn btn-secondary">Edit Post</router-link>
            <button class="btn btn-danger" @click="handleDelete">Delete Post</button>
          </template>

          <!-- Admin: can only Delete any post -->
          <template v-else-if="auth.isAdmin">
            <button class="btn btn-danger" @click="handleDelete">Delete Post</button>
          </template>
        </footer>
      </article>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const auth = useAuthStore()

const post = computed(() => postsStore.currentPost)

// Check if logged-in user owns this post
const isOwner = computed(() => {
  if (!auth.isLoggedIn || !auth.user || !post.value) return false
  const userId = String(auth.user._id || auth.user.id || '')
  const authorId = String(post.value.author?._id || post.value.author?.id || '')
  return userId !== '' && authorId !== '' && userId === authorId
})

onMounted(() => postsStore.fetchOne(route.params.id))

async function handleDelete() {
  if (!confirm('Delete this post?')) return
  const result = await postsStore.remove(post.value._id)
  if (result.success) router.push('/posts')
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 2rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--ink); }

.post-detail { max-width: 680px; }

.post-header { margin-bottom: 2rem; }

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.post-author { color: var(--accent); font-weight: 500; }
.dot { color: var(--border); }

.post-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 900;
  line-height: 1.15;
}

.post-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #3a3028;
  white-space: pre-wrap;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}

.post-footer { display: flex; gap: 0.75rem; flex-wrap: wrap; }
</style>
