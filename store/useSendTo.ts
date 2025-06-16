import { create } from 'zustand'

interface RoleState {
  isCustomer: 'user' | 'service' | 'offerUpdate' | 'comment' | 'denied' | null
  setIsCustomer: (role: 'service' | 'user' | 'offerUpdate' | 'comment' | 'denied') => void
}

const useSendTo = create<RoleState>((set) => ({
  isCustomer: null,
  setIsCustomer: (role) => set({ isCustomer: role }),
}))

export default useSendTo