import { create } from "zustand";
import api from "../utils/axios";

export interface departmentIFace {
  id: number;
  name: string;
}

interface DepartmentStore {
  departments: departmentIFace[];
  status: "idle" | "loading" | "success" | "failed";
  departmentError: boolean;
  setDepartmentError: (value: boolean) => void;
  toggleDepartmentOptions: boolean;
  setToggleDepartmentOptions: (value: boolean) => void;
  pickedDepartment: departmentIFace | null;
  pickedDepartmentModal: departmentIFace | null;
  setPickedDepartment: (
    department: departmentIFace | null,
    isModal: boolean
  ) => void;
  getDepartments: () => Promise<void>;
}

const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  status: "idle",
  departmentError: false,
  setDepartmentError: (value) => set({ departmentError: value }),
  toggleDepartmentOptions: false,
  setToggleDepartmentOptions: (value: boolean) =>
    set({ toggleDepartmentOptions: value }),
  pickedDepartment: null,
  pickedDepartmentModal: null,
  setPickedDepartment: (
    department: departmentIFace | null,
    isModal: boolean
  ) => {
    if (isModal) {
      set({ pickedDepartmentModal: department, departmentError: false });
    } else {
      set({ pickedDepartment: department, departmentError: false });
      localStorage.setItem("department", JSON.stringify(department));
    }
  },
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

const storedDepartment = localStorage.getItem("department") || "";
useDepartmentStore.setState({
  pickedDepartment: storedDepartment ? JSON.parse(storedDepartment) : null,
});

export default useDepartmentStore;
