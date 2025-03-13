import styles from "./Priority.module.scss";
import { FaChevronDown } from "react-icons/fa6";

const Priority = () => {
  return (
    <div className={styles.container}>
      <label>პრიორიტეტი*</label>
      <div className={styles.select_input}>
        <div className={styles.default_value}>
          <img
            src="https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg"
            alt="icon"
          />
          <span>საშუალო</span>
        </div>
        <FaChevronDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Priority;
