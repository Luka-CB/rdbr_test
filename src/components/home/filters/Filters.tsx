import styles from "./Filters.module.scss";
import { FaChevronDown } from "react-icons/fa6";

const Filters = () => {
  return (
    <div className={styles.filters}>
      <div className={`${styles.filter} ${styles.department}`}>
        <span>დეპარტამენტი</span>
        <FaChevronDown className={styles.icon} />
      </div>
      <div className={`${styles.filter} ${styles.priority}`}>
        <span>პრიორიტეტი</span>
        <FaChevronDown className={styles.icon} />
      </div>
      <div className={`${styles.filter} ${styles.colleague}`}>
        <span>თანამშრომელი</span>
        <FaChevronDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Filters;
