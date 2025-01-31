import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/store/auth'

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/api`,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const router = useRouter()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await api.post('/jwt/refresh')
        return api(originalRequest)
      } catch (err) {
        useAuthStore.getState().logout()
        router.push('/auth/login')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)

  })

export { api }