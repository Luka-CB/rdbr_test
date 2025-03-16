import { create } from "zustand";
import api from "../../utils/axios";

interface addTaskIFace {
  name: string;
  description: string;
  due_date: string | Date;
  status_id: number | undefined;
  employee_id: number | undefined;
  priority_id: number | undefined;
}

interface AddTaskStore {
  status: "idle" | "loading" | "success" | "failed";
  addTask: (task: addTaskIFace) => Promise<void>;
  reset: () => void;
}

const useAddTaskStore = create<AddTaskStore>((set) => ({
  status: "idle",
  addTask: async (task: addTaskIFace) => {
    set({ status: "loading" });
    try {
      const { data } = await api.post("/tasks", task);
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

export default useAddTaskStore;
