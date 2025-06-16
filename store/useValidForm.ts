/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1, "Başlık alanı zorunludur"),
  description: z.string().min(1, "Açıklama alanı zorunludur"),
  provinceFrom: z.string().min(1, "İl (Nereden) alanı zorunludur"),
  districtFrom: z.string().min(1, "İlçe (Nereden) alanı zorunludur"),
  provinceTo: z.string().min(1, "İl (Nereye) alanı zorunludur"),
  districtTo: z.string().min(1, "İlçe (Nereye) alanı zorunludur"),
})

type AddressDetails = z.infer<typeof formSchema>

interface AddressState {
  addressDetails: Partial<AddressDetails>
  setAddressDetails: (details: Partial<AddressDetails>) => void
  touchedFields: { [key in keyof AddressDetails]?: boolean }
  setFieldTouched: (field: keyof AddressDetails) => void
  validationErrors: { [key: string]: string }
  isValid: boolean
  setIsValid: (value: boolean) => void
  validate: () => void
}

const useValidForm = create<AddressState>((set, get) => ({
  addressDetails: {},
  touchedFields: {},
  validationErrors: {},
  isValid: false,
  setIsValid: (value) => set({ isValid: value }),
  setAddressDetails: (details) =>
    set((state) => ({
      addressDetails: { ...state.addressDetails, ...details },
    })),
  setFieldTouched: (field) =>
    set((state) => ({
      touchedFields: { ...state.touchedFields, [field]: true },
    })),
  validate: () => {
    const { addressDetails, touchedFields } = get()
    const result = formSchema.safeParse(addressDetails)
    const newErrors: { [key: string]: string } = {}

    if (!result.success) {
      const fieldErrors:any = result.error.flatten().fieldErrors
      for (const key in fieldErrors) {
        if (touchedFields[key as keyof AddressDetails]) {
          newErrors[key] = fieldErrors[key]![0]
        }
      }
      set({ validationErrors: newErrors, isValid: false })
    } else {
      set({ validationErrors: {}, isValid: true })
    }
  },
}))

export default useValidForm
