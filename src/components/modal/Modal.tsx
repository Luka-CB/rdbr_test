import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import * as yup from "yup";
import Avatar from "./Avatar";
import Department from "../CreateTask/department/Department";
import useModalStore from "../../store/modalStore";
import { useEffect } from "react";
import useDepartmentStore from "../../store/departmentStore";
import { useFormik } from "formik";
import useAvatarStore from "../../store/avatarStore";
import { getAvatarArrayBuffer } from "../../utils/buffer";
import useColleagueStore from "../../store/employeeStore";

const Modal = () => {
  const { setToggleModal } = useModalStore();
  const {
    setToggleDepartmentOptions,
    pickedDepartmentModal,
    setDepartmentError,
    setPickedDepartment,
  } = useDepartmentStore();
  const { avatar, setAvatarError, setAvatar } = useAvatarStore();
  const { addEmployee, status, reset } = useColleagueStore();

  const onlyLetters = /^[ა-ჰA-Za-z]+$/;
  const validationSchema = yup.object().shape({
    name: yup.string().required().min(2).max(255).matches(onlyLetters),
    surname: yup.string().required().min(2).max(255).matches(onlyLetters),
  });

  useEffect(() => {
    if (status === "success") {
      setToggleModal(false);
      setAvatar(null);
      setPickedDepartment(null, true);
      reset();
    }
  }, [status]);

  const onSubmit = () => {
    if (!avatar) {
      return setAvatarError("ავატარის არჩევა სავალდებულოა!");
    }

    if (!pickedDepartmentModal) {
      return setDepartmentError(true);
    }

    const avatarBuffer = getAvatarArrayBuffer(avatar);

    addEmployee({
      name: values.name,
      surname: values.surname,
      avatar: avatarBuffer,
      department_id: pickedDepartmentModal.id,
    });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        surname: "",
      },
      validationSchema,
      onSubmit,
    });

  return createPortal(
    <main className={styles.modal_bg} onClick={() => setToggleModal(false)}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
          setToggleDepartmentOptions(false);
        }}
      >
        <IoIosCloseCircle
          className={styles.icon}
          onClick={() => setToggleModal(false)}
        />
        <form onSubmit={handleSubmit}>
          <h1>თანამშრომლის დამატება</h1>
          <div className={styles.form_content}>
            <div className={styles.inputs}>
              <div
                className={
                  errors.name && touched.name
                    ? styles.input_error
                    : values.name?.length >= 2 && values.name?.length <= 255
                    ? styles.input_success
                    : styles.input_box
                }
              >
                <label htmlFor="name">სახელი*</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className={`${styles.msg} ${styles.min}`}>
                  <FaCheck className={styles.icon} />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={`${styles.msg} ${styles.max}`}>
                  <FaCheck className={styles.icon} />
                  <span>მაქსიმუმ 255 სიმბოლო</span>
                </div>
                {!onlyLetters.test(values.name) &&
                values.name &&
                errors.name ? (
                  <span className={styles.only_letters}>
                    მხოლოდ ლათინური და ქართული სიმბოლოები
                  </span>
                ) : null}
              </div>
              <div
                className={
                  errors.surname && touched.surname
                    ? styles.input_error
                    : values.surname?.length >= 2 &&
                      values.surname?.length <= 255
                    ? styles.input_success
                    : styles.input_box
                }
              >
                <label htmlFor="surname">გვარი*</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className={`${styles.msg} ${styles.min}`}>
                  <FaCheck className={styles.icon} />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={`${styles.msg} ${styles.max}`}>
                  <FaCheck className={styles.icon} />
                  <span>მაქსიმუმ 255 სიმბოლო</span>
                </div>
                {!onlyLetters.test(values.surname) &&
                errors.surname &&
                values.surname ? (
                  <span className={styles.only_letters}>
                    მხოლოდ ლათინური და ქართული სიმბოლოები
                  </span>
                ) : null}
              </div>
            </div>
            <Avatar />
            <div
              className={styles.department}
              onClick={(e) => e.stopPropagation()}
            >
              <Department width={384} />
            </div>
          </div>
          <div className={styles.btns}>
            <button
              className={styles.cancel_btn}
              onClick={() => setToggleModal(false)}
            >
              გაუქმება
            </button>
            <button type="submit" className={styles.submit_btn}>
              დაამატე თანამშრომელი
            </button>
          </div>
        </form>
      </div>
    </main>,
    document.body
  );
};

export default Modal;
