import styles from "./Department.module.scss";
import { FaChevronDown } from "react-icons/fa6";

const Department = () => {
  return (
    <div className={styles.container}>
      <label>დეპარტამენტი*</label>
      <div className={styles.select_input}>
        <span>დიზაინის დეპარტამენტი</span>
        <FaChevronDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Department;
