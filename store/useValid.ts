import { create } from 'zustand'

interface ValidStore {
  isValid: boolean
  setIsValid: (value: boolean) => void
}

const useValid = create<ValidStore>((set) => ({
  isValid: false,
  setIsValid: (value) => set({ isValid: value }),
}))

export default useValid
