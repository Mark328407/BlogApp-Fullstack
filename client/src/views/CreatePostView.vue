<template>
  <div class="container">
    <div class="form-page">
      <div class="auth-header">
        <p class="auth-eyebrow">New Post</p>
        <h1 class="page-title">Write Something</h1>
        <p class="page-sub">Share your thoughts with the world.</p>
      </div>

      <div class="card">
        <div v-if="error" class="alert alert-error">{{ error }}</div>

        <form @submit.prevent="handleCreate">
          <div class="form-group">
            <label>Title</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="A great title..."
              required
              minlength="3"
            />
          </div>
          <div class="form-group">
            <label>Content</label>
            <textarea
              v-model="form.content"
              placeholder="Write your post content here..."
              required
              minlength="10"
              rows="10"
            ></textarea>
          </div>
          <div class="form-actions">
            <router-link to="/posts" class="btn btn-secondary">Cancel</router-link>
            <button type="submit" class="btn btn-primary" :disabled="postsStore.loading">
              {{ postsStore.loading ? 'Publishing...' : 'Publish Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'

const postsStore = usePostsStore()
const router = useRouter()
const error = ref('')

const form = ref({ title: '', content: '' })

async function handleCreate() {
  error.value = ''
  const result = await postsStore.create(form.value)
  if (result.success) {
    router.push(`/posts/${result.post._id}`)
  } else {
    error.value = result.message
  }
}
</script>

<style scoped>
.form-page { max-width: 640px; margin: 0 auto; }
.auth-header { margin-bottom: 1.8rem; }
.auth-eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.4rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
