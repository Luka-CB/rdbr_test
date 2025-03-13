import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../../components/header/Header";

const Layout = () => {
  return (
    <main className={styles.container}>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
