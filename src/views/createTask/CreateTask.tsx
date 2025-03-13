import Colleague from "../../components/CreateTask/colleague/Colleague";
import DatePicker from "../../components/CreateTask/datePicker/DatePicker";
import Department from "../../components/CreateTask/department/Department";
import Priority from "../../components/CreateTask/priority/Priority";
import Status from "../../components/CreateTask/status/Status";
import styles from "./CreateTask.module.scss";

const CreateTask = () => {
  return (
    <main className={styles.container}>
      <h1>შექმენი ახალი დავალება</h1>
      <form>
        <div className={styles.col1}>
          <div className={styles.input_box}>
            <label htmlFor="title">სათაური*</label>
            <input type="text" name="title" id="title" />
            <small>მინიმუმ 2 სიმბოლო</small>
            <small>მაქსიმუმ 255 სიმბოლო</small>
          </div>
          <div className={styles.input_box}>
            <label htmlFor="description">აღწერა</label>
            <textarea name="description" id="description" />
            <small>მინიმუმ 2 სიმბოლო</small>
            <small>მაქსიმუმ 255 სიმბოლო</small>
          </div>
          <div className={styles.select_inputs}>
            <Priority />
            <Status />
          </div>
        </div>
        <div className={styles.col2}>
          <Department />
          <Colleague />
          <DatePicker />
          <button type="submit">დავალების შექმნა</button>
        </div>
      </form>
    </main>
  );
};

export default CreateTask;
