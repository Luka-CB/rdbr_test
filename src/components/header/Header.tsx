import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import useModalStore from "../../store/modalStore";

const Header = () => {
  const { setToggleModal } = useModalStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        onClick={() => pathname !== "/" && navigate("/")}
      >
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles.btns}>
        <button
          className={styles.create_colleague_btn}
          onClick={() => setToggleModal(true)}
        >
          თანამშრომლის შექმნა
        </button>
        <button className={styles.create_task_btn}>
          <Link to="/create">+ შექმენი ახალი დავალება</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
