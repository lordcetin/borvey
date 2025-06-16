import { create } from 'zustand'

interface NotificationStore {
  isNotification: boolean
  setIsNotification: (value: boolean) => void
}

const useIsNotification = create<NotificationStore>((set) => ({
  isNotification: false,
  setIsNotification: (value) => set({ isNotification: value }),
}))

export default useIsNotification
