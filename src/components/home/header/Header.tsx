import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles.btns}>
        <button className={styles.create_colleague_btn}>
          თანამშრომლის შექმნა
        </button>
        <button className={styles.create_task_btn}>
          + შექმენი ახალი დავალება
        </button>
      </div>
    </header>
  );
};

export default Header;
