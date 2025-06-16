import { create } from 'zustand'

interface FilterStore {
  filterModal: boolean
  setFilterModal: (value: boolean) => void
}

const useFilterModal = create<FilterStore>((set) => ({
  filterModal: false,
  setFilterModal: (value) => set({ filterModal: value }),
}))

export default useFilterModal
