import { defineStore } from 'pinia'

const TOKEN_KEY = 'token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem(TOKEN_KEY)
    },
    hydrate() {
      this.token = localStorage.getItem(TOKEN_KEY)
    },
  },
})

