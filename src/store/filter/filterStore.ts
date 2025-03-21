import { create } from "zustand";

interface filterIFace {
  departmentIds: number[];
  priorityIds: number[];
  employeeId: number | null;
}

interface FilterStore {
  filters: filterIFace;
  setFilters: (
    data: number[] | number[] | (number | null),
    type: "department" | "priority" | "employee"
  ) => void;
  removeFilter: (id: number, type: "dep" | "prty" | "emp") => void;
  clearFilters: () => void;
}

const defaultFilters = { departmentIds: [], priorityIds: [], employeeId: null };

const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilters: (
    data: number[] | number[] | (number | null),
    type: "department" | "priority" | "employee"
  ) => {
    set((state) => {
      const newFilters = {
        ...state.filters,
        [type === "department"
          ? "departmentIds"
          : type === "priority"
          ? "priorityIds"
          : "employeeId"]: data,
      };

      if (JSON.stringify(newFilters) !== JSON.stringify(state.filters)) {
        return { filters: newFilters };
      }
      return state;
    });
  },
  removeFilter: (id: number | null, type: "dep" | "prty" | "emp") => {
    set((state) => {
      if (type === "dep") {
        return {
          filters: {
            ...state.filters,
            departmentIds: state.filters.departmentIds.filter(
              (depId) => depId !== id
            ),
          },
        };
      } else if (type === "prty") {
        return {
          filters: {
            ...state.filters,
            priorityIds: state.filters.priorityIds.filter(
              (prtyId) => prtyId !== id
            ),
          },
        };
      } else if (type === "emp") {
        return {
          filters: {
            ...state.filters,
            employeeId: null,
          },
        };
      }
      return state;
    });
  },
  clearFilters: () => {
    set({ filters: defaultFilters });
  },
}));

export default useFilterStore;
