import { create } from 'zustand'

interface SMSStore {
  isAuthSMS: boolean
  setIsAuthSMS: (value: boolean) => void
}

const useIsNotification = create<SMSStore>((set) => ({
  isAuthSMS: false,
  setIsAuthSMS: (value) => set({ isAuthSMS: value }),
}))

export default useIsNotification
