import { useEffect, useState } from "react";
import styles from "./PriorityFilter.module.scss";
import usePriorityStore from "../../../../store/priorityStore";
import useFilterDropdownStore from "../../../../store/filter/filterDropdownStore";
import useQueryParams from "../../../../hooks/queryParams";
import useFilterStore from "../../../../store/filter/filterStore";

const PriorityFilter = () => {
  const { priorities, getPriorities } = usePriorityStore();
  const { setTogglePriorityFilterOptions } = useFilterDropdownStore();
  const { setFilters, filters } = useFilterStore();

  const { updateQueryParams, removeQueryParam } = useQueryParams();

  const [pickedFilterIds, setPickedFilterIds] = useState<number[]>([]);

  const handlePickFilter = (priorityId: number) => {
    if (
      pickedFilterIds?.some((pickedFilterId) => pickedFilterId === priorityId)
    ) {
      const filteredPickedFilterIds = pickedFilterIds.filter(
        (pickedFilterId) => pickedFilterId !== priorityId
      );
      setPickedFilterIds(filteredPickedFilterIds);
      removeQueryParam("prty", priorityId);
    } else {
      setPickedFilterIds([...pickedFilterIds, priorityId]);
    }
  };

  useEffect(() => {
    if (!priorities?.length) {
      getPriorities();
    }
  }, [priorities?.length]);

  useEffect(() => {
    if (filters.priorityIds?.length) {
      setPickedFilterIds(filters.priorityIds);
    }
  }, [filters.priorityIds?.length]);

  const handleChooseBtn = () => {
    updateQueryParams("prty", pickedFilterIds);
    setFilters(pickedFilterIds, "priority");
    setTogglePriorityFilterOptions(false);
  };

  return (
    <div
      className={styles.priority_filter}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.priorities}>
        {priorities?.map((priority) => (
          <div className={styles.priority} key={priority.id}>
            <input
              type="checkbox"
              name="priority"
              id={`priority-${priority.id}`}
              checked={pickedFilterIds.some(
                (pickedFilterId) => pickedFilterId === priority.id
              )}
              onChange={() => handlePickFilter(priority.id)}
            />
            <label htmlFor={`priority-${priority.id}`}>{priority.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleChooseBtn}>არჩევა</button>
    </div>
  );
};

export default PriorityFilter;
