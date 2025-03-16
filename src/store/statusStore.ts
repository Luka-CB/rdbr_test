import { create } from "zustand";
import api from "../utils/axios";

export interface statusIFace {
  id: number;
  name: string;
}

interface StatusStore {
  statuses: statusIFace[];
  status: "idle" | "loading" | "success" | "failed";
  toggleStatusOptions: boolean;
  setToggleStatusOptions: (value: boolean) => void;
  pickedStatus: statusIFace | null;
  setPickedStatus: (status: statusIFace) => void;
  removePickedStatus: () => void;
  getStatuses: () => Promise<void>;
}

const useStatusStore = create<StatusStore>((set, get) => ({
  statuses: [],
  status: "idle",
  toggleStatusOptions: false,
  setToggleStatusOptions: (value: boolean) =>
    set({ toggleStatusOptions: value }),
  pickedStatus: null,
  setPickedStatus: (status: statusIFace) => {
    set({ pickedStatus: status });
    localStorage.setItem("status", JSON.stringify(status));
  },
  removePickedStatus: () => {
    set({ pickedStatus: null, statuses: [] });
    localStorage.removeItem("status");
  },
  getStatuses: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/statuses");
      if (data) {
        set({ status: "success", statuses: data });
        if (!get().pickedStatus) {
          set({ pickedStatus: data[0] });
        }
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

const storedStatus = localStorage.getItem("status") || "";
useStatusStore.setState({
  pickedStatus: storedStatus ? JSON.parse(storedStatus) : null,
});

export default useStatusStore;
