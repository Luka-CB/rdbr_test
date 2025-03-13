import styles from "./Status.module.scss";
import { FaChevronDown } from "react-icons/fa6";

const Status = () => {
  return (
    <div className={styles.container}>
      <label>სტატუსი*</label>
      <div className={styles.select_input}>
        <span>დასაწყები</span>
        <FaChevronDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Status;
