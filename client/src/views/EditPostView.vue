<template>
  <div class="container">
    <div class="form-page">
      <div v-if="postsStore.loading && !form.title" class="spinner">Loading post...</div>

      <template v-else>
        <div class="auth-header">
          <p class="auth-eyebrow">Edit Post</p>
          <h1 class="page-title">Update Post</h1>
          <p class="page-sub">Make changes and save.</p>
        </div>

        <div class="card">
          <div v-if="error" class="alert alert-error">{{ error }}</div>
          <div v-if="success" class="alert alert-success">{{ success }}</div>

          <form @submit.prevent="handleUpdate">
            <div class="form-group">
              <label>Title</label>
              <input
                v-model="form.title"
                type="text"
                required
                minlength="3"
              />
            </div>
            <div class="form-group">
              <label>Content</label>
              <textarea
                v-model="form.content"
                required
                minlength="10"
                rows="10"
              ></textarea>
            </div>
            <div class="form-actions">
              <router-link :to="`/posts/${route.params.id}`" class="btn btn-secondary">Cancel</router-link>
              <button type="submit" class="btn btn-primary" :disabled="postsStore.loading">
                {{ postsStore.loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'

const postsStore = usePostsStore()
const route = useRoute()
const router = useRouter()
const error = ref('')
const success = ref('')

const form = ref({ title: '', content: '' })

onMounted(async () => {
  await postsStore.fetchOne(route.params.id)
  if (postsStore.currentPost) {
    form.value.title = postsStore.currentPost.title
    form.value.content = postsStore.currentPost.content
  }
})

async function handleUpdate() {
  error.value = ''
  success.value = ''
  const result = await postsStore.update(route.params.id, form.value)
  if (result.success) {
    success.value = 'Post updated!'
    setTimeout(() => router.push(`/posts/${route.params.id}`), 800)
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
