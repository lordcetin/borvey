/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useInviteModal = create((set) => ({
  isInviteOpen: false,
  toggleInviteModal: () => set((state:any) => ({ isInviteOpen: !state.isInviteOpen })),
}));
