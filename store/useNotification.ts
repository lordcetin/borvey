/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface Notification {
  openNotification:any;
  setOpenNotification:any;
}

const useNotification = create<Notification>((set) => ({
  openNotification: false,
  setOpenNotification: () => set((state:any) => ({ openNotification: !state.openNotification })),
}));

export default useNotification
