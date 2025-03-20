import { useEffect, useState } from "react";
import styles from "./EmployeeFilter.module.scss";
import useEmployeeStore from "../../../../store/employeeStore";
import useFilterDropdownStore from "../../../../store/filter/filterDropdownStore";
import useQueryParams from "../../../../hooks/queryParams";
import useFilterStore from "../../../../store/filter/filterStore";

const EmployeeFilter = () => {
  const { employees, getEmployees } = useEmployeeStore();
  const { setToggleEmployeeFilterOptions } = useFilterDropdownStore();
  const { setFilters, filters } = useFilterStore();

  const { replaceQueryParam } = useQueryParams();

  const [pickedFilterId, setPickedFilterId] = useState<number | null>(null);

  useEffect(() => {
    if (!employees?.length) {
      getEmployees();
    }
  }, [employees?.length]);

  useEffect(() => {
    if (filters.employeeId) {
      setPickedFilterId(filters.employeeId);
    }
  }, [filters.employeeId]);

  const handleChooseBtn = () => {
    replaceQueryParam("emp", pickedFilterId as number);
    setFilters(pickedFilterId as number, "employee");
    setToggleEmployeeFilterOptions(false);
  };

  return (
    <div
      className={styles.employee_filter}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.employees}>
        {employees?.map((emp) => (
          <div className={styles.employee} key={emp.id}>
            <input
              type="radio"
              name="department"
              id={`department-${emp.id}`}
              checked={pickedFilterId === emp.id}
              onChange={() => setPickedFilterId(emp.id as number)}
            />
            <img src={emp.avatar as string} alt="avatar" />
            <label htmlFor={`department-${emp.id}`}>
              {emp.name} {emp.surname}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleChooseBtn}>არჩევა</button>
    </div>
  );
};

export default EmployeeFilter;
