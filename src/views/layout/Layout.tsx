import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../../components/header/Header";
import usePriorityStore from "../../store/priorityStore";
import useStatusStore from "../../store/statusStore";
import useDepartmentStore from "../../store/departmentStore";
import useColleagueStore from "../../store/colleagueStore";
import Modal from "../../components/modal/Modal";

const Layout = () => {
  const { togglePriorityOptions, setTogglePriorityOptions } =
    usePriorityStore();
  const { toggleStatusOptions, setToggleStatusOptions } = useStatusStore();
  const { toggleDepartmentOptions, setToggleDepartmentOptions } =
    useDepartmentStore();
  const { toggleColleagueOptions, setToggleColleagueOptions } =
    useColleagueStore();

  const handleClosePopups = () => {
    if (togglePriorityOptions) setTogglePriorityOptions(false);
    if (toggleStatusOptions) setToggleStatusOptions(false);
    if (toggleDepartmentOptions) setToggleDepartmentOptions(false);
    if (toggleColleagueOptions) setToggleColleagueOptions(false);
  };

  return (
    <main className={styles.container} onClick={handleClosePopups}>
      <Header />
      <Modal />
      <Outlet />
    </main>
  );
};

export default Layout;
