import { create } from "zustand";

type NewCartState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCartDetails = create<NewCartState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
