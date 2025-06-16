import { create } from 'zustand'

interface GigStore {
  gigCreate: boolean
  setGigCreate: (value: boolean) => void
}

const useGigCreate = create<GigStore>((set) => ({
  gigCreate: false,
  setGigCreate: (value) => set({ gigCreate: value }),
}))

export default useGigCreate
