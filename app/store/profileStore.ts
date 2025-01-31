import { UserProfile } from '@/app/types/profileTypes'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updateData: Partial<UserProfile>) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updatedData) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updatedData } : null
        })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage',
    }
  )
)