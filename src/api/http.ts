import axios from 'axios'
import { getActivePinia } from 'pinia'
import { useAuthStore } from '../stores/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

http.interceptors.request.use((config) => {
  const storeToken = getActivePinia() ? useAuthStore().token : null
  const token = storeToken || localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
