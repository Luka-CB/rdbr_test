import { create } from "zustand";
import api from "../utils/axios";

export interface colleagueIFace {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
}

interface ColleagueStore {
  colleagues: colleagueIFace[];
  status: "idle" | "loading" | "success" | "failed";
  toggleColleagueOptions: boolean;
  setToggleColleagueOptions: (value: boolean) => void;
  pickedColleague: colleagueIFace | null;
  setPickedColleague: (colleague: colleagueIFace) => void;
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
}));

export default useColleagueStore;
