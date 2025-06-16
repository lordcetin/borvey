import { create } from 'zustand'

interface RoleState {
  service: 'service' | 'customer' | null
  setService: (role: 'service' | 'customer') => void
}

export const useRoleStore = create<RoleState>((set) => ({
  service: null,
  setService: (role) => set({ service: role }),
}))