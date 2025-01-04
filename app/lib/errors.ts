import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export interface ApiError {
  detail: string;
  code: string;
}

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError

    if (data?.detail) {
      toast.error("Verifique seu email e senha!")
    } else {
      toast.error('Ocorreu um erro inesperado')
    }

    return data
  }

  toast.error('Ocorreu um erro inesperado')
  return null
}