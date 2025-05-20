// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(user, token) {
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('jwt', token)
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
    },

    loadFromStorage() {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('jwt')
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser)
        this.token = storedToken
      }
    }
  }
})
