import { create } from "zustand";

type NewBannerState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useBannerOpen = create<NewBannerState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
