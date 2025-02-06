import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import { useProfileStore } from '@/app/store/profileStore'
import { handleApiError } from '@/app/lib/errors'
import { useAuthStore } from '../store/auth'
import toast from 'react-hot-toast'

export function useProfile() {
  const { user } = useAuthStore()
  const { setProfile, updateProfile } = useProfileStore()

  const fetchProfile = async () => {
    const response = await api.get('/profile')
    setProfile(response.data)
    return response.data
  }

  const updateProfileMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.patch(`/profile/${data.get("id")}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (updatedData) => {
      console.log("updatestore", updatedData)
      updateProfile(updatedData)
      toast.success(
        'Perfil atualizado com sucesso!'
      );
    },
    onError: handleApiError
  })

  const updateAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('avatar', file)
      const response = await api.post('/profile/update_avatar/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    },
    onSuccess: (updateData) => {
      updateProfile(updateData)
      toast.success('Avatar atualizado com sucesso!')
    },
    onError: handleApiError
  })

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false,
    enabled: !!user,
  })

  return {
    profile,
    isLoading,
    updateAvatar: updateAvatarMutation.mutate,
    updateProfile: updateProfileMutation.mutate
  }
}
