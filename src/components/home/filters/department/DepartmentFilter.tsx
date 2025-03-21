import { useEffect, useState } from "react";
import useDepartmentStore from "../../../../store/departmentStore";
import styles from "./DepartmentFilter.module.scss";
import useFilterStore from "../../../../store/filter/filterStore";
import useFilterDropdownStore from "../../../../store/filter/filterDropdownStore";
import useQueryParams from "../../../../hooks/queryParams";

const DepartmentFilter = () => {
  const { departments, getDepartments } = useDepartmentStore();
  const { setToggleDepartmentFilterOptions } = useFilterDropdownStore();
  const { setFilters } = useFilterStore();

  const { updateQueryParams, removeQueryParam, getQueryParams } =
    useQueryParams();

  const [pickedFilterIds, setPickedFilterIds] = useState<number[]>([]);

  const handlePickFilter = (depId: number) => {
    if (pickedFilterIds?.some((pickedFilterId) => pickedFilterId === depId)) {
      const filteredPickedFilterIds = pickedFilterIds.filter(
        (pickedFilterId) => pickedFilterId !== depId
      );
      setPickedFilterIds(filteredPickedFilterIds);
      removeQueryParam("dep", depId);
    } else {
      setPickedFilterIds([...pickedFilterIds, depId]);
    }
  };

  useEffect(() => {
    if (!departments?.length) {
      getDepartments();
    }
  }, [departments?.length, getDepartments]);

  const queryParams: string[] = getQueryParams("dep");

  useEffect(() => {
    if (queryParams.length) {
      setPickedFilterIds(queryParams.map(Number));
    }
  }, [queryParams]);

  const handleChooseBtn = () => {
    updateQueryParams("dep", pickedFilterIds);
    setFilters(pickedFilterIds, "department");
    setToggleDepartmentFilterOptions(false);
  };

  return (
    <div
      className={styles.department_filter}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.departments}>
        {departments?.map((dep) => (
          <div className={styles.department} key={dep.id}>
            <input
              type="checkbox"
              name="department"
              id={`department-${dep.id}`}
              checked={pickedFilterIds?.some(
                (pickedFilterId) => pickedFilterId === dep.id
              )}
              onChange={() => handlePickFilter(dep.id)}
            />
            <label htmlFor={`department-${dep.id}`}>{dep.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleChooseBtn}>არჩევა</button>
    </div>
  );
};

export default DepartmentFilter;
