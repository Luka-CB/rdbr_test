import { useEffect } from "react";
import useStatusStore, { statusIFace } from "../../../store/statusStore";
import styles from "./Status.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Status = () => {
  const {
    statuses,
    getStatuses,
    pickedStatus,
    setPickedStatus,
    toggleStatusOptions,
    setToggleStatusOptions,
  } = useStatusStore();

  useEffect(() => {
    if (!statuses?.length) {
      getStatuses();
    }
  }, [statuses?.length]);

  const handlePickStatus = (value: statusIFace) => {
    setPickedStatus(value);
    setToggleStatusOptions(false);
  };

  return (
    <div className={styles.container}>
      <label>სტატუსი*</label>
      <div
        className={
          toggleStatusOptions ? styles.select_input_active : styles.select_input
        }
        onClick={() => setToggleStatusOptions(!toggleStatusOptions)}
      >
        <span>{pickedStatus?.name}</span>
        {toggleStatusOptions ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </div>
      {toggleStatusOptions ? (
        <div className={styles.options} onClick={(e) => e.stopPropagation()}>
          {statuses?.map((status) => (
            <div
              className={styles.option}
              key={status.id}
              onClick={() => handlePickStatus(status)}
            >
              <span>{status.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Status;
