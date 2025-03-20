import { use, useEffect } from "react";
import useStatusStore, { statusIFace } from "../../../store/statusStore";
import styles from "./Status.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

interface propsIFace {
  hasLabel?: boolean;
}

const Status: React.FC<propsIFace> = ({ hasLabel = true }) => {
  const {
    statuses,
    getStatuses,
    pickedStatus,
    pickedStatusDetails,
    setPickedStatus,
    toggleStatusOptions,
    setToggleStatusOptions,
  } = useStatusStore();

  useEffect(() => {
    if (!statuses?.length) {
      getStatuses();
    }
  }, [statuses?.length]);

  const { pathname } = useLocation();

  const handlePickStatus = (value: statusIFace) => {
    if (pathname.split("/")[1] === "details") {
      setPickedStatus(value, true);
    } else {
      setPickedStatus(value);
    }
    setToggleStatusOptions(false);
  };

  return (
    <div className={styles.container}>
      {hasLabel ? <label>სტატუსი*</label> : null}
      <div
        className={
          toggleStatusOptions ? styles.select_input_active : styles.select_input
        }
        onClick={() => setToggleStatusOptions(!toggleStatusOptions)}
      >
        <span>
          {pickedStatusDetails ? pickedStatusDetails?.name : pickedStatus?.name}
        </span>
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
