import { create } from "zustand";

type NewBulkProductUpdateState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenBulkProductUpdate = create<NewBulkProductUpdateState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
