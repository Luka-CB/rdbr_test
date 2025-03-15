import { create } from "zustand";
import api from "../utils/axios";

export interface colleagueIFace {
  id?: number;
  name: string;
  department?: { id: number; name: string };
  surname: string;
  avatar: string | unknown;
  department_id?: number;
}

interface ColleagueStore {
  colleagues: colleagueIFace[];
  status: "idle" | "loading" | "success" | "failed";
  toggleColleagueOptions: boolean;
  setToggleColleagueOptions: (value: boolean) => void;
  pickedColleague: colleagueIFace | null;
  setPickedColleague: (colleague: colleagueIFace) => void;
  addEmployee: (colleague: colleagueIFace) => Promise<void>;
  getEmployees: () => Promise<void>;
  reset: () => void;
}

const useColleagueStore = create<ColleagueStore>((set) => ({
  colleagues: [],
  status: "idle",
  toggleColleagueOptions: false,
  setToggleColleagueOptions: (value: boolean) =>
    set({ toggleColleagueOptions: value }),
  pickedColleague: null,
  setPickedColleague: (colleague: colleagueIFace) =>
    set({ pickedColleague: colleague }),
  addEmployee: async (colleague: colleagueIFace) => {
    set({ status: "loading" });
    try {
      const { data } = await api.post("/employees", colleague, {
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
        set({ status: "success", colleagues: data });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
  reset: () => set({ status: "idle" }),
}));

export default useColleagueStore;
