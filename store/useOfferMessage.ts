/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface RoleState {
  offerMessage: any
  setOfferMessage: (role: 'evdenEve' | 'tekliUrun' | 'ofis' | 'kisaMesafe') => void
}

const useOfferMessage = create<RoleState>((set) => ({
  offerMessage: null,
  setOfferMessage: (role) => set({ offerMessage: role }),
}))

export default useOfferMessage