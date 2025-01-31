import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import { useProfileStore } from '@/app/store/profileStore'
import { handleApiError } from '@/app/lib/errors'
import { UserProfile } from '../types/profileTypes'

export function useProfile() {
  const { setProfile, updateProfile } = useProfileStore()

  const fetchProfile = async () => {
    const response = await api.get('/profile')
    setProfile(response.data)
    return response.data
  }

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      const response = await api.patch('/profile', data)
      return response.data
    },
    onSuccess: (updatedData) => {
      updateProfile(updatedData)
    },
    onError: handleApiError
  })

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false
  })

  return {
    profile,
    isLoading,
    updateProfile: updateProfileMutation.mutate
  }
}
