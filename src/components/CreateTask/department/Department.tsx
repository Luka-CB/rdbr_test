import useDepartmentStore, {
  departmentIFace,
} from "../../../store/departmentStore";
import useModalStore from "../../../store/modalStore";
import styles from "./Department.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface propsIFace {
  width?: number;
}

const Department: React.FC<propsIFace> = ({ width = 550 }) => {
  const { toggleModal } = useModalStore();
  const {
    departments,
    getDepartments,
    toggleDepartmentOptions,
    setToggleDepartmentOptions,
    pickedDepartment,
    pickedDepartmentModal,
    setPickedDepartment,
    departmentError,
  } = useDepartmentStore();

  const handleToggleOptions = () => {
    setToggleDepartmentOptions(!toggleDepartmentOptions);
    if (!departments.length) getDepartments();
  };

  const handlePickDepartment = (value: departmentIFace, isModal: boolean) => {
    setPickedDepartment(value, isModal);
    setToggleDepartmentOptions(false);
  };

  return (
    <div
      className={departmentError ? styles.dep_error : styles.department}
      style={{ width }}
    >
      <label>დეპარტამენტი*</label>
      <div
        className={
          toggleDepartmentOptions
            ? styles.select_input_active
            : styles.select_input
        }
        onClick={handleToggleOptions}
      >
        {toggleModal ? (
          <span>
            {pickedDepartmentModal
              ? pickedDepartmentModal?.name
              : "აირჩიე დეპარტამენტი"}
          </span>
        ) : (
          <span>
            {pickedDepartment ? pickedDepartment?.name : "აირჩიე დეპარტამენტი"}
          </span>
        )}
        {toggleDepartmentOptions ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </div>
      {toggleDepartmentOptions ? (
        <div className={styles.options} onClick={(e) => e.stopPropagation()}>
          {departments?.map((department) => (
            <div
              className={styles.option}
              key={department.id}
              onClick={() =>
                handlePickDepartment(department, toggleModal ? true : false)
              }
            >
              <span>{department?.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Department;
