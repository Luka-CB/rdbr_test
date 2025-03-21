import { useEffect } from "react";
import styles from "./PickedFilters.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import useDepartmentStore, {
  departmentIFace,
} from "../../../../store/departmentStore";
import usePriorityStore, {
  priorityIFace,
} from "../../../../store/priorityStore";
import useEmployeeStore from "../../../../store/employeeStore";
import useFilterStore from "../../../../store/filter/filterStore";
import useQueryParams from "../../../../hooks/queryParams";

export interface PickedFilters {
  id: string;
  originalId: number;
  name: string;
  type: string;
}

const PickedFilters = () => {
  const { filters, removeFilter, clearFilters } = useFilterStore();
  const { departments, getDepartments } = useDepartmentStore();
  const { priorities, getPriorities } = usePriorityStore();
  const { employees, getEmployees } = useEmployeeStore();

  const getFilteredData = (
    data: departmentIFace[] | priorityIFace[],
    ids: number[] | undefined,
    type: string
  ) => {
    if (!ids || !data.length) return [];
    return data
      .filter((item) => ids.includes(item.id))
      .map((item) => ({
        id: `${item.id}${item.name}`,
        originalId: item.id,
        name: item.name,
        type,
      }));
  };

  useEffect(() => {
    if (filters.departmentIds?.length && !departments.length) getDepartments();
    if (filters.priorityIds?.length && !priorities.length) getPriorities();
    if (filters.employeeId && !employees.length) getEmployees();
  }, [
    filters,
    departments,
    priorities,
    employees,
    getDepartments,
    getPriorities,
    getEmployees,
  ]);

  const departmentFilters = getFilteredData(
    departments,
    filters.departmentIds,
    "dep"
  );

  const priorityFilters = getFilteredData(
    priorities,
    filters.priorityIds,
    "prty"
  );

  let employeeFilter: PickedFilters[] = [];
  if (filters.employeeId && employees.length) {
    const employee = employees.find((emp) => emp.id === filters.employeeId);
    if (employee) {
      employeeFilter = [
        {
          id: `${employee.id}${employee.name}`,
          originalId: employee.id as number,
          name: `${employee.name} ${employee.surname}`,
          type: "emp",
        },
      ];
    }
  }

  let pickedFilters = [
    ...departmentFilters,
    ...priorityFilters,
    ...employeeFilter,
  ];

  const { removeQueryParam, clearQueryParams } = useQueryParams();

  const handleRemovePickedFilter = (
    id: string,
    originalId: number,
    type: string
  ) => {
    const updatedPickedFilters = pickedFilters.filter((item) => item.id !== id);

    pickedFilters = [...updatedPickedFilters];
    removeQueryParam(type, originalId);
    removeFilter(originalId, type as "dep" | "prty" | "emp");
  };

  const handleClearPickedFilters = () => {
    const types = new Set(pickedFilters.map((pf) => pf.type));
    clearQueryParams(types);
    clearFilters();
  };

  if (pickedFilters.length) {
    return (
      <div className={styles.container}>
        <div className={styles.picked_filters}>
          {pickedFilters?.map((pf) => (
            <div className={styles.picked_filter} key={pf.id}>
              <span>{pf.name}</span>
              <IoCloseOutline
                className={styles.icon}
                onClick={() =>
                  handleRemovePickedFilter(pf.id, pf.originalId, pf.type)
                }
              />
            </div>
          ))}
        </div>
        <div className={styles.clear_btn} onClick={handleClearPickedFilters}>
          <span>გასუფთავება</span>
        </div>
      </div>
    );
  }

  return [];
};

export default PickedFilters;
