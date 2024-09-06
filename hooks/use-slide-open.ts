import { create } from "zustand";

type NewSlideState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSlideOpen = create<NewSlideState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
