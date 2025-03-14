import { useEffect } from "react";
import usePriorityStore, { priorityIFace } from "../../../store/priorityStore";
import styles from "./Priority.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Priority = () => {
  const {
    priorities,
    getPriorities,
    pickedPriority,
    setPickedPriority,
    togglePriorityOptions,
    setTogglePriorityOptions,
  } = usePriorityStore();

  const handlePickPriority = (value: priorityIFace) => {
    setPickedPriority(value);
    setTogglePriorityOptions(false);
  };

  useEffect(() => {
    if (!priorities.length) {
      getPriorities();
    }
  }, [priorities.length]);

  return (
    <div className={styles.container}>
      <label>პრიორიტეტი*</label>
      <div
        className={
          togglePriorityOptions
            ? styles.select_input_active
            : styles.select_input
        }
        onClick={() => setTogglePriorityOptions(!togglePriorityOptions)}
      >
        <div className={styles.default_value}>
          <img src={pickedPriority?.icon} alt="icon" />
          <span>{pickedPriority?.name}</span>
        </div>
        {togglePriorityOptions ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </div>
      {togglePriorityOptions ? (
        <div className={styles.options} onClick={(e) => e.stopPropagation()}>
          {priorities?.map((priority) => (
            <div
              className={styles.option}
              key={priority.id}
              onClick={() => handlePickPriority(priority)}
            >
              <img src={priority?.icon} alt="icon" />
              <span>{priority?.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Priority;
