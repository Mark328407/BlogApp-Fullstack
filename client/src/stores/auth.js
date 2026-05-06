import { defineStore } from 'pinia'
import { authAPI } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async register(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authAPI.register(credentials)
        this.token = data.token
        this.user = { ...data.user, _id: String(data.user._id || data.user.id) }
        localStorage.setItem('token', data.token)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authAPI.login(credentials)
        this.token = data.token
        // Normalize user so _id is always a plain string
        this.user = { ...data.user, _id: String(data.user._id || data.user.id) }
        localStorage.setItem('token', data.token)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchMe() {
      if (!this.token) return
      try {
        const { data } = await authAPI.getMe()
        // Normalize user so _id is always a plain string
        this.user = { ...data.user, _id: String(data.user._id || data.user.id) }
      } catch {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
