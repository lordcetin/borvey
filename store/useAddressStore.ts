// useAddressStore.ts
import { create } from 'zustand'

interface AddressDetails {
  title?: string
  description?: string
  provinceFrom?: string
  districtFrom?: string
  provinceTo?:string 
  districtTo?:string
}

interface AddressStore {
  addressDetails: AddressDetails
  setAddressDetails: (details: Partial<AddressDetails>) => void
}

const useAddressStore = create<AddressStore>((set) => ({
  addressDetails: {},
  setAddressDetails: (details) =>
    set((state) => ({
      addressDetails: {
        ...state.addressDetails,
        ...details,
      },
    })),
}))

export default useAddressStore
