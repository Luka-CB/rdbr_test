import { create } from "zustand";
import api from "../utils/axios";

export interface employeeIFace {
  id?: number;
  name: string;
  department?: { id: number; name: string };
  surname: string;
  avatar: string | unknown;
  department_id?: number;
}

interface EmployeeStore {
  employees: employeeIFace[];
  status: "idle" | "loading" | "success" | "failed";
  employeeError: boolean;
  setEmployeeError: (value: boolean) => void;
  toggleEmployeeOptions: boolean;
  setToggleEmployeeOptions: (value: boolean) => void;
  pickedEmployee: employeeIFace | null;
  setPickedEmployee: (employee: employeeIFace | null) => void;
  removePickedEmployee: () => void;
  addEmployee: (employee: employeeIFace) => Promise<void>;
  getEmployees: () => Promise<void>;
  reset: () => void;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  status: "idle",
  employeeError: false,
  setEmployeeError: (value: boolean) => set({ employeeError: value }),
  toggleEmployeeOptions: false,
  setToggleEmployeeOptions: (value: boolean) =>
    set({ toggleEmployeeOptions: value }),
  pickedEmployee: null,
  setPickedEmployee: (employee: employeeIFace | null) => {
    set({ pickedEmployee: employee, employeeError: false });
    if (employee) localStorage.setItem("employee", JSON.stringify(employee));
  },
  removePickedEmployee: () => {
    set({ pickedEmployee: null });
    localStorage.removeItem("employee");
  },
  addEmployee: async (employee: employeeIFace) => {
    set({ status: "loading" });
    try {
      const { data } = await api.post("/employees", employee, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data) {
        set({ status: "success" });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
  getEmployees: async () => {
    set({ status: "loading" });
    try {
      const { data } = await api.get("/employees");
      if (data) {
        set({ status: "success", employees: data });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
  reset: () => set({ status: "idle" }),
}));

const storedEmployee = localStorage.getItem("employee") || "";
useEmployeeStore.setState({
  pickedEmployee: storedEmployee ? JSON.parse(storedEmployee) : null,
});

export default useEmployeeStore;
