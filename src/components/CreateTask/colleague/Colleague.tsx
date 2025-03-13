import styles from "./Colleague.module.scss";
import { FaChevronDown } from "react-icons/fa6";

const Colleague = () => {
  return (
    <div className={styles.container}>
      <label>პასუხისმგებელი თანამშრომელი*</label>
      <div className={styles.select_input}>
        <span></span>
        <FaChevronDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Colleague;
