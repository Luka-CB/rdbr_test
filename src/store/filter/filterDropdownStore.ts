import { create } from "zustand";

interface FilterDropdownStore {
  toggleDepartmentFilterOptions: boolean;
  toggleEmployeeFilterOptions: boolean;
  togglePriorityFilterOptions: boolean;
  setToggleDepartmentFilterOptions: (value: boolean) => void;
  setToggleEmployeeFilterOptions: (value: boolean) => void;
  setTogglePriorityFilterOptions: (value: boolean) => void;
}

const useFilterDropdownStore = create<FilterDropdownStore>((set) => ({
  toggleDepartmentFilterOptions: false,
  toggleEmployeeFilterOptions: false,
  togglePriorityFilterOptions: false,

  setToggleDepartmentFilterOptions: (value: boolean) =>
    set({ toggleDepartmentFilterOptions: value }),

  setToggleEmployeeFilterOptions: (value: boolean) =>
    set({ toggleEmployeeFilterOptions: value }),

  setTogglePriorityFilterOptions: (value: boolean) =>
    set({ togglePriorityFilterOptions: value }),
}));

export default useFilterDropdownStore;
