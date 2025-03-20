import DepartmentFilter from "./department/DepartmentFilter";
import styles from "./Filters.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import PriorityFilter from "./priority/PriorityFilter";
import EmployeeFilter from "./employee/EmployeeFilter";
import useFilterDropdownStore from "../../../store/filter/filterDropdownStore";
import useQueryParams from "../../../hooks/queryParams";
import useFilterStore from "../../../store/filter/filterStore";
import { useEffect } from "react";
import PickedFilters from "./pickedFilters/PickedFilters";

const Filters = () => {
  const { getQueryParams } = useQueryParams();
  const { setFilters, filters } = useFilterStore();
  const {
    toggleDepartmentFilterOptions,
    togglePriorityFilterOptions,
    toggleEmployeeFilterOptions,
    setToggleDepartmentFilterOptions,
    setTogglePriorityFilterOptions,
    setToggleEmployeeFilterOptions,
  } = useFilterDropdownStore();

  const deps = getQueryParams("dep");
  const emp = getQueryParams("emp");
  const prtys = getQueryParams("prty");

  const handleSetFilters = () => {
    if (deps?.length || prtys?.length || emp) {
      const modifiedDeps = deps.map((dep) => +dep);
      const modifiedPrtys = prtys.map((prty) => +prty);
      setFilters(modifiedDeps, "department");
      setFilters(modifiedPrtys, "priority");
      setFilters(+emp, "employee");
    }
  };

  useEffect(() => {
    handleSetFilters();
  }, []);

  return (
    <div className={styles.filters}>
      <div className={styles.filter_btns}>
        <div
          className={`${styles.filter} ${styles.department}`}
          onClick={() =>
            setToggleDepartmentFilterOptions(!toggleDepartmentFilterOptions)
          }
        >
          <span>დეპარტამენტი</span>
          <FaChevronDown className={styles.icon} />
        </div>
        <div
          className={`${styles.filter} ${styles.priority}`}
          onClick={() =>
            setTogglePriorityFilterOptions(!togglePriorityFilterOptions)
          }
        >
          <span>პრიორიტეტი</span>
          <FaChevronDown className={styles.icon} />
        </div>
        <div
          className={`${styles.filter} ${styles.colleague}`}
          onClick={() =>
            setToggleEmployeeFilterOptions(!toggleEmployeeFilterOptions)
          }
        >
          <span>თანამშრომელი</span>
          <FaChevronDown className={styles.icon} />
        </div>
      </div>
      {toggleDepartmentFilterOptions ? <DepartmentFilter /> : null}
      {togglePriorityFilterOptions ? <PriorityFilter /> : null}
      {toggleEmployeeFilterOptions ? <EmployeeFilter /> : null}
      <PickedFilters />
    </div>
  );
};

export default Filters;
