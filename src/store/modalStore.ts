import { create } from "zustand";

interface ModalStore {
  toggleModal: boolean;
  setToggleModal: (value: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  toggleModal: false,
  setToggleModal: (value: boolean) => set({ toggleModal: value }),
}));

export default useModalStore;
