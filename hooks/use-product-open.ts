import { create } from "zustand";

type NewProductUpdateState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUpdateDialogOpen = create<NewProductUpdateState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
