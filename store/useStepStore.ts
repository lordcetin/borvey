// store/useStepStore.ts (veya .js)
import { create } from 'zustand'

interface StepState {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export const useStepStore = create<StepState>((set) => ({
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
}))
