import { create } from "zustand";

interface DeadlineStore {
  date: Date | null;
  setDate: (date: Date | null) => void;
  removeDate: () => void;
  dateError: boolean;
  setDateError: (value: boolean) => void;
}

const useDeadlineStore = create<DeadlineStore>((set) => ({
  date: null,
  dateError: false,
  setDate: (date: Date | null) => {
    set({ date, dateError: false });
    if (date) localStorage.setItem("deadline", JSON.stringify(date));
  },
  removeDate: () => {
    set({ date: null });
    localStorage.removeItem("deadline");
  },
  setDateError: (value: boolean) => set({ dateError: value }),
}));

const storedDeadline = localStorage.getItem("deadline") || "";
useDeadlineStore.setState({
  date: storedDeadline ? JSON.parse(storedDeadline) : null,
});

export default useDeadlineStore;
