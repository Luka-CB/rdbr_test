import Filters from "../../components/home/filters/Filters";
import Header from "../../components/home/header/Header";
import Tasks from "../../components/home/tasks/Tasks";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <main className={styles.container}>
      <Header />
      <h1>დავალებების გვერდი</h1>
      <Filters />
      <Tasks />
    </main>
  );
};

export default Home;
