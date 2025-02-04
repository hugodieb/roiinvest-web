import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import { useRouter, redirect, usePathname } from 'next/navigation'
import { useAuthStore } from '@/app/store/auth'
import { handleApiError } from '@/app/lib/errors'

import toast from 'react-hot-toast'
import { activation, LoginInputs, RegisterInputs, resetInputEmail, resetInputsPassword } from '../types/auth'

export function useAuth() {
  const { setAuth, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

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
      router.push('/');
      toast.success(
        'Registro realizado com sucesso! Vá para o email cadastrado para ativar seu login!'
      );
    },
    onError: handleApiError
  })

  const activationMutation = useMutation({
    mutationFn: async (data: activation) => {
      await api.post('/users/activation/', data)
    },
    onSuccess: () => {
      toast.success('Conta ativada com sucesso.')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/logout/')
    },
    onSuccess: () => {
      logout()
      toast.success('Voçe foi deslogado!.');
      router.push('/auth/login');
    },
    onError: handleApiError
  })

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: resetInputEmail) => {
      await api.post('/users/reset_password/', data)
    },
    onSuccess: () => {
      toast.success('Enviamos um email para você redefinir sua nova senha')
    },
    onError: handleApiError
  })

  const resetPasswordConfirmMutation = useMutation({
    mutationFn: async (data: resetInputsPassword) => {
      await api.post('/users/reset_password_confirm/', data)
    },
    onSuccess: () => {
      router.push('/auth/login');
      toast.success('Sua nova senha foi atualizada')
    },
    onError: handleApiError
  })

  const checkAuth = async () => {
    try {
      const response = await api.get('/users/me/')
      setAuth(response.data)
      return response.data
    } catch (error) {
      logout()
      if (pathname !== '/auth/register') {
        redirect('/auth/login');
      }
      throw error
    }
  }

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    retry: false
  })

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: useAuthStore((state) => state.isAuthenticated),
    login: loginMutation.mutate,
    newRegister: registerMutation.mutate,
    activation: activationMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    resetPasswordConfirm: resetPasswordConfirmMutation.mutate,
    logout: logoutMutation.mutate
  }
}