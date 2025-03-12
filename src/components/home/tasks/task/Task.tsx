import styles from "./Task.module.scss";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { TfiComment } from "react-icons/tfi";
import { FaEquals } from "react-icons/fa6";

interface propsIFace {
  borderColor: string;
}

const Task: React.FC<propsIFace> = ({ borderColor }) => {
  return (
    <div
      className={styles.task}
      style={{ borderColor, outlineColor: borderColor }}
    >
      <header className={styles.header}>
        <div className={styles.pills}>
          <div className={styles.priority}>
            <FaEquals className={styles.icon} />
            <span>საშუალო</span>
          </div>
          <div className={styles.department}>
            <span>დიზაინი</span>
          </div>
        </div>
        <small>22 იანვ, 2022</small>
      </header>
      <div className={styles.body}>
        <h5>Redberry-ს საიტის ლენდინგის დიზაინი</h5>
        <p>
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
      </div>
      <footer className={styles.footer}>
        <div className={styles.avatar}></div>
        <div className={styles.comments}>
          <TfiComment className={styles.icon} />
          <span>8</span>
        </div>
      </footer>
    </div>
  );
};

export default Task;
