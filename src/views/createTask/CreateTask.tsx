import { useFormik } from "formik";
import * as yup from "yup";
import Colleague from "../../components/CreateTask/colleague/Colleague";
import DatePicker from "../../components/CreateTask/datePicker/DatePicker";
import Department from "../../components/CreateTask/department/Department";
import Priority from "../../components/CreateTask/priority/Priority";
import Status from "../../components/CreateTask/status/Status";
import styles from "./CreateTask.module.scss";

const CreateTask = () => {
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
          <div className={styles.input_box}>
            <label htmlFor="title">სათაური*</label>
            <input
              type="text"
              name="title"
              id="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.title && touched.title ? styles.inputError : undefined
              }
            />
            <small
              className={
                errors.title && touched.title && values.title?.length < 2
                  ? styles.msgError
                  : values.title?.length >= 2
                  ? styles.msgSuccess
                  : undefined
              }
            >
              მინიმუმ 2 სიმბოლო
            </small>
            <small
              className={
                errors.title && touched.title
                  ? styles.msgError
                  : values.title?.length <= 255 && values.title?.length >= 2
                  ? styles.msgSuccess
                  : undefined
              }
            >
              მაქსიმუმ 255 სიმბოლო
            </small>
          </div>
          <div className={styles.input_box}>
            <label htmlFor="description">აღწერა</label>
            <textarea
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.description && touched.description
                  ? styles.inputError
                  : undefined
              }
            />
            <small
              className={
                errors.description &&
                touched.description &&
                values.description?.length < 2
                  ? styles.msgError
                  : values.description?.length >= 2
                  ? styles.msgSuccess
                  : undefined
              }
            >
              მინიმუმ 2 სიმბოლო
            </small>
            <small
              className={
                errors.description && touched.description
                  ? styles.msgError
                  : values.description?.length <= 255 &&
                    values.description?.length >= 2
                  ? styles.msgSuccess
                  : undefined
              }
            >
              მაქსიმუმ 255 სიმბოლო
            </small>
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
          <button type="submit" className={styles.submit_btn}>
            დავალების შექმნა
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTask;
