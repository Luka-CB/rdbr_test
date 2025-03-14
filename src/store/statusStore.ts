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
  setPickedStatus: (priority: statusIFace) => void;
  getStatuses: () => Promise<void>;
}

const useStatusStore = create<StatusStore>((set) => ({
  statuses: [],
  status: "idle",
  toggleStatusOptions: false,
  setToggleStatusOptions: (value: boolean) =>
    set({ toggleStatusOptions: value }),
  pickedStatus: null,
  setPickedStatus: (colleague: statusIFace) => set({ pickedStatus: colleague }),
  getStatuses: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/statuses");
      if (data) {
        set({ status: "success", statuses: data, pickedStatus: data[0] });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

export default useStatusStore;
