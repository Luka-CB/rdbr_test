import { create } from "zustand";
import api from "../../utils/axios";
import { statusIFace } from "../statusStore";
import { priorityIFace } from "../priorityStore";
import { departmentIFace } from "../departmentStore";
import { employeeIFace } from "../employeeStore";

export interface taskIFace {
  id: number;
  name: string;
  description: string;
  due_date: string | Date;
  status: statusIFace;
  priority: priorityIFace;
  department: departmentIFace;
  employee: employeeIFace;
}

interface TaskStore {
  tasks: taskIFace[];
  task: taskIFace | null;
  filteredTasks: string | null;
  status: "idle" | "loading" | "success" | "failed";
  getTasks: () => Promise<void>;
  getTask: (id: number) => Promise<void>;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  task: null,
  filteredTasks: null,
  status: "idle",
  getTasks: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/tasks");
      if (data) {
        set({ status: "success", tasks: data });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
  getTask: async (id: number) => {
    set({ status: "loading" });
    try {
      const { data } = await api.get(`/tasks/${id}`);
      if (data) {
        set({ status: "success", task: data });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

export default useTaskStore;
