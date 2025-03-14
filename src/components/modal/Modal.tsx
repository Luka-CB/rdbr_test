import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const Modal = () => {
  return createPortal(
    <main className={styles.modal_bg}>
      <div className={styles.modal}>
        <h1>Modal</h1>
      </div>
    </main>,
    document.body
  );
};

export default Modal;
