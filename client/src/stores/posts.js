import { defineStore } from 'pinia'
import { postsAPI } from '../services/api'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const { data } = await postsAPI.getAll()
        this.posts = data.posts
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch posts'
      } finally {
        this.loading = false
      }
    },

    async fetchOne(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await postsAPI.getOne(id)
        this.currentPost = data.post
      } catch (err) {
        this.error = err.response?.data?.message || 'Post not found'
      } finally {
        this.loading = false
      }
    },

    async create(postData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await postsAPI.create(postData)
        this.posts.unshift(data.post)
        return { success: true, post: data.post }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to create post'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async update(id, postData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await postsAPI.update(id, postData)
        const idx = this.posts.findIndex((p) => p._id === id)
        if (idx !== -1) this.posts[idx] = data.post
        this.currentPost = data.post
        return { success: true, post: data.post }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update post'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      this.error = null
      try {
        await postsAPI.delete(id)
        this.posts = this.posts.filter((p) => p._id !== id)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to delete post'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },
  },
})
