import { create } from "zustand";

type NewBulkProductState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenBulkProduct = create<NewBulkProductState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
