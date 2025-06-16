import { create } from 'zustand'

interface NotificationStore {
  isAdminOpenModal: boolean
  setIsAdminModal: (value: boolean) => void
}

const useAdminModal = create<NotificationStore>((set) => ({
  isAdminOpenModal: false,
  setIsAdminModal: (value) => set({ isAdminOpenModal: value }),
}))

export default useAdminModal
