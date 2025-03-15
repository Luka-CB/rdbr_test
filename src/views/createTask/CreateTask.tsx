import { useFormik } from "formik";
import * as yup from "yup";
import Colleague from "../../components/CreateTask/colleague/Colleague";
import DatePicker from "../../components/CreateTask/datePicker/DatePicker";
import Department from "../../components/CreateTask/department/Department";
import Priority from "../../components/CreateTask/priority/Priority";
import Status from "../../components/CreateTask/status/Status";
import styles from "./CreateTask.module.scss";
import useModalStore from "../../store/modalStore";

const CreateTask = () => {
  const { toggleModal } = useModalStore();

  const validationSchema = yup.object().shape({
    title: yup.string().required().min(2).max(255),
    description: yup.string().required().min(2).max(255),
  });

  const onSubmit = () => {};

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema,
      onSubmit,
    });

  return (
    <main className={styles.container}>
      <h1>შექმენი ახალი დავალება</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.col1}>
          <div
            className={
              errors.title && touched.title
                ? styles.input_error
                : values.title?.length >= 2 && values.title?.length <= 255
                ? styles.input_success
                : styles.input_box
            }
          >
            <label htmlFor="title">სათაური*</label>
            <input
              type="text"
              name="title"
              id="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small>მინიმუმ 2 სიმბოლო</small>
            <small>მაქსიმუმ 255 სიმბოლო</small>
          </div>
          <div
            className={
              errors.description && touched.description
                ? styles.input_error
                : values.description?.length >= 2 &&
                  values.description?.length <= 255
                ? styles.input_success
                : styles.input_box
            }
          >
            <label htmlFor="description">აღწერა</label>
            <textarea
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small>მინიმუმ 2 სიმბოლო</small>
            <small>მაქსიმუმ 255 სიმბოლო</small>
          </div>
          <div className={styles.select_inputs}>
            <Priority />
            <Status />
          </div>
        </div>
        <div className={styles.col2}>
          {!toggleModal ? <Department /> : null}
          <Colleague />
          <DatePicker />
          <button type="submit" className={styles.submit_btn}>
            დავალების შექმნა
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTask;
