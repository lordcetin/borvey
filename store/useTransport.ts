import { create } from 'zustand'

interface RoleState {
  transportype: 'evdenEve' | 'tekliUrun' | 'ofis' | 'kisaMesafe' | null
  setTransportType: (role: 'evdenEve' | 'tekliUrun' | 'ofis' | 'kisaMesafe') => void
}

export const useTransport = create<RoleState>((set) => ({
  transportype: null,
  setTransportType: (role) => set({ transportype: role }),
}))