import { create } from "zustand";
import api from "../utils/axios";

export interface departmentIFace {
  id: number;
  name: string;
}

interface DepartmentStore {
  departments: departmentIFace[];
  status: "idle" | "loading" | "success" | "failed";
  toggleDepartmentOptions: boolean;
  setToggleDepartmentOptions: (value: boolean) => void;
  pickedDepartment: departmentIFace | null;
  pickedDepartmentModal: departmentIFace | null;
  setPickedDepartment: (department: departmentIFace, isModal: boolean) => void;
  getDepartments: () => Promise<void>;
}

const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  status: "idle",
  toggleDepartmentOptions: false,
  setToggleDepartmentOptions: (value: boolean) =>
    set({ toggleDepartmentOptions: value }),
  pickedDepartment: null,
  pickedDepartmentModal: null,
  setPickedDepartment: (department: departmentIFace, isModal: boolean) =>
    isModal
      ? set({ pickedDepartmentModal: department })
      : set({ pickedDepartment: department }),
  getDepartments: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/departments");
      if (data) {
        set({ status: "success", departments: data });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

export default useDepartmentStore;
