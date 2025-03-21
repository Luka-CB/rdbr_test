import { create } from "zustand";
import api from "../../utils/axios";

interface UpdateTaskStore {
  status: "idle" | "loading" | "success" | "failed";
  updateTask: (status_id: number, task_id: number) => Promise<void>;
  reset: () => void;
}

const useUpdateTaskStore = create<UpdateTaskStore>((set) => ({
  status: "idle",
  updateTask: async (status_id: number, task_id: number) => {
    set({ status: "loading" });
    try {
      const { data } = await api.put(`/tasks/${task_id}`, { status_id });
      if (data) {
        set({ status: "success" });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
  reset: () => set({ status: "idle" }),
}));

export default useUpdateTaskStore;
