import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import Avatar from "./Avatar";
import Department from "../CreateTask/department/Department";
import useModalStore from "../../store/modalStore";
import { useEffect } from "react";
import useDepartmentStore from "../../store/departmentStore";

const Modal = () => {
  const { setToggleModal } = useModalStore();
  const { setToggleDepartmentOptions } = useDepartmentStore();

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
        <form>
          <h1>თანამშრომლის დამატება</h1>
          <div className={styles.form_content}>
            <div className={styles.inputs}>
              <div className={styles.input_box}>
                <label htmlFor="name">სახელი*</label>
                <input type="text" name="name" id="name" />
                <div className={`${styles.msg} ${styles.min}`}>
                  <FaCheck className={styles.icon} />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={`${styles.msg} ${styles.max}`}>
                  <FaCheck className={styles.icon} />
                  <span>მაქსიმუმ 255 სიმბოლო</span>
                </div>
              </div>
              <div className={styles.input_box}>
                <label htmlFor="surname">გვარი*</label>
                <input type="text" name="surname" id="surname" />
                <div className={`${styles.msg} ${styles.min}`}>
                  <FaCheck className={styles.icon} />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={`${styles.msg} ${styles.max}`}>
                  <FaCheck className={styles.icon} />
                  <span>მაქსიმუმ 255 სიმბოლო</span>
                </div>
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
