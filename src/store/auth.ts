import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'HR_MANAGER' | 'MANAGER' | 'EMPLOYEE'
  companyId: string
  title?: string
  avatar?: string
}

interface AuthState {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  updateUser: (partial: Partial<AuthUser>) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: 'meipay-auth',
    }
  )
)
