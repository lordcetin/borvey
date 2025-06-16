/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface Offer {
  openOfferModal:any;
  setOpenOfferModal:any;
}

const useOpenOfferModal = create<Offer>((set) => ({
  openOfferModal: false,
  setOpenOfferModal: () => set((state:any) => ({ openOfferModal: !state.openOfferModal })),
}));

export default useOpenOfferModal
