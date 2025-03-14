import { create } from "zustand";
import api from "../utils/axios";

export interface priorityIFace {
  id: number;
  name: string;
  icon: string;
}

interface PriorityStore {
  priorities: priorityIFace[];
  status: "idle" | "loading" | "success" | "failed";
  togglePriorityOptions: boolean;
  setTogglePriorityOptions: (value: boolean) => void;
  pickedPriority: priorityIFace | null;
  setPickedPriority: (priority: priorityIFace) => void;
  getPriorities: () => Promise<void>;
}

const usePriorityStore = create<PriorityStore>((set) => ({
  priorities: [],
  status: "idle",
  togglePriorityOptions: false,
  setTogglePriorityOptions: (value: boolean) =>
    set({ togglePriorityOptions: value }),
  pickedPriority: null,
  setPickedPriority: (colleague: priorityIFace) =>
    set({ pickedPriority: colleague }),
  getPriorities: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/priorities");
      if (data) {
        set({ status: "success", priorities: data, pickedPriority: data[1] });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

export default usePriorityStore;
