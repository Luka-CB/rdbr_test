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
  removePickedPriority: () => void;
  getPriorities: () => Promise<void>;
}

const usePriorityStore = create<PriorityStore>((set, get) => ({
  priorities: [],
  status: "idle",
  togglePriorityOptions: false,
  setTogglePriorityOptions: (value: boolean) =>
    set({ togglePriorityOptions: value }),
  pickedPriority: null,
  setPickedPriority: (priority: priorityIFace) => {
    set({ pickedPriority: priority });
    localStorage.setItem("priority", JSON.stringify(priority));
  },
  removePickedPriority: () => {
    set({ pickedPriority: null, priorities: [] });
    localStorage.removeItem("priority");
  },
  getPriorities: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/priorities");
      if (data) {
        set({ status: "success", priorities: data });
        if (!get().pickedPriority) {
          set({ pickedPriority: data[1] });
        }
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

const storedPriority = localStorage.getItem("priority") || "";
usePriorityStore.setState({
  pickedPriority: storedPriority ? JSON.parse(storedPriority) : null,
});

export default usePriorityStore;
