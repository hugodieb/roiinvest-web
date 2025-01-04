import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode;
  authPage?: boolean; // true para páginas de auth (login/registro)
}

export function ProtectedRoute({ children, authPage = false }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (authPage && isAuthenticated) {
        router.push('/dashboard')
      } else if (!authPage && !isAuthenticated) {
        router.push('/auth/login')
      }
    }
  }, [isLoading, isAuthenticated, authPage, router])

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return <div>Carregando...</div>
  }

  // Se for página de auth e estiver autenticado, não mostra nada enquanto redireciona
  if (authPage && isAuthenticated) {
    return null
  }

  // Se não for página de auth e não estiver autenticado, não mostra nada enquanto redireciona
  if (!authPage && !isAuthenticated) {
    return null
  }

  // Caso contrário, mostra o conteúdo
  return <>{children}</>
}