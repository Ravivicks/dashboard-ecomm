import { create } from "zustand";

type NewBulkProductLocaleUpdateState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenBulkProductLocaleUpdate =
  create<NewBulkProductLocaleUpdateState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
