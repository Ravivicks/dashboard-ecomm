import { create } from "zustand";

type NewBannerFileState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewBannerFileOpen = create<NewBannerFileState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
