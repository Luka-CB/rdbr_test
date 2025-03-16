import { useFormik } from "formik";
import * as yup from "yup";
import Employee from "../../components/CreateTask/employee/Employee";
import DatePicker from "../../components/CreateTask/datePicker/DatePicker";
import Department from "../../components/CreateTask/department/Department";
import Priority from "../../components/CreateTask/priority/Priority";
import Status from "../../components/CreateTask/status/Status";
import styles from "./CreateTask.module.scss";
import useModalStore from "../../store/modalStore";
import useDepartmentStore from "../../store/departmentStore";
import useEmployeeStore from "../../store/employeeStore";
import useDeadlineStore from "../../store/deadlineStore";
import { useEffect } from "react";
import usePriorityStore from "../../store/priorityStore";
import useStatusStore from "../../store/statusStore";
import useAddTaskStore from "../../store/task/addTaskStore";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const { toggleModal } = useModalStore();
  const { pickedPriority, removePickedPriority } = usePriorityStore();
  const { pickedStatus, removePickedStatus } = useStatusStore();
  const { pickedDepartment, setDepartmentError, removePickedDepartment } =
    useDepartmentStore();
  const { setEmployeeError, pickedEmployee, removePickedEmployee } =
    useEmployeeStore();
  const { date, setDateError, removeDate } = useDeadlineStore();
  const { status, addTask, reset } = useAddTaskStore();

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    title: yup.string().required().min(2).max(255),
    description: yup.string().required().min(2).max(255),
  });

  useEffect(() => {
    if (status === "success") {
      localStorage.removeItem("inputData");
      removePickedPriority();
      removePickedStatus();
      removeDate();
      removePickedDepartment();
      removePickedEmployee();
      navigate("/");
      reset();
    }
  }, [status]);

  const onSubmit = () => {
    if (!pickedDepartment) {
      return setDepartmentError(true);
    }

    if (!pickedEmployee) {
      return setEmployeeError(true);
    }

    if (!date) {
      return setDateError(true);
    }

    addTask({
      name: values.title,
      description: values.description,
      due_date: date,
      status_id: pickedStatus?.id,
      employee_id: pickedEmployee?.id,
      priority_id: pickedPriority?.id,
    });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: localStorage.getItem("inputData")
          ? JSON.parse(localStorage.getItem("inputData") || "").title
          : "",
        description: localStorage.getItem("inputData")
          ? JSON.parse(localStorage.getItem("inputData") || "").description
          : "",
      },
      validationSchema,
      onSubmit,
    });

  useEffect(() => {
    if (values) {
      localStorage.setItem("inputData", JSON.stringify(values));
    }
  }, [values]);

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
          <Employee />
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
