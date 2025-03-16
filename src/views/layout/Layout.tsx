import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../../components/header/Header";
import usePriorityStore from "../../store/priorityStore";
import useStatusStore from "../../store/statusStore";
import useDepartmentStore from "../../store/departmentStore";
import useColleagueStore from "../../store/employeeStore";
import Modal from "../../components/modal/Modal";
import useModalStore from "../../store/modalStore";
import { useEffect } from "react";

const Layout = () => {
  const { toggleModal } = useModalStore();

  const { togglePriorityOptions, setTogglePriorityOptions } =
    usePriorityStore();
  const { toggleStatusOptions, setToggleStatusOptions } = useStatusStore();
  const { toggleDepartmentOptions, setToggleDepartmentOptions } =
    useDepartmentStore();
  const { toggleEmployeeOptions, setToggleEmployeeOptions } =
    useColleagueStore();

  const handleClosePopups = () => {
    if (togglePriorityOptions) setTogglePriorityOptions(false);
    if (toggleStatusOptions) setToggleStatusOptions(false);
    if (toggleDepartmentOptions) setToggleDepartmentOptions(false);
    if (toggleEmployeeOptions) setToggleEmployeeOptions(false);
  };

  useEffect(() => {
    if (toggleModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [toggleModal]);

  return (
    <main className={styles.container} onClick={handleClosePopups}>
      <Header />
      {toggleModal ? <Modal /> : null}
      <Outlet />
    </main>
  );
};

export default Layout;
