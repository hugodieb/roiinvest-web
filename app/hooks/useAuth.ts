import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/app/store/auth'
import { handleApiError } from '@/app/lib/errors'

import toast from 'react-hot-toast'
import { LoginInputs, RegisterInputs, resetInputEmail, resetInputsPassword } from '../types/auth'

export function useAuth() {
  const { setAuth, logout } = useAuthStore()
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginInputs) => {
      await api.post('/jwt/create/', data)

      const userResponse = await api.get('/users/me/')
      return userResponse.data
    },
    onSuccess: (user) => {
      setAuth(user);
      router.push('/');
      toast.success('Login realizado com sucesso!');
    },
    onError: handleApiError
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInputs) => {
      await api.post('/users/', data)
    },
    onSuccess: () => {
      router.push('/auth/login');
      toast.success(
        'Registro realizado com sucesso! Vá para o email cadastrado para ativar seu login!'
      );
    },
    onError: handleApiError
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/logout/')
    },
    onSuccess: () => {
      logout()
      router.push('/auth/login');
      toast.success('Voçe foi deslogado!.');
    },
    onError: handleApiError
  })

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: resetInputEmail) => {
      await api.post('/users/reset_password/', data)
    }
  })

  const resetPasswordConfirmMutation = useMutation({
    mutationFn: async (data: resetInputsPassword) => {
      await api.post('/users/reset_password_confirm/', data)
    }
  })

  const checkAuth = async () => {
    try {
      const response = await api.get('/users/me/')
      setAuth(response.data)
      return response.data
    } catch (error) {
      logout()
      throw error
    }
  }

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    retry: false
  })

  return {
    user,
    isLoading,
    isAuthenticated: useAuthStore((state) => state.isAuthenticated),
    login: loginMutation.mutate,
    newRegister: registerMutation.mutate,
    useResetPassword: resetPasswordMutation.mutate,
    useResetPasswordConfirm: resetPasswordConfirmMutation.mutate,
    logout: logoutMutation.mutate
  }
}